import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract, ContractFactory } from "ethers";
import { ethers } from "hardhat";

describe("Cypherpunk", function () {
  const URI =
    "https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/";
  const PRICE = ethers.utils.parseEther("0.05");

  let contractFactory: ContractFactory;
  let contract: Contract;
  let owner: SignerWithAddress;
  let user: SignerWithAddress;
  let addrs: SignerWithAddress[];

  this.beforeEach(async function () {
    contractFactory = await ethers.getContractFactory("Cypherpunk");
    [owner, user, ...addrs] = await ethers.getSigners();
    contract = await contractFactory.deploy(URI, PRICE);
  });

  it("Should be the right name and symbol", async function () {
    expect(await contract.name()).to.equal("Cypherpunk");
    expect(await contract.symbol()).to.equal("CYPHERPUNK");
  });
});
