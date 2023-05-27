import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber } from "antd";

import ABI from "../abi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";

function RequestAndPay({ requests, getSetNameAndBalance }) {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(5);
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  // const [isSuccessCreateReq, setisSuccessCreateReq] = useState(false);

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const {
    runContractFunction: payRequest,
    isLoading,
    isFetching,
    isSuccess,
  } = useWeb3Contract({
    abi:ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "payRequest",
    params: {_request_index:0},
    msgValue: String(Number(requests["1"][0] * 1e15)),
  });



  // const createReq = () => {
  // console.log("requestAddress",requestAddress)
    const {
      runContractFunction: callCreateRequest,
      // isLoading,
      // isFetching,
      isSuccess:isSuccessCreateReq
    } = useWeb3Contract({
      abi:ABI,
      chainId,
      contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
      functionName: "createRequest",
      params: {
        _otherPartyAddress: requestAddress,
        _amount: requestAmount,
        _message: requestMessage
      }
    });
  //   callCreateRequest()
  // }

  useEffect(() => {
    if (isSuccess || isSuccessCreateReq) {
      getSetNameAndBalance();
    }
  }, [isSuccess, isSuccessCreateReq]);
  const showPayModal = () => {
    setPayModal(true);
  };

  const hidePayModal = () => {
    setPayModal(false);
  };

  const showRequestModal = () => {
    setRequestModal(true);
  };

  const hideRequestModal = () => {
    setRequestModal(false);
  };
  // console.log(callCreateRequest)
  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={() => {
          payRequest();
          hidePayModal();
        }}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
        {requests && requests["0"].length > 0 && (
          <>
            <h2>Sending payment to {requests["3"][0]}</h2>
            {/* <h3>Value: {requests["1"][0]} Matic</h3> */}
            <p>"{requests["2"][0]}"</p>
          </>
        )}
      </Modal>
      <Modal
        title="Request A Payment"
        open={requestModal}
        onOk={() => {
          console.log("------------")
          callCreateRequest();
          hideRequestModal();
        }}
        onCancel={hideRequestModal}
        okText="Proceed To Request"
        cancelText="Cancel"
      >
            {/* <h2>Sending req to {requestAddress}</h2> */}
        <p>Amount (Matic)</p>
        <InputNumber
          value={requestAmount}
          onChange={(val) => setRequestAmount(val)}
        />
        <p>From (address)</p>
        <Input
          placeholder="0x..."
          value={requestAddress}
          onChange={(val) => setRequestAddress(val.target.value)}
        />
        <p>Message</p>
        <Input
          placeholder="Lunch Bill..."
          value={requestMessage}
          onChange={(val) => setRequestMessage(val.target.value)}
        />
      </Modal>
      <div className="requestAndPay">
        <div
          className="quickOption"
          onClick={() => {
            showPayModal();
          }}
        >
          <DollarOutlined style={{ fontSize: "26px" }} />
          Pay
          {requests && requests[0] && requests[0].length > 0 && (
            <div className="numReqs">{requests[0].length}</div>
          )}
        </div>
        <div
          className="quickOption"
          onClick={() => {
            showRequestModal();
          }}
        >
          <SwapOutlined style={{ fontSize: "26px" }} />
          Request
        </div>
      </div>
    </>
  );
}

export default RequestAndPay;
