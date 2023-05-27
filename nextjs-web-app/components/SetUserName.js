import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber } from "antd";

import ABI from "../abi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";

function SetUserName({userName,setuserName,getSetNameAndBalance}) {
  const [isSuccess, setisSuccess] = useState(false);
  const [showSetUserNameModal, setshowSetUserNameModal] = useState(false);

  const { chainId: chainIdHex, account } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const {
    runContractFunction: addName,
    isLoading,
    isFetching
    // onSuccess:isSuccess,
  } = useWeb3Contract({
    abi: ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "addName",
    params: { _name: userName }
  });
  useEffect(() => {
    if (isSuccess ) {
      getSetNameAndBalance();
    }
  }, [isSuccess]);

  const showsetshowSetUserNameModal = (status) => {
    setshowSetUserNameModal(status);
  };

  const handleOnPayReqClick = async () => {
    setisSuccess(false);
    const res = await addName();
    await res.wait(1);
    setisSuccess(true);
    showsetshowSetUserNameModal(false);
  };

  return (
    <>
      <Modal
        title="Enter username"
        open={showSetUserNameModal}
        onOk={handleOnPayReqClick}
        onCancel={() => showsetshowSetUserNameModal(false)}
        okText="Proceed To Request"
        cancelText="Cancel"
      >
        <Input
          placeholder="Rajan"
          value={userName}
          onChange={(val) => setuserName(val.target.value)}
        />
      </Modal>
      <div className="balanceOptions">
        <button
          className="extraOption"
          onClick={() => showsetshowSetUserNameModal(true)}
        >
          Set Username
        </button>
        {/* <div className="extraOption">Switch Accounts</div> */}
      </div>
    </>
  );
}

export default SetUserName;
