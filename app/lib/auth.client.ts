import WalletConnectProvider from "@walletconnect/web3-provider";
import { PROVIDERS } from "lib/providers.server";
import {
  getCsrfToken,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
import Web3 from "web3";
import Web3Modal from "web3modal";

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  try {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
        },
      },
      theme: {
        background: "rgb(0, 0, 0)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)",
      },
    });
  } catch (error) {
  }
}

/**
 * Uses Web3Modal to connect and sign in with a wallet.
 */
export async function signInWithWallet() {
  let provider = await web3Modal.connect();
  provider.on("chainChanged", signOut);
  provider.on("disconnect", signOut);

  // `signIn` returns null when validation fails. User will need to connect
  // again after responding to alert.
  await signIn(provider);
}

/**
 * Signs the user in via Ethereum.
 */
export async function signIn(provider: any) {
  const web3 = new Web3(provider);

  // Verify Ethereum network.
  const networkId = (await web3.eth.net.getId()).toString();
  let targetNetworkId = process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID;
  console.log("process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID");
  console.log(process.env.NEXT_PUBLIC_ETHEREUM_NETWORK_ID);
  // Get accounts associated with Ethereum wallet.
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    alert("Please have accounts in your wallet to proceed.");
    return;
  }
  let address = accounts[0];

  if (networkId !== targetNetworkId) {
    const hexChainId = "0x" + parseInt(targetNetworkId || "1").toString(16);

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });
  }

  // Sign NextAuth's CSRF token using the current wallet account address.
  let csrfToken = await getCsrfToken();
  let signature = await web3.eth.personal.sign(
    `0x${csrfToken}`,
    accounts[0],
    ""
  );

  // Hit the Ethereum NextAuth provider endpoint with the CSRF token,
  // signature, and current wallet account address.
  nextAuthSignIn(PROVIDERS.ETHEREUM, {
    redirect: false,
    csrfToken,
    address,
    signature,
  });
  return true;
}

/**
 * Signs the user out.
 */
export async function signOut() {
  web3Modal.clearCachedProvider();
  nextAuthSignOut({ redirect: false });
}
