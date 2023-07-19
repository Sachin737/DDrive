import { useEffect } from "react";
import { SlClose } from "react-icons/sl";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.getElementsByClassName("address")[0].value;
    console.log(address);
    await contract.giveAccess(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.getAccessList();
      let select = document.querySelector("#selectNumber");

      const options = addressList;
      for (let opt of options) {
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-[#0000006e] fixed top-12 z-10 flex items-center justify-center">
        <div className="w-[500px] h-[250px] rounded-xl bg-[#ffffff] flex flex-col items-center justify-around relative">
          <button
            onClick={() => setModalOpen(false)}
            className="text-black absolute right-2 top-2"
          >
            <SlClose size={24}></SlClose>
          </button>

          <h1 className="text-[#0c2a49] text-xl">Share Drive</h1>

          <div className="">
            <select
              className="bg-[rgb(228,228,228)] text-black py-2 px-10 rounded-lg"
              id="selectNumber"
            >
              <option className="option">People With Access</option>
            </select>
          </div>

          <input
            type="text"
            className="address text-black p-1 mx-5 outline-none bg-transparent border-b-2 border-black"
            placeholder="Enter address"
          />

          <div className="flex justify-around items-center gap-10">
            <button className="border border-3 bg-[#c30808] hover:bg-[#ee0a0a] px-5 py-2 rounded-md cursor-pointer">
              Remove
            </button>
            <button
              className="border border-3 bg-[#08084a] hover:bg-[#070384] px-5 py-2 rounded-md cursor-pointer"
              onClick={() => sharing()}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export { Modal };
