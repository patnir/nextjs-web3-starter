import { ethers } from "hardhat";
const fs = require("fs");

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
  writeContractAddressToFile("greeterAddress", greeter.address);
}

function writeContractAddressToFile(filename: string, contractAddress: string) {
  try {
    fs.writeFileSync(
      `./${filename}.json`,
      JSON.stringify({
        contractAddress: contractAddress,
      })
    );
  } catch (error) {
    console.error(`Error writing to ${filename}`);
    console.error(error);
    return;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
