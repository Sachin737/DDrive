import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const WalletCard = ({ address, balance }) => {
  return (
    <div className="flex-col justify-end items-start rounded-xl h-48 w-[320px] mt-32 xl:mt-0 p-3 blue-glassmorphism eth-card">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex justify-between items-center">
          <div className=" flex justify-center items-center w-10 h-10 rounded-full border-2 border-white">
            <SiEthereum fontSize={21} color="#fff"></SiEthereum>
          </div>
          <BsInfoCircle fontSize={18} color="#fff"></BsInfoCircle>
        </div>
        <div>
          {!address ? (
            <p className="text-white font-light text-sm">
              Connect using Metamask
            </p>
          ) : (
            <p className="text-white font-light text-sm">
              {address.substr(0, 5)}...
              {address.substr(address.length - 4)}
            </p>
          )}
          <p className="text-white font-light text-sm">
            {balance.toString().substr(0, 10)} Eth
          </p>
          <p className="text-white font-semibold text-lg mt-1">Ethereum</p>
        </div>
      </div>
    </div>
  );
};

export { WalletCard };
