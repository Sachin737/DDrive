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
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const { ethereum } = window;

  // Checking acc connected or not
  const ifWalletConnected = async () => {
    if (!ethereum) {
      return alert("Please install metamask!");
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });
    // console.log(accounts);

    if (accounts.length !== 0) {
      setAccount(accounts[0]);
    }

    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
  };

  //   Connect account
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask!");
      }

      const accounts = await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      loadContract();
    } catch (err) {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    }
  };

  const loadContract = async () => {
    // reload page when we change our account or network from metamask
    ethereum.on("chainChanged", () => {
      window.location.reload();
    });
    ethereum.on("accountsChanged", () => {
      window.location.reload();
    });

    //  creating Provider to able to read data
    const provider = new ethers.BrowserProvider(ethereum);

    // Contract address (deployed on harhat network) and ABI code`
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
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

  useEffect(() => {
    if (!account) ifWalletConnected();
    if (account) {
      loadContract();
    }
  }, [account]);

  return (
    <div className="bg-gradient-to-t from-gray-700 via-gray-900 to-black w-[100vw] flex flex-col justify-center items-center text-white overflow-x-hidden">
      <Header
        contract={contract}
        connectWallet={connectWallet}
        address={address}
      ></Header>
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
