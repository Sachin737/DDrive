import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import myContractJSON from "./artifacts/contracts/DDrive.sol/DDrive.json";
import FileUpload from "./components/FileUpload.jsx";
import DisplayFiles from "./components/DisplayFiles.jsx";
import Header from "./components/Header";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const WalletCard = ({ address, balance }) => {
  const [network, setNetwork] = useState("Ethereum");

  const getChain = async () => {
    const Ntwrk = (await ethers.getDefaultProvider().getNetwork()).name;
    setNetwork(Ntwrk);
  };

  useState(() => {
    getChain();
  }, []);
  return (
    <div className="flex-col justify-end items-start rounded-xl h-48 w-full sm:w-80 my-5 p-3 blue-glassmorphism eth-card">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex justify-between items-center">
          <div className=" flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
            <SiEthereum fontSize={21} color="#fff"></SiEthereum>
          </div>
          <BsInfoCircle fontSize={18} color="#fff"></BsInfoCircle>
        </div>
        <div>
          {!address ? (
            <p className="text-white font-light text-sm">0x000....000</p>
          ) : (
            <p className="text-white font-light text-sm">
              {address.substr(0, 5)}...
              {address.substr(address.length - 4)}
            </p>
          )}
          <p className="text-white font-semibold text-lg mt-1">{network}</p>
        </div>
      </div>
    </div>
  );
};

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

      if (provider) {
        loadContract();
      } else {
        alert("Connect using metamask!");
      }
    };

    connectToContract();
  }, []);

  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-[100vw] flex flex-col justify-center items-center text-white overflow-x-hidden">
      <Header></Header>
      <div className="flex flex-row w-[70vw] h-[70vh] items-center justify-around">
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
