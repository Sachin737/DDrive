import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import myContractJSON from "./artifacts/contracts/DDrive.sol/DDrive.json";
import FileUpload from "./components/FileUpload.jsx";
import DisplayFiles from "./components/DisplayFiles.jsx";
import Header from "./components/Header";

import { WalletCard } from "./components/WalletCard.jsx";

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

        // Contract address (deployed on harhat network) and ABI code`
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

      try {
        loadContract();
      } catch (err) {
        alert("Connect using metamask!");
      }
    };

    connectToContract();
  }, []);

  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-[100vw] flex flex-col justify-center items-center text-white overflow-x-hidden">
      <Header contract={contract}></Header>
      <div className="flex flex-col xl:flex-row w-[70vw] h-[100vh] items-center justify-around">
        <WalletCard address={address} balance={balance}></WalletCard>
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
