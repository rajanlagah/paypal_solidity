import { useEffect, useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
// import { contractAddress, abi } from "./../contracts/index";
// import { getSchedule, stringToArray } from "cron-converter";

import ABI from "./../abi.json";
import CurrentBalance from "../components/CurrentBalance";
import AccountDetails from "../components/AccountDetails";
import RecentActivity from "../components/RecentActivity";
import { Layout } from "antd";
import fetchUserBalance from "../api/fetchUserBalance";
import RequestAndPayContainer from "./RequestAndPayContainer";

const { Header, Content } = Layout;

function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: parseFloat(transaction[1].toString()) / 1000,
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
  const [address, setAddress] = useState();

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);
  //   "80001";
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
    setisLoadingConfig(true);
    try {
      const _user_name = await getMyName();
      const _user_history = await getMyHistory();
      const _user_requests = await getAllRequests();
      setisLoadingConfig(false);
      if (_user_name && _user_name.length > 0 && _user_name[1]) {
        setName(_user_name[0]);
      }
      console.log("_user_name -", _user_name);
      console.log("_user_history -", _user_history);
      console.log("_user_requests -", _user_requests);

      if (_user_history) {
        setHistory(convertArrayToObjects(_user_history));
      }
      if (_user_requests) {
        setRequests(_user_requests);
      }
    } catch (e) {
      setisLoadingConfig(false);

      console.log("err", e);
    }
  };

  useEffect(() => {
    if (isWeb3Enabled && address) {
      getSetNameAndBalance();
      getSetUserBalance();
    }
  }, [isWeb3Enabled, address]);

  const getSetUserBalance = async () => {
    try {
      const res = await fetchUserBalance(address);
      console.log("res", res);
      if (!res.error) {
        setDollarsBalance(res.dollar_value);
        setBalance(res.balance);
      }
      console.log("res res = ", res);
    } catch (e) {
      console.log("Exception", e);
    }
  };

  return (
    <div className={`App ${isLoadingConfig && "disable-content"}`}>
      <Layout>
        <Content className="content">
          <div className="firstColumn">
            <CurrentBalance dollarsBalance={dollarsBalance} />
            <RequestAndPayContainer
              requests={requests}
              getSetNameAndBalance={getSetNameAndBalance}
            />
            <AccountDetails
              getSetNameAndBalance={getSetNameAndBalance}
              name={name}
              address={address}
              balance={balance}
            />
          </div>
          <div className="secondColumn">
            <RecentActivity history={history} />
          </div>
        </Content>
      </Layout>
    </div>
  );
}
