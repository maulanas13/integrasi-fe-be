import React, { useEffect, useState } from "react";
import qs from "query-string"
import axios from "axios";
import {API_URL} from "../Helpers/ApiUrl";
import { Link } from "react-router-dom";

const Verified = (props) => {
    const [condition, setCondition] = useState(1);

    const fetchData = async () => {
        const token = qs.parse(props.location.search);
        console.log(token);
        try {
            const res = await axios.get(`${API_URL}/auth/verified`, {headers: {Authorization: `Bearer ${token}`}});
            console.log(res.data);
            setCondition(2);
        } catch (err) {
            alert(err);
            console.log(err);
            setCondition(3);
        };
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (condition === 1) {
        return (
            <div>
                <center>
                    <h1>Sedang menunggu Verified</h1>
                </center>
            </div>
        );
    }
    if (condition === 2) {
        return (
            <div>
                <center>
                    <h1>Verified berhasil</h1>
                    <Link to="/">Home</Link>
                </center>
            </div>
        );
    }
    return (
        <div>
            <center>
                <h1>Gagal Verifikasi</h1>
                <Link to="/">Home</Link>
            </center>
        </div>
    );
}

export default Verified;