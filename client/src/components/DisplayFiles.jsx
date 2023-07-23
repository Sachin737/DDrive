import React from "react";
import { useState } from "react";

const ImageCard = ({ image, key }) => {
  return (
    <div key={key} className=" bg-black h-96 w-80 rounded-lg p-2 m-2">
      <a href={image} target="_blank" rel="noreferrer" className="">
        <img src={image} alt="loading.." className="w-full h-full" />
      </a>
    </div>
  );
};

const DisplayFiles = ({ contract, address }) => {
  const [data, setData] = useState();
  const [inputAddr, setinputAddr] = useState("");

  const getData = async () => {
    try {
      // get images for given addr using our smart contract
      let myImages;
      if (inputAddr.length) {
        myImages = await contract.displayItems(inputAddr);
      } else {
        myImages = await contract.displayItems(address);
        console.log(myImages);
      }

      //  converting object to string array
      myImages = myImages.toString().split(",");

      const images = myImages.map((image, i) => {
        return <ImageCard image={image} key={i}></ImageCard>;
      });
      setData(images);
    } catch (err) {
      alert("Please request access from owner");
    }
  };

  const handleInputChange = (e) => {
    setinputAddr(e.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-10 h-[100vh]">
      <div className="flex flex-row mb-10">
        <input
          type="text"
          className="address text-white p-1 mx-5 outline-none bg-transparent border-b-2"
          placeholder="Enter address"
          value={inputAddr}
          onChange={handleInputChange}
        />
        <button
          className="border border-3 hover:bg-sky-950 px-5 py-2 rounded-md cursor-pointer"
          onClick={getData}
        >
          Get Data
        </button>
      </div>

      {address ? (
        <h3 className="text-white text-3xl mt-10 text-center">Your Files</h3>
      ) : (
        <h3 className="text-white text-3xl mt-10 text-center">
          Connect account to your see data !
        </h3>
      )}
      <div className="mt-5 flex flex-row flex-wrap justify-center">{data}</div>
    </div>
  );
};

export default DisplayFiles;
