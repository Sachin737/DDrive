const { ethers } = require("hardhat");

const main = async () => {
  const Ddrive = await ethers.getContractFactory("DDrive");
  const ddrive = await Ddrive.deploy();
  await ddrive.waitForDeployment();

  console.log("Contract deployed at: ", ddrive.target);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

runMain();
