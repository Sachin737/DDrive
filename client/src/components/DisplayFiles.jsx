import React from "react";
import { useState } from "react";

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
        return (
          <a href={image} key={i} target="_blank">
            <img
              src={image}
              alt="image"
              className="h-60 w-60 p-2"
            />
          </a>
        );
      });
      setData(images);
    } catch (err) {
      alert("Please request access from owner");
    }
  };

  return (
    <div className="mt-5">
      <input
        type="text"
        className="address text-black"
        placeholder="Enter address"
      />
      <button className="" onClick={getData}>
        Get Data
      </button>
      <div className="mt-5 flex flex-row flex-wrap max-h-[80vh] max-w-[38vw] justify-start items-center overflow-auto">
        {data}
      </div>
    </div>
  );
};

export default DisplayFiles;
