import axios from "axios";
import { useState } from "react";
import { API_URL } from "../Helpers/ApiUrl";


const Upload = () => {
    const [file, setFile] = useState(null);
    
    const onFileChange = (e) => {
        console.log(e.target.files);
        // Isi state file dengan foto dengan menggunakan event.target.files
        // event.target.files adalah array, jd ambil satu aja karena hanya ingin satu

        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        } else {
            setFile(null);
        };
    };

    const uploadClick = async () => {
        console.log(file);
        try {
            const formData = new FormData(); 
            formData.append("tes", file);

            let data = {
                nama: "bambang",
            };

            formData.append("data", JSON.stringify(data));
            let config = {
                headers: {
                    "Content-Type" : "multipart/form-data",
                },
            };
            console.log(formData);
            await axios.post(`${API_URL}/products/tesupload`, formData, config);
            alert("Berhasil upload");
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div>
            <div className="mt-5">
                <h1>Tes Upload</h1>
                <input 
                    type="file" 
                    onChange={onFileChange} 
                />
                {
                    file?
                    <img src={URL.createObjectURL(file)} />
                    :
                    null
                }
                <button onClick={uploadClick}>Upload</button>
            </div>
        </div>
    )
}

export default Upload;