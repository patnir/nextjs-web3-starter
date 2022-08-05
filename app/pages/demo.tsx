import { signInWithWallet } from "lib/auth.client";
import { getBalance, mint } from "lib/chain.client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ConnectedView = () => {
  const session = useSession();
  const [nftBalance, setNFTBalance] = useState(0)


  useEffect(() => {
    console.log('useeffect')

    const balance = async () => {
      if (session.data?.walletAddress) {
        const result: any = await getBalance(session);
        if (result) {
          console.log('balance')
          console.log(parseFloat(result.toString()))
          setNFTBalance(parseFloat(result.toString()))
        }
      }
    }

    balance()
  }, [session])

  return (
    <>
      <p>{`Welcome, ${session.data?.walletAddress}.`}</p>

      <div className="flex gap-4 my-4">
        <button
          className="bg-red-600 py-2 px-4 rounded-full text-white"
          onClick={() => signOut()}
        >
          {`Disconnect wallet`}
        </button>
        <p>Current balance: {nftBalance}</p>
        <button
          className="bg-green-600 py-2 px-4 rounded-full text-white"
          onClick={async () => await mint()}
        >
          Mint
        </button>
        <p></p>
      </div>
    </>
  );
};

const DisconnectedView = () => {
  return (
    <>
      <button
        className="bg-sky-600 py-2 px-4 rounded-full text-white"
        onClick={signInWithWallet}
      >
        {`Connect wallet`}
      </button>
    </>
  );
};

const Demo: NextPage = () => {
  const session = useSession();
  console.log(session)

  return (
    <div className="p-5">
      {session.data ? <ConnectedView /> : <DisconnectedView />}
    </div>
  );
};

export default Demo;
