import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
// import { contractAddress, abi } from "./../contracts/index";
// import { getSchedule, stringToArray } from "cron-converter";

import ABI from "./../abi.json";
import CurrentBalance from "../components/CurrentBalance";
import RequestAndPay from "../components/RequestAndPay";
import AccountDetails from "../components/AccountDetails";
import RecentActivity from "../components/RecentActivity";
import { Layout } from "antd";

const { Header, Content } = Layout;




function convertArrayToObjects(arr) {
    const dataArray = arr.map((transaction, index) => ({
      key: (arr.length + 1 - index).toString(),
      type: transaction[0],
      amount: parseFloat(transaction[1].toString())/1000,
      message: transaction[2],
      address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(0, 4)}`,
      subject: transaction[4]
    }));
  
    return dataArray.reverse();
  }

export default function HomePage() {
  const [name, setName] = useState("...");
  const [isLoadingConfig, setisLoadingConfig] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollarsBalance, setDollarsBalance] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ 1: [0], 0: [] });

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  //   "80001";
  const [address, setAddress] = useState();
  useEffect(() => {
    if (isWeb3Enabled && account) {
      setAddress(account);
    }
  }, [isWeb3Enabled, account]);

  const {
    runContractFunction: getMyName,
    isLoading,
    isFetching
  } = useWeb3Contract({
    abi: ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getMyName",
    params: { _user_address: address }
    // msgValue: entryFee,
  });

  const { runContractFunction: getMyHistory } = useWeb3Contract({
    abi: ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getMyHistory",
    params: { _user_address: address }
    // msgValue: entryFee,
  });

  const { runContractFunction: getAllRequests } = useWeb3Contract({
    abi: ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "getAllRequests",
    params: { _user_address: address }
    // msgValue: entryFee,
  });

  const getSetNameAndBalance = async () => {
    try {
      const _user_name = await getMyName();
      const _user_history = await getMyHistory();
      const _user_requests = await getAllRequests();
      if (_user_name && _user_name.length > 0 && _user_name[1]) {
        setName(_user_name[0]);
      }
      console.log("_user_name -", _user_name);
      console.log("_user_history -", _user_history);
      console.log("_user_requests -", _user_requests);

      // setBalance(String(response.balance));
      // setDollarsBalance(String(response.dollar_value));
      if(_user_history){
          setHistory(convertArrayToObjects(_user_history));
      }
      if(_user_requests){
        setRequests(_user_requests)
    };
    } catch (e) {
      console.log("err", e);
    }
  };
  useEffect(() => {
    if (isWeb3Enabled && address) {
      getSetNameAndBalance();
    }
  }, [isWeb3Enabled, address]);

  return (
    <div className="App">
      <Layout>
        <Content className="content">
          <div className="firstColumn">
            <CurrentBalance dollarsBalance={"0"} />
            <RequestAndPay
              requests={requests}
              getSetNameAndBalance={getSetNameAndBalance}
            />
            <AccountDetails name={name} address={address} balance={balance} />
          </div>
          <div className="secondColumn">
            <RecentActivity history={history} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}
