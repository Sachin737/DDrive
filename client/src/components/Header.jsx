import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { Modal } from "./Modal.jsx";
import logo from "../images/logo.png";

const Header = ({ contract, connectWallet, address }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <>
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}
      <nav className="fixed top-0 z-10 backdrop-filter backdrop-blur-lg  w-[100vw] flex justify-between md:justify-center items-center p-4">
        <div className="md:flex-[0.5] flex-initial items-center justify-center mt-3">
          <img src={logo} alt="Logo" className="w-36 cursor-pointer" />
        </div>
        <ul className="text-white md:flex  hidden list-none flex-row justify-between items-center flex-initial">
          <li className={`mx-4 cursor-pointer`}>Home</li>
          <li className={`mx-4 cursor-pointer`}>Contact</li>

          {!address ? (
            <li
              className="bg-[#1016c2] text-white py-2 px-7 mx-4 cursor-pointer hover:bg-[#141bef] rounded-full"
              onClick={() => connectWallet()}
            >
              Connect
            </li>
          ) : (
            <li className="bg-[#08a212] text-white py-2 px-7 mx-4 cursor-pointer rounded-full">
              Connected
            </li>
          )}

          <li
            className="bg-[#c30808] text-white py-2 px-7 mx-4 cursor-pointer hover:bg-[#ee0a0a] rounded-full"
            onClick={() => setModalOpen(true)}
          >
            Share
          </li>
        </ul>
        <div className="flex relative">
          {toggleMenu ? (
            <AiOutlineClose
              fontSize={32}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(false)}
            ></AiOutlineClose>
          ) : (
            <HiMenuAlt4
              fontSize={32}
              className="text-white md:hidden cursor-pointer"
              onClick={() => setToggleMenu(true)}
            ></HiMenuAlt4>
          )}
          {toggleMenu && (
            <ul className="z-10 fixed top-0 -right-2 p-3 w-[50vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-start rounded-md bg-gray-900 text-white animate-slide-in ">
              <li className="text-xl w-full my-3 ml-3">
                <AiOutlineClose
                  onClick={() => setToggleMenu(false)}
                ></AiOutlineClose>
              </li>

              <li className={`mx-4 cursor-pointer my-2 text-lg`}>Home</li>
              <li className={`mx-4 cursor-pointer my-2 text-lg`}>Contact</li>
              {!address ? (
                <li
                  className="mx-4 cursor-pointer my-2 text-lg"
                  onClick={() => connectWallet()}
                >
                  Connect
                </li>
              ) : (
                <li className="mx-4 cursor-pointer my-2 text-lg">Connected</li>
              )}
              <li
                className={`mx-4 cursor-pointer my-2 text-lg`}
                onClick={() => setModalOpen(true)}
              >
                Share
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
