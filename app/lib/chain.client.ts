import { ethers } from "ethers";
import contractInterface from "../contracts/Cypherpunk.json";

/**
 * Returns the contract address for the current environment. Local environments
 * will have access to a contractAddress.json file so we can reference it.
 * Other environments will have an environment variable set to the
 * corresponding contract address.
 */
export function getContractAddress() {
  if (!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS) {
    let contractFile = require("../contracts/contract.json");
    return contractFile.contractAddress;
  } else {
    return process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  }
}

export async function getConnectedContract() {
  const contractAddress = getContractAddress();
  const { ethereum } = window;
  if (!ethereum) return;

  const chainId = await ethereum.request({ method: "eth_chainId" });
  const targetNetworkId =
    "0x" +
    parseInt(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID || "1").toString(16);

  console.log("process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID");
  console.log(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID);

  if (chainId !== targetNetworkId) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetworkId }],
      });
    } catch (error) {
      console.error(error);
      return;
    }
  }

  let provider = new ethers.providers.Web3Provider(ethereum);
  let signer = provider.getSigner();
  let connectedContract = new ethers.Contract(
    contractAddress,
    contractInterface.abi,
    signer
  );

  return connectedContract;
}

export async function getBalance(session: any) {
  const connectedContract = await getConnectedContract();
  if (!connectedContract) return;
  const result = await connectedContract.balanceOf(session.data.walletAddress);
  return result;
}

export async function getPrice(connectedContract: ethers.Contract) {
  return await connectedContract.price();
}

export async function mint() {
  const connectedContract = await getConnectedContract();
  if (!connectedContract) return;

  const price = await getPrice(connectedContract);
  const transaction = await connectedContract.mint({
    value: price,
  });
  const result = await transaction.wait();
  return result;
}
