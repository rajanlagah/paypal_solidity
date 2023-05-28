import axios from "axios";

// Make a request for a user with a given ID
const fetchUserBalance = async (user_address) => {
  try {
    const response = await axios(
      `/api/getUserBalance?userAddress=${user_address}`
    );
    if (response.status == 200) {
      return {
        error: false,
        ...response.data
      };
    } else {
      return {
        error: true,
        balance: "-",
        dollar_value: "-"
      };
    }
  } catch (e) {
    console.log(error);
    return {
      error: true,
      balance: "-",
      dollar_value: "-"
    };
  }
};

export default fetchUserBalance;
