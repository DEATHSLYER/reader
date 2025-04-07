import { useState } from "react";

const UploadBox = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            console.log("File selected:", selectedFile.name);
            setFile(selectedFile);
        } else {
            console.log("No file selected.");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file before uploading.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            console.log("Upload response:", data);
            alert(data.message);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadBox;
