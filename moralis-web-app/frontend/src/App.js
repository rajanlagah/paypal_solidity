import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

import "./App.css";
import logo from "./logo.png";
import { Layout, Button } from "antd";
import CurrentBalance from "./componets/CurrentBalance";
import RequestAndPay from "./componets/RequestAndPay";
import AccountDetails from "./componets/AccountDetails";
import RecentActivity from "./componets/RecentActivity";
import axios from "axios";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector()
  });
  const { disconnect } = useDisconnect();

  const [name, setName] = useState("...");
  const [isLoadingConfig, setisLoadingConfig] = useState("...");
  const [balance, setBalance] = useState("...");
  const [dollarsBalance, setDollarsBalance] = useState("...");
  const [history, setHistory] = useState(null);
  const [requests, setRequests] = useState({ 1: [0], 0: [] });

  const setStateNull = () => {
    setName("...");
    setBalance("...");
    setDollarsBalance("...");
    setHistory(null);
    setRequests({ 1: [0], 0: [] });
  };
  const getSetNameAndBalance = async () => {
    setisLoadingConfig(true);
    const res = await axios.get(`http://localhost:3001/getNameAndBalance`, {
      params: { userAddress: address }
    });
    setisLoadingConfig(false);
    const response = res.data;
    if (response?.username && response.username[1]) {
      setName(response.username[0]);
    }
    setBalance(String(response.balance));
    setDollarsBalance(String(response.dollar_value));
    setHistory(response.formated_history);
    setRequests(response.formated_requests);
  };
  useEffect(() => {
    if (!isConnected) {
      setStateNull();
      return;
    }
    getSetNameAndBalance();
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div>
        <Header className="header">
          <div className="headerLeft">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <Button type={"primary"} onClick={connect}>
            Connect Wallet
          </Button>
        </Header>
        <span className="content">Please login first</span>
      </div>
    );
  }
  return (
    <div className={`App ${isLoadingConfig && "disable-content"}`}>
      <Layout>
        <Header className="header">
          <div className="headerLeft">
            <img src={logo} alt="logo" className="logo" />
            <>
              <div
                className="menuOption"
                style={{ borderBottom: "1.5px solid black" }}
              >
                Summary
              </div>
              <div className="menuOption">Activity</div>
              <div className="menuOption">{`Send & Request`}</div>
              <div className="menuOption">Wallet</div>
              <div className="menuOption">Help</div>
            </>
          </div>

          <Button type={"primary"} onClick={disconnect}>
            Disconnect Wallet
          </Button>
        </Header>
        <Content className="content">
          <div className="firstColumn">
            <CurrentBalance dollarsBalance={dollarsBalance} />
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

export default App;
