# nextjs-web3-starter

[Landing Page](https://www.evmjs.com/)

If something doesn’t work, please [file an issue](https://github.com/patnir/nextjs-web3-starter/issues/new)

## What’s Included?

Your environment will have everything you need to build a modern Ethereum-powered single-page Next JS app:

- Smooth project management via [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)
- Everything included with [Create React
  App](https://github.com/facebook/create-react-app/blob/master/README.md#whats-included): React, JSX, ES6, TypeScript
- Template NFT smart contract using the ERC-721 standard
- Minimalist structure for managing the smart contract [ABIs](https://ethereum.stackexchange.com/questions/234/what-is-an-abi-and-why-is-it-needed-to-interact-with-contracts) and addresses
- Everything is dockerized! Just `docker-compose up` and GO!

## How to get started: 

```
docker-compose up
```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.<br>

#### How to install precommit:
Precommit is a check to ensure that your code's styling is consistent and always upto date.

```
brew install pre-commit
pre-commit install
pre-commit run --all-files
```

## Creating an App

**You’ll need to have Node 14 or later version on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

**For the best local development experience. you'll need Docker on your local development machine**.

## Philosophy

- **Minimalistic by design:** You are one command away from creating a new Ethereum-powered Next JS app

- **End-to-End**: This App provides you everything that you need to build and maintain an Ethereum-powered Next JS app: Authentication, Deploying smart contracts, Verifying smart contracts

- **Not Reinventing The Wheel**: This just works! No experimental features. Stable and solid. 

## License

NextJS-Web3-Starter is open source [licensed as MIT](https://github.com/paulrberg/create-eth-app/blob/develop/LICENSE).