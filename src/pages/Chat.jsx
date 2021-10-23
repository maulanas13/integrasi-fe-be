import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Table} from "reactstrap"
import { io } from 'socket.io-client';
import { API_URL } from '../Helpers/ApiUrl';

const Chat = () => {
    const [name, setName] = useState("");
    const [connect, setConnect] = useState(false);
    const [bales, setBales] = useState("");
    const [message, setMessage] = useState([]);
    const [inputMess, setInputMess] = useState("");
    const [nsp, setNsp] = useState("");
    const [respond, setRespond] = useState("");
    const [inputMesRoom, setInputMesRoom] = useState("");
    const [messageRoom, setMessageRoom] = useState([]);

    useEffect(() => {
        const sockets = io(API_URL);
    }, [])

    const joinChat = async (nsp) => { // nsp = namespace (biasa disebut itu di socket io)
        const socket = io(API_URL + nsp);
        if (name) { // Pastikan nama terisi
            let res = await axios.get(`${API_URL}/mess?nsp=${nsp}`);
            setMessage(res.data);
            setNsp(nsp)
            socket.emit("bebas", {name}); 
            // socket.emit(namaevent, data) data bisa apapun tipenya bisa string atau object
            setConnect(true);
            socket.on("bales", (data) => {
                console.log(data);
                setBales(data);
            });
            socket.on("message", (data) => {
                console.log(data);
                setMessage(data);
            });
        }
        // let res = await axios.get(`${API_URL}/mess`)
        // setMessage(res.data);
    };

    const joinRoom = (room) => {
        const socket = io(API_URL);
        socket.emit("joinRoom", { name, room });
        socket.on("respond", (data) => {
          console.log("data dari socket", data);
          setRespond(data);
        });
        socket.on("messageRoom", (chat) => {
          console.log("data dari socket", chat);
          setMessageRoom(chat);
        });
    };

    const sendMessage = async (nsp) => {
        try {
            await axios.post(`${API_URL}/sendmess?cnl=${nsp}`, {name, pesan: inputMess});
            // alert("Berhasil kirim message");
        } catch (error) {
            console.log("Masuk error")
            console.log(error);
        };
    };

    const sendMessageroom = async (room) => {
        try {
          await axios.post(`${API_URL}/sendmess?cnl=${nsp}`, {
            name,
            pesan: inputMesRoom,
            room,
          });
          //   alert("berhasil kirim meesage");
        } catch (error) {
          console.log(error);
        };
    };

    const onInputChange = (e) => {
        if (e.target.name === "username") {
            setName(e.target.value)
        } else if (e.target.name === "room") {
            setInputMesRoom(e.target.value);
        } else {
            setInputMess(e.target.value);
        }
    };

    const disconnect = () => {
        // const socket = io(API_URL);
        // socket.emit("putus");
        // alert("");
    };

    const leaveRoom = () => {
        const socket = io(API_URL);
        socket.emit("leaveRoom", { name, room: "room1" });
    };

    return (
        <div>
          <div className="container">
            <h1>SOCKET</h1>
            <div>{connect ? name : null}</div>
            <div>{bales}</div>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="form-control"
              onChange={onInputChange}
              value={name}
            />
    
            <button onClick={() => joinChat("/")} className="btn btn-primary">
              Join
            </button>
            <button
              onClick={() => joinChat("/channel")}
              className="btn btn-primary"
            >
              Join channel
            </button>
            <div className="row">
              <div className="col-md-9">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Pesan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {message.map((val) => {
                      return (
                        <tr>
                          <td>{val.name}</td>
                          <td>{val.pesan}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <input
                  type="text"
                  placeholder="pesan"
                  className="form-control"
                  onChange={onInputChange}
                  value={inputMess}
                />
              </div>
              <div className="col-md-3">
                <button onClick={sendMessage}>send</button>
                <button onClick={disconnect}>disconnect</button>
              </div>
            </div>
            <h1>Room 1</h1>
            <div>{respond}</div>
            <button onClick={() => joinRoom("room1")}>join Room 1</button>
            <button onClick={() => joinRoom("room2")}>join Room 2</button>
            <div className="row">
              <div className="col-md-9">
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Pesan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messageRoom.map((val) => {
                      return (
                        <tr>
                          <td>{val.name}</td>
                          <td>{val.pesan}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <input
                  type="text"
                  placeholder="pesan"
                  name="room"
                  className="form-control"
                  onChange={onInputChange}
                  value={inputMesRoom}
                />
              </div>
              <div className="col-md-3">
                <button onClick={() => sendMessageroom("room1")}>send</button>
                <button onClick={() => sendMessageroom("room2")}>send2</button>
                <button onClick={leaveRoom}>disconnect</button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Chat;