import React, { useState } from "react";
import { Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import SetUserName from "./SetUserName";
// import matic from "../matic.png";

function AccountDetails({ name,getSetNameAndBalance, balance, address = "" }) {
  const [userName, setuserName] = useState(name);
  return (
    <Card title="Account Details" style={{ width: "100%" }}>
      <div className="accountDetailRow">
        <UserOutlined style={{ color: "#767676", fontSize: "25px" }} />
        <div>
          <div className="accountDetailHead"> {name && name} </div>
          <div className="accountDetailBody">
            {" "}
            Address: {address.substring(0, 6)} ... {address.slice(-6)}
          </div>
        </div>
      </div>
      <div className="accountDetailRow">
        {/* <img src={matic} alt="maticLogo" width={25} /> */}
        <div>
          <div className="accountDetailHead"> Native Matic Tokens</div>
          <div className="accountDetailBody">{balance} Matic</div>
        </div>
      </div>
      <SetUserName
        setuserName={setuserName}
        userName={userName}
        getSetNameAndBalance={getSetNameAndBalance}
      />
    </Card>
  );
}

export default AccountDetails;
