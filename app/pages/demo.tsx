import { signInWithWallet } from "lib/auth.client";
import { getBalance, mint } from "lib/chain.client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ConnectedView = () => {
  const session = useSession();
  const [nftBalance, setNFTBalance] = useState(-1)
  const [nfts, setNFTs] = useState([])

  const getNFTs = async () => {
    if (session.data?.walletAddress && nfts && nfts.length === 0) {
      console.log(nfts)
      console.log(nfts)
      const response = await fetch(`/api/nfts/${session.data.walletAddress}`, {
        method: "GET",
      });

      if (response.status == 200) {
        const result = await response.json()
        console.log(result)
        setNFTs(result['ownedNfts'])
      }
    }
  }

  useEffect(() => {
    if (nftBalance >= 0) {
      getNFTs()
    }
  }, [nftBalance])

  useEffect(() => {
    console.log('useeffect')

    const balance = async () => {
      if (session.data?.walletAddress) {
        const result: any = await getBalance(session);
        if (result) {
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
        {nftBalance >= 0 && <p>Current balance: {nftBalance}</p>}
        <button
          className="bg-green-600 py-2 px-4 rounded-full text-white"
          onClick={async () => await mint()}
        >
          Mint
        </button>
      </div>
      {nfts &&
        <div className="grid md:grid-cols-4 md:gap-4 lg:grid-cols-8 lg:gap-8 grid-cols-2  gap-2">
          {nfts.map((nft) => {
            let image_link = nft['metadata']['image'] as string;
            try {
              if (image_link.startsWith('ipfs')) {
                const split = image_link.split('/')
                image_link = `https://ipfs.io/ipfs/${split[2]}/${split[3]}`
              }
              return <div>
                <img width={500} height={500} src={image_link} />
              </div>
            } catch (error) {
              console.log('error')
              console.log(error)
              return;
            }
          })}
        </div>}

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
