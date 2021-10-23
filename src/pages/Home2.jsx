import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import {API_URL} from "../Helpers/ApiUrl"

function Home() {
  const [products, setProducts] = useState([]);
  const [addData, setAddData] = useState({
    name: "",
    price: "",
  });
  const [indexDelete, setIndexDelete] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const [indexEdit, setIndexEdit] = useState(-1);
  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    price: "",
  });

  const [fileAdd, setFileAdd] = useState(null);
  const [fileEdit, setFileEdit] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://localhost:5100/products`);
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    };
    fetchdata();
  }, []); // sama dengan componentdidmount

  const renderData = () => {
    return products.map((val, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val.name}</td>
          <td width={300}>
            <img src={API_URL + val.image} alt={val.name} height={200} />
          </td>
          <td>{val.price}</td>
          <td>
            <button
              className="btn btn-danger mr-3"
              onClick={() => deleteDataModal(index)}
            >
              Delete
            </button>
            <button
              className="btn btn-secondary ml-5"
              onClick={() => editDataModal(index)}
            >
              Edit
            </button>
          </td>
        </tr>
      );
    });
  };

  const deleteData = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5100/products/${id}`);
      setProducts(res.data);
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteDataModal = (index) => {
    setIndexDelete(index);
    setModalOpen(true);
  };

  const onInputChange = (e) => {
    setAddData({ ...addData, [e.target.name]: e.target.value });
  };
  const onEditInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const addDataToBe = async () => {
    const formData = new FormData();
    const dataToBe = addData;
    formData.append("data", JSON.stringify(dataToBe));
    formData.append("image", fileAdd);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let res = await axios.post(
        `http://localhost:5100/products`,
        formData,
        config
      );
      setProducts(res.data);
      setFileAdd(null);
      setAddData({
        name: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const updateData = async () => {
    const formData = new FormData();
    const dataEdit = {
      name: editData.name,
      price: editData.price,
    };
    formData.append("data", JSON.stringify(dataEdit));
    formData.append("image", fileEdit);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    let id = products[indexEdit].id; // id dari products didpat dari indexedit yang dipilih
    try {
      let res = await axios.patch(
        `http://localhost:5100/products/${id}`,
        formData,
        config
      );
      setProducts(res.data);
      setModalEditOpen(false);
      setEditData({
        name: "",
        price: "",
      });
      setFileEdit(null);
    } catch (error) {
      console.log(error);
    }
  };

  const editDataModal = (index) => {
    setIndexEdit(index);
    setEditData(products[index]);
    setModalEditOpen(true);
  };

  const renderModalEdit = () => {
    if (indexEdit >= 0) {
      return (
        <Modal
          isOpen={modalEditOpen}
          toggle={() => setModalEditOpen(!modalEditOpen)}
        >
          <ModalHeader>Edit data</ModalHeader>
          <ModalBody>
            <input
              placeholder="edit name"
              className="form-control"
              value={editData.name}
              name="name"
              onChange={onEditInputChange}
            />
            <input
              type="file"
              className="form-control"
              onChange={onFileChangeEdit}
            />
            {fileEdit ? (
              <>
                <img
                  src={URL.createObjectURL(fileEdit)}
                  height={200}
                  width={200}
                />
                <button onClick={() => setFileEdit(null)}>hapus</button>
              </>
            ) : null}
            <input
              placeholder="edit price"
              className="form-control"
              value={editData.price}
              name="price"
              onChange={onEditInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <button onClick={updateData}>Save</button>
            <button onClick={() => setModalEditOpen(!modalEditOpen)}>
              Cancel
            </button>
          </ModalFooter>
        </Modal>
      );
    }
    return null;
  };
  // const onChangefile = (e) => {
  //   console.log(e.target.files);
  // };
  // const hiddenFileInput = React.useRef(null);

  // const handleClick = (event) => {
  //   hiddenFileInput.current.click();
  // };
  // const handleChange = (event) => {
  //   const fileUploaded = event.target.files[0];
  //   console.log(fileUploaded);
  // };

  const onFileChange = (e) => {
    console.log(e.target.files);
    // isi state file dengan foto dengan menggunakan event.target.files
    // evennt.target.files adalah array so kita ambil satu saja karena penggennya satu
    if (e.target.files[0]) {
      setFileAdd(e.target.files[0]);
    } else {
      setFileAdd(null);
    }
  };
  const onFileChangeEdit = (e) => {
    console.log(e.target.files);
    // isi state file dengan foto dengan menggunakan event.target.files
    // evennt.target.files adalah array so kita ambil satu saja karena penggennya satu
    if (e.target.files[0]) {
      setFileEdit(e.target.files[0]);
    } else {
      setFileEdit(null);
    }
  };

  return (
    <div>
      {renderModalEdit()}
      {indexDelete >= 0 ? (
        <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
          <ModalHeader>Delete data</ModalHeader>
          <ModalBody>
            Are you sure delete {products[indexDelete]?.name}
          </ModalBody>
          <ModalFooter>
            <button onClick={() => deleteData(products[indexDelete]?.id)}>
              Yes
            </button>
            <button onClick={() => setModalOpen(!modalOpen)}>No</button>
          </ModalFooter>
        </Modal>
      ) : null}
      <center>
        <h1>Table Products</h1>
        {/* <label className="custom-file-upload">
          <input type="file" multiple onChange={onChangefile} />
          Attach
        </label> */}
        {/* <button onClick={handleClick}>Upload a file</button>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        /> */}
        <div className="mx-5">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Image</th>
                <th>price</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>{renderData()}</tbody>
            <tfoot>
              <td></td>
              <td>
                <input
                  placeholder="product name"
                  className="form-control"
                  name="name"
                  value={addData.name}
                  onChange={onInputChange}
                />
              </td>
              <td>
                <input
                  type="file"
                  className="form-control"
                  onChange={onFileChange}
                />
              </td>
              <td>
                <input
                  placeholder="price"
                  className="form-control"
                  name="price"
                  value={addData.price}
                  onChange={onInputChange}
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={addDataToBe}>
                  add data
                </button>
              </td>
            </tfoot>
          </Table>
          {fileAdd ? <img src={URL.createObjectURL(fileAdd)} /> : null}
        </div>
      </center>
    </div>
  );
}

export default Home;