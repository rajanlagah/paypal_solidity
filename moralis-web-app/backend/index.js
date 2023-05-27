const express = require("express");
const Moralis = require("moralis").default;
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
const ABI = require("./abi.json");

app.use(cors());
app.use(express.json());


function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(0, 4)}`,
    subject: transaction[4]
  }));

  return dataArray.reverse();
}

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;

  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "80001",
    address: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getMyName",
    abi: ABI,
    params: { _user_address: userAddress }
  });
  const json_response = response.raw;

  const user_balance = await Moralis.EvmApi.balance.getNativeBalance({
    chain: "80001",
    address: userAddress
  });

  const json_user_balance = (user_balance.raw.balance / 1e18).toFixed(2);

  const matic_price = await Moralis.EvmApi.token.getTokenPrice({
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
  });
  const json_matic_price = matic_price.raw.usdPrice;

  console.log("json_user_balance", json_user_balance);
  console.log("matic_price", json_matic_price);

  const dollar_value = (json_user_balance * json_matic_price).toFixed(2);

  const response_history = await Moralis.EvmApi.utils.runContractFunction({
    chain: "80001",
    address: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getMyHistory",
    abi: ABI,
    params: { _user_address: userAddress }
  });

  const formated_history = convertArrayToObjects(response_history.raw);

  const response_request = await Moralis.EvmApi.utils.runContractFunction({
    chain: "80001",
    address: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getAllRequests",
    abi: ABI,
    params: { _user_address: userAddress }
  });

  const formated_requests = response_request.raw;

  return res.status(200).json({
    username: json_response,
    balance: json_user_balance,
    dollar_value,
    formated_history,
    formated_requests
  });
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
