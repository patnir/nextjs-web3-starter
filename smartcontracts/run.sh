yarn hardhat node &
P1=$!
yarn hardhat run --network localhost scripts/deploy.ts && cp ./artifacts/contracts/Cypherpunk.sol/Cypherpunk.json /home/app/contracts && cp ./contract.json /home/app/contracts &
P2=$!
wait $P1 $P2