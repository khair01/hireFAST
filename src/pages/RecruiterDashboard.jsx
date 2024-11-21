import React, { useState } from "react";
import Navbar from "../components1/navbar";
import axios from "axios";

export default function RecruiterDashboard() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);
      handleFile(e);
    } else {
      setFileName("No file chosen");
      setImagePreview(null);
      setFile(null);
    }
  };
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    } else {
      setImagePreview(null);
      setFile(null);
    }
  };

  const handleImageUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    try {
      const formData = new FormData();


      formData.append('image', file);


      const response = await axios.post("http://localhost:8000/image-upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      alert("Image uploaded successfully!");

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("There was an error while uploading the image.");
    }
  };
  return (
    <div className='mt-[72px] bg-gray-200'>
      <h1></h1>
    </div>
  )
}
