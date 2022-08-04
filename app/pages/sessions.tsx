import { signInWithWallet } from "lib/auth.client";
import { mint } from "lib/chain.client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const ConnectedView = () => {
  const session = useSession();

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

        <button
          className="bg-green-600 py-2 px-4 rounded-full text-white"
          onClick={async () => await mint()}
        >
          Mint
        </button>
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

const Sessions: NextPage = () => {
  const session = useSession();

  return (
    <div className="p-5">
      {session.data ? <ConnectedView /> : <DisconnectedView />}
    </div>
  );
};

export default Sessions;
