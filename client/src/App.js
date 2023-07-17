import "./App.css";
import DDrive from "./artifacts/contracts/DDrive.sol/DDrive.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import myContractJSON from "./artifacts/contracts/DDrive.sol/DDrive.json";
import FileUpload from "./components/FileUpload.jsx";
import DisplayFiles from "./components/DisplayFiles.jsx";

function App() {
  const [contract, setContract] = useState();
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("0x0");
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const connectToContract = async () => {
      //  creating Provider to able to read data
      const provider = new ethers.BrowserProvider(window.ethereum);

      const loadContract = async () => {
        // reload page when we change our account or network from metamask
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Contract address (deployed on harhat network) and ABI code
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractABI = myContractJSON.abi;

        // signer to validate and pay for transactions
        const signer = await provider.getSigner();

        // get signer address
        const address = await signer.getAddress();

        // contarct instance
        const myContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        // check account balance
        const mybalance = await provider.getBalance(address);

        setContract(myContract);
        setProvider(provider);
        setAddress(address);
        setBalance(ethers.formatEther(mybalance));
      };

      if (provider) {
        loadContract();
      } else {
        alert("Connect using metamask!");
      }
    };

    connectToContract();
  }, []);

  return (
    <div className=" bg-[#212121] h-[100vh] w-[100vw] flex flex-row justify-around items-center text-white">
      <div className="flex flex-col">
        <div>
          <h1>Addres: {address}</h1>
          <h1>Balance: {balance} Eth</h1>
        </div>
        <FileUpload
          contract={contract}
          provider={provider}
          address={address}
        ></FileUpload>
      </div>
      <DisplayFiles contract={contract} address={address}></DisplayFiles>
    </div>
  );
}

export default App;
