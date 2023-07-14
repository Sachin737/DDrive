import "./App.css";
import DDrive from "./artifacts/contracts/DDrive.sol/DDrive.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import myContractJSON from "./artifacts/contracts/DDrive.sol/DDrive.json";

function App() {
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    const connectToContract = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);

      if (!provider) {
        alert("Please connect your metamask account!");
        return;
      }

      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const contractABI = myContractJSON.abi;

      const signer = await provider.getSigner();
      const myContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(myContract);
      setProvider(provider);
      setAddress(await signer.getAddress());

      console.log(myContract);
    };

    connectToContract();
  }, []);

  return (
    <div className="bg-[#323034] h-[100vh] flex justify-center items-center text-white">
      <h1>Addres: {address ? address : "Connect using metamask"}</h1>
    </div>
  );
}

export default App;
