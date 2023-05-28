const Moralis = require("moralis").default;
// Moralis.start({
//     apiKey: process.env.MORALIS_KEY
// })
const getUserBalance = async (req, res) => {
  const { userAddress } = req.query;
  if(Moralis.Core.isStarted){
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
  }
  try {
    console.log("userAddress", userAddress);
    console.log("process.env.MORALIS_API_KEY", process.env.MORALIS_API_KEY);
    const user_balance = await Moralis.EvmApi.balance.getNativeBalance({
      chain: "80001",
      address: userAddress
    });

    const json_user_balance = (user_balance.raw.balance / 1e18).toFixed(2);

    const matic_price = await Moralis.EvmApi.token.getTokenPrice({
      address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    });

    const json_matic_price = matic_price.raw.usdPrice;
    const dollar_value = (json_user_balance * json_matic_price).toFixed(2);

    return res.status(200).json({
      balance: json_user_balance,
      dollar_value
    });
  } catch (e) {
    console.log("Exception in getUserBalance", e);

    return res.status(500).json({error:true});
  }
};
export default getUserBalance;
