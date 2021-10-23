import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Table } from "reactstrap";
import { API_URL } from "../Helpers/ApiUrl";

function Home() {
  const [products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [indexEdit, setIndexEdit] = useState(-1);
  const [addData, setAddData] = useState({
    name: "",
    price: "",
  });
  const [file, setFile] = useState(null);
  const [fileEdit, setFileEdit] = useState(null);

  const editNameRef = useRef();
  const editPriceRef = useRef();

  // DIDMOUNT PRODUCTS DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5100/products");
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // EDIT RELATED FUNCTIONS
  const onEditClick = (index) => {
    setShowEdit(true);
    setIndexEdit(index);
  };

  const editToggle = () => {
    setShowEdit(!showEdit);
  };

  const EditRow = (props) => {
    const {index, nameToEdit, imageToEdit, priceToEdit} = props;
    const [editProdInput, setEditProdInput] = useState({
      name: nameToEdit,
      image: imageToEdit,
      price: priceToEdit,
    });

    const editHandler = (ref) => {
      setEditProdInput((prevState) => {
        return { ...prevState, [ref.current.name]: ref.current.value };
      });
    };

    const onSaveEditProd = async (index) => {
      const {name, price} = editProdInput;
      if (name && price) {
        try {
          await axios.patch(`http://localhost:5100/products/${products[index].id}`, editProdInput);
          setShowEdit(!showEdit);
          setIndexEdit(-1);
          setEditProdInput((prevState) => {
            return {...prevState, name: nameToEdit, price: priceToEdit}
          });
          let res = await axios.get("http://localhost:5100/products");
          setProducts(res.data);
        } catch (error) {
          console.log(error + "from save edit func.")
        }
      } else {
        alert("Pastikan terisi semua");
      };
    };

    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <input 
            type="text" 
            ref={editNameRef}
            name="name"
            defaultValue={nameToEdit}
            className="form-control"
            onChange={() => editHandler(editNameRef)}
          />
        </td>
        <td>
          <input 
            type="number" 
            ref={editPriceRef}
            name="price"
            defaultValue={priceToEdit}
            className="form-control"
            min={0}
            onChange={() => editHandler(editPriceRef)}
          />
        </td>
        <td>
          <button 
            className="btn btn-primary mx-2" 
            onClick={() => onSaveEditProd(index)}
          >
            Save
          </button>
          <button 
            className="btn btn-danger mx-2"
            onClick={editToggle}
          >
            Cancel
          </button>
        </td>
      </tr>
    )
  };

  // DELETE RELATED FUNCTIONS
  const onDelClick = async (id) => {
    try {
      let res = await axios.delete(`http://localhost:5100/products/:${id}`);
      setProducts(res.data);
    } catch (error) {
      console.log(error)
    }
  };

  // ADD DATA RELATED FUNCTIONS
  const addDataToBe = async () => {
    const formData = new FormData();
    const dataToBe = addData;
    formData.append("data", JSON.stringify(dataToBe));
    // formData.append("image", fileAdd);
    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      let res = await axios.post("http://localhost:5100/products", formData, config);
      setProducts(res.data);
      setFile(null);
      setAddData({
        name: "",
        price: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onInputChange = (e) => {
    setAddData({...addData, [e.target.name]: e.target.value})
  };

  // RENDER MAIN DATA FUNCTION
  const renderData = () => {
    return products.map((val, index) => {
      if (showEdit && indexEdit === index) {
        return <EditRow index={index} nameToEdit={val.name} imageToEdit={val.image} priceToEdit={val.price} /> 
      } else {
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
                className="btn btn-primary mx-2" 
                onClick={() => onEditClick(index)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger mx-2"
                onClick={() => onDelClick(val.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      };
    });
  };

  // RENDER RESULT
  return (
    <div className="App">
      <center>
        <h1>Table of Products</h1>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{renderData()}</tbody>
          <tfoot>
              <td></td>
              <td>
                <input 
                  className="form-control" 
                  value={addData.name} 
                  name="name"
                  placeholder="Product Name"
                  onChange={onInputChange}
                />
              </td>
              <td>
                <input 
                  className="form-control" 
                  value={addData.image} 
                  name="image"
                  placeholder="Image"
                  onChange={onInputChange}
                />
              </td>
              <td>
                <input 
                  className="form-control" 
                  value={addData.price} 
                  name="price"
                  placeholder="Product Price"
                  onChange={onInputChange}
                />
              </td>
              <td>
                <button 
                  className="btn btn-success"
                  onClick={addDataToBe}
                >
                  Add Data
                </button>
              </td>
          </tfoot>
        </Table>
      </center>
    </div>
  );
};

export default Home;