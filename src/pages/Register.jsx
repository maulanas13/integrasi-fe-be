import React, { useState } from "react";
import axios from "axios";
import API_URL from "../Helpers/ApiUrl";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPass: "",
    });

    const onInputChange = (e) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value});
    };

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        const {username, email, password, confirmPass} = registerData;
        if (password === confirmPass) {
            let dataBody = {
                username,
                email,
                password,
            }
            try {
                const res = await axios.post(`${API_URL}/auth/register`, dataBody);
                console.log(res.data);
                alert("berhasil")
            } catch (error) {
                alert(error.response.data.message || "server error");
            }
        } else {
            alert("Tidak sesuai")
        }
    }

    return (
        <div className="f-column-center" style={{height: "100vh"}}>
            <div className="f-column-center shadow py-3" style={{border: "1px solid black", borderRadius: "10px", width: "30vw"}}>
                <h1>Register</h1>
                <form className="f-column-center" onSubmit={onRegisterSubmit}>
                    <input 
                        type="text"
                        placeholder="username"
                        name="username"
                        value={registerData.username}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <input 
                        type="email"
                        placeholder="email"
                        name="email"
                        value={registerData.email}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <input 
                        type="password"
                        placeholder="password"
                        name="password"
                        value={registerData.password}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <input 
                        type="password"
                        placeholder="confirm password"
                        name="confirmPass"
                        value={registerData.confirmPass}
                        onChange={onInputChange}
                        className="form-control my-2"
                    />
                    <p className="m-0">Sudah punya akun?</p> <Link to="/login">Klik</Link>
                    <button 
                        type="submit"
                        className="btn btn-primary mt-2"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;