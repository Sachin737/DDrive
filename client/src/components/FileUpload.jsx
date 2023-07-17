import React, { useRef } from "react";
import { useState } from "react";
import "../styles/DragDropStyle.css";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "./Loader";

// drag drop file component
const FileUpload = ({ contract, provider, address }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [loading, setLoading] = useState(false);

  //  handle file upload
  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        setLoading(true);

        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url,
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        });

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

        contract.add(address, ImgHash);

        setFileName("No image selected");
        setFile(null);

        setLoading(false);

        toast.success("Image Uploaded Successfully!");
      } catch (err) {
        toast.error("Oops! image not uploaded on Pinata.");
      }
    }
  };

  //  set state variables
  const handleFiles = (currentFile) => {
    setFileName(currentFile.name);
    setFile(currentFile);
  };

  // handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="my-5">
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={submitHandler}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Choose file
            </button>
            <p className=" text-[#cbcdbb]">{fileName.substring(0, 26)}..</p>
          </div>
        </label>
        {loading && <Loader></Loader>}
        <button
          className="my-5 bg-[#3a4042] px-5 py-2 rounded-md"
          type="submit"
          disabled={!file}
        >
          Upload file
        </button>

        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          />
        )}
      </form>
    </div>
  );
};

export default FileUpload;
