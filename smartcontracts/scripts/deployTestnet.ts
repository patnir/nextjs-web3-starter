import { writeFileSync } from "fs";
import { ethers } from "hardhat";

async function main() {
  const Cypherpunk = await ethers.getContractFactory("Cypherpunk");
  const contract = await Cypherpunk.deploy(
    "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/",
    ethers.utils.parseEther("0.00005")
  );

  await contract.deployed();

  console.log("Cypherpunk deployed to:", contract.address);
  writeContractAddressToFile("contract", contract.address);
}

function writeContractAddressToFile(filename: string, contractAddress: string) {
  try {
    writeFileSync(
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
