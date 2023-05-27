# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
# paypal_solidity

## Compile 
```shell
npx hardhat compile
```
## Deploy 
Make sure you have sufficient Matic in your given account
```shell
npx hardhat run scripts/deploy.js --network mumbai
```
## Verify

```shell
npx hardhat verify <contract-address> --network mumbai
```

Contract address example 

v1 - `0xb4eba79679549374e84b6911d5C2D3F5e8A23410`

v2 - `0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C`