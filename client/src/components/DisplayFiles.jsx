import React from "react";
import { useState } from "react";

const ImageCard = ({ image, i }) => {
  return (
    <div key={i} className=" bg-black h-96 w-80 rounded-lg p-2 m-2">
      <a href={image} target="_blank" rel="noreferrer" className="">
        <img src={image} alt="loading.." className="w-full h-full" />
      </a>
    </div>
  );
};

const DisplayFiles = ({ contract, address }) => {
  const [data, setData] = useState();

  const getData = async () => {
    try {
      const inputAddress = document.getElementsByClassName("address")[0].value;

      // get images for given addr using our smart contract
      let myImages = await contract.displayItems(inputAddress || address);

      //  converting object to string array
      myImages = myImages.toString().split(",");

      const images = myImages.map((image, i) => {
        return <ImageCard image={image} i={i}></ImageCard>;
      });
      setData(images);
    } catch (err) {
      alert("Please request access from owner");
    }
  };

  return (
    <div className="flex flex-col items-center mt-5 h-[100vh]">
      <div className="flex flex-row mb-10">
        <input
          type="text"
          className="address text-white p-1 mx-5 outline-none bg-transparent border-b-2"
          placeholder="Enter address"
        />
        <button
          className="border border-3 hover:bg-sky-950 px-5 py-2 rounded-md cursor-pointer"
          onClick={getData}
        >
          Get Data
        </button>
      </div>
      <hr class="mt-12 border-1 border-blue-500 cursor-pointer hover:border-red-500 duration-500 w-[50vw]" />
      <div className="mt-5 flex flex-row flex-wrap justify-center">{data}</div>
    </div>
  );
};

export default DisplayFiles;
