import React, { useState } from "react";
import axios from "axios";
import API_URL from "../Helpers/ApiUrl";
import { Link } from "react-router-dom";

const Login = () => {
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        confirmPass: "",
    });

    const onInputChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();
        const {username, password} = loginData;
        try {
            const options = {
                params: {
                  username: username,
                  password: password,
                },
              };
              const res = await axios.get(`${API_URL}/auth/login`, options);
              console.log(res.data);
              alert("berhasil");
        } catch (error) {
            alert(error.response.data.message || "Server error");
        };
    };

    return (
        <div className="f-column-center" style={{height: "100vh"}}>
            <div className="f-column-center shadow py-3" style={{border: "1px solid black", borderRadius: "10px", width: "30vw"}}>
                <h1>Login</h1>
                <form className="f-column-center" onSubmit={onLoginSubmit}>
                    <input 
                        type="text"
                        placeholder="username"
                        name="username"
                        value={loginData.username}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        name="password"
                        value={loginData.password}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <p className="m-0">Lupa password?</p> <Link to="/register">Buat akun?</Link>
                    <button 
                        className="btn btn-primary mt-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;