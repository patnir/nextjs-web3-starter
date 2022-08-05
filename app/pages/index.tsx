import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="bg-white w-full min-h-screen border-t-2 border-t-purple-500 text-gray-500 text-lg">
      <div className="max-w-screen-xl p-4 mx-auto">
        <header className="py-32 text-center">
          <h1 className="font-bold text-6xl text-black">
            {`Next.js Web3 Starter`}
          </h1>

          <p className="max-w-xl mt-10 mx-auto text-xl">
            {`
              A modern, full-stack Next.js & Web3 boilerplate with Docker, TypeScript, Hardhat, NextAuth.js,
              Tailwind, Postgres, and painless local development for your next Web3 project.
            `}
          </p>
          
          <div className="max-w-xl mx-auto text-xl">
          <a
              target="_blank" rel="noopener noreferrer"
              className="inline-block m-10 p-3 border border-2 border-purple-500 rounded shadow-md mt-8 font-medium"
              href="https://rpatnir.gumroad.com/l/evmjs"
            >
              {`Get it on Gumroad`}
            </a>
          <Link href={"/demo"}>
            <button className="inline-block m-10 p-3 border border-2 border-purple-500 rounded shadow-md mt-8 font-medium">See it in action!</button>
          </Link>
          
          </div>
        </header>

        <section className="flex flex-col lg:grid grid-cols-[40%_1fr] align-center gap-5 lg:gap-14">
          <div className="pt-10">
            <h2 className="font-semibold text-3xl text-black">
              {`Wallet connect out of the box`}
            </h2>
            <p className="mt-3">
              {`
                Don't waste time setting up wallet connect—it comes out of the box. Focus on what differentiates
                your app sooner.
              `}
            </p>
            <p className="mt-3">
              {`
                Ships with NextAuth.js and a custom provider for Ethereum, so anything more custom can be handled
                with a familiar library.
              `}
            </p>
          </div>

          <pre className="bg-slate-800 py-5 px-6 rounded overflow-x-auto">
            <code className="text-gray-300">
              <span className="text-purple-400">{`import`}</span>{` { signInWithWallet } `}<span className="text-purple-400">{`from`}</span><span className="text-green-300">{` "lib/auth.client"`}</span>{`;\n`}
              <span className="text-purple-400">{`import type`}</span>{` { `}<span className="text-yellow-400">{`NextPage`}</span>{` } from `}<span className="text-green-300">{`"next"`}</span>{`;\n`}
              <span className="text-purple-400">{`import`}</span>{` { signOut, useSession } `}<span className="text-purple-400">{`from`}</span>{` `}<span className="text-green-300">{`"next-auth/react"`}</span>{`;\n`}
              {`\n`}
              <span className="text-purple-400">{`export default function`}</span><span className="text-yellow-400">{` Page`}</span>{`: `}<span className="text-blue-300">{`NextPage`}</span><span className="text-purple-400">{` = `}</span>{`()`}<span className="text-purple-400">{` => `}</span>{`{\n`}
              <span className="text-purple-400">{`  const `}</span>{`session `}<span className="text-purple-400">{`= `}</span><span className="text-blue-300">{`useSession`}</span>{`();\n`}
              <span className="text-purple-400">{`  if`}</span>{` (session.data) {\n`}
              <span className="text-purple-400">{`    return`}</span><span className="text-gray-500">{` <`}</span><span className="text-blue-300">{`button `}</span><span className="text-orange-300">{`onClick`}</span><span className="text-purple-400">{`=`}</span>{`{() `}<span className="text-purple-400">{`=> `}</span><span className="text-blue-300">{`signOut`}</span>{`()}`}<span className="text-gray-500">{`>`}</span>{`Disconnect`}<span className="text-gray-500">{`</`}</span><span className="text-blue-300">{`button`}</span><span className="text-gray-500">{`>`}</span>{`;\n`}
              {`  } `}<span className="text-purple-400">{`else`}</span>{` {\n`}
              <span className="text-purple-400">{`    return `}</span><span className="text-gray-500">{`<`}</span><span className="text-blue-300">{`button `}</span><span className="text-orange-300">{`onClick`}</span><span className="text-purple-400">{`=`}</span>{`{signInWithWallet}`}<span className="text-gray-500">{`>`}</span>{`Connect wallet`}<span className="text-gray-500">{`</`}</span><span className="text-blue-300">{`button`}</span><span className="text-gray-500">{`>`}</span>{`;\n`}
              {`  }\n`}
              {`}`}
            </code>
          </pre>
        </section>

        <section className="flex flex-col lg:grid grid-cols-[60%_1fr] align-center gap-5 lg:gap-14 my-36">
          <div className="lg:order-2 pt-10">
            <h2 className="font-semibold text-3xl text-black">
              {`Develop against local contracts`}
            </h2>
            <p className="mt-3">
              {`
                Don't sweat over having to deploy to a testnet to begin testing your app's functionality.
                Use your locally managed JSON-RPC node via Hardhat to make changes and see them immediately.
              `}
            </p>
          </div>

          <pre className="bg-slate-800 py-5 px-6 rounded overflow-x-auto">
            <code className="text-gray-400">
              {`nextjs-web3-starter/..\n`}
              {`|_ app/\n`}
              <span className="text-white">{`|_ smartcontracts/\n`}</span>
              {`|_ docker-compose.yml\n`}
              {`|_ README.md`}
            </code>
          </pre>
        </section>

        <section className="flex flex-col lg:grid grid-cols-[40%_1fr] align-center gap-5 lg:gap-14 my-36">
          <div className="pt-10">
            <h2 className="font-semibold text-3xl text-black">
              {`Docker Compose it all`}
            </h2>
            <p className="mt-3">
              {`
                Spinning up your app, database, and JSON-RPC node is easy with Docker. Just run the Docker
                Compose command and begin writing code right away.
              `}
            </p>
          </div>

          <pre className="bg-slate-800 py-5 px-6 rounded overflow-x-auto">
            <code className="text-gray-300">
              <span className="text-gray-400">{`$`}</span>{` docker-compose up\n`}
              <span className="text-gray-400">
                {`[+] Running 3/0\n`}
                {` ⠿ Container nextjs-web3-starter-app-1        Created  0.0s\n`}
                {` ⠿ Container nextjs-web3-starter-db-1         Created  0.0s\n`}
                {` ⠿ Container nextjs-web3-starter-contracts-1  Created  0.0s`}
              </span>
            </code>
          </pre>
        </section>
      </div>
    </div>
  );
};

export default Home;
