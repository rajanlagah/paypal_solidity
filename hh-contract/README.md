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
npx hardhat run scripts//deploy.js --network mumbai
```
## Verify

```shell
npx hardhat verify <contract-address>
```

Contract address example `0xb4eba79679549374e84b6911d5C2D3F5e8A23410`