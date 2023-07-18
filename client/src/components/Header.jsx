import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

import logo from "../images/logo.png";

const NavItem = ({ title, classes }) => {
  return <li className={`mx-4 cursor-pointer ${classes}`}>{title}</li>;
};

const navList = ["Home", "Drive", "Contact", "Wallet"];

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="mt-5 w-full flex justify-between md:justify-center items-center p-4">
      <div className="md:flex-[0.5] flex-initial items-center justify-center mt-3">
        <img
          src={logo}
          alt="Logo"
          className="w-36 cursor-pointer"
        />
      </div>
      <ul className="text-white md:flex  hidden list-none flex-row justify-between items-center flex-initial">
        {navList.map((item, index) => (
          <NavItem key={index} title={item} />
        ))}
        <li className="bg-[#c30808] text-white py-2 px-7 mx-4 cursor-pointer hover:bg-[#a60808] rounded-full">
          login
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
            {navList.map((item, index) => (
              <NavItem key={index} classes="my-2 text-lg" title={item} />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
