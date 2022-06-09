import { signInWithWallet } from "lib/auth.client";
import type { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";

const ConnectedView = () => {
  const session = useSession();

  return (
    <>
      <p>{`Welcome, ${session.data?.walletAddress}.`}</p>
      <button onClick={() => signOut()}>
        {`Disconnect wallet`}
      </button>
    </>
  );
};

const DisconnectedView = () => {
  return (
    <>
      <button onClick={signInWithWallet}>
        {`Connect wallet`}
      </button>
    </>
  );
};

const Home: NextPage = () => {
  const session = useSession();

  return (
    <>
      {session.data ? <ConnectedView /> : <DisconnectedView />}
    </>
  );
};

export default Home;
