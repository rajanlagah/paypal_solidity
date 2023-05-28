import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber, Spin} from "antd";

import ABI from "../abi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";

function RequestAndPay({ requests, getSetNameAndBalance }) {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(5);
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [waitingForConfirmation, setwaitingForConfirmation] = useState(false);
  const [isSuccessCreateReq, setisSuccessCreateReq] = useState(false);
  const [isuserAddressWrong, setisuserAddressWrong] = useState(false);
  const [isSuccessPayReq, setisSuccessPayReq] = useState(false);

  const { chainId: chainIdHex, isWeb3Enabled, account } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const {
    runContractFunction: payRequest,
    isLoading: isLoadingPayReq,
    isFetching
    // onSuccess:isSuccess,
  } = useWeb3Contract({
    abi: ABI,
    chainId,
    contractAddress: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    functionName: "payRequest",
    params: { _request_index: 0 },
    msgValue: String(Number(requests["1"][0] * 1e15))
  });

  // const createReq = () => {
  // console.log("requestAddress",requestAddress)
  const {
    runContractFunction: callCreateRequest,
    isLoading: isLoadingCreateReq
    // isFetching,
    // onSuccess:isSuccessCreateReq
  } = useWeb3Contract({
    abi: ABI,
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
  // console.log("isSecureContext - ",isSuccessCreateReq)
  useEffect(() => {
    if (isSuccessPayReq || isSuccessCreateReq) {
      getSetNameAndBalance();
    }
  }, [isSuccessPayReq, isSuccessCreateReq]);
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

  const handleOnPayReqClick = async () => {
    setisSuccessPayReq(false);
    const res = await payRequest();
    if(res){
      setwaitingForConfirmation(true)
      await res.wait(1);
      setwaitingForConfirmation(false)
      setisSuccessPayReq(true);
    }
    hidePayModal();
  };

  const handleOnCreateReqClick = async () => {
    setisSuccessCreateReq(false);
    setisuserAddressWrong(false);
    const res = await callCreateRequest();
    if (res) {
      setwaitingForConfirmation(true);
      await res.wait(1);
      setwaitingForConfirmation(false);
      setisSuccessCreateReq(true);
      hideRequestModal();
    } else {
      setisuserAddressWrong(true);
    }
  };

  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={handleOnPayReqClick}
        confirmLoading={isLoadingPayReq}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
        {!waitingForConfirmation && requests && requests["0"].length > 0 && (
          <>
            <h2>Sending payment to {requests["3"][0]}</h2>
            <p>"{requests["2"][0]}"</p>
          </>
        )}
        {waitingForConfirmation &&
           <Spin tip="Waiting for confirmation" size="large">
            <br/>
            <br/>
            <div className="content" />
            <br/>
            <br/>
          </Spin>
        }
      </Modal>
      <Modal
        title="Request A Payment"
        open={requestModal}
        onOk={handleOnCreateReqClick}
        confirmLoading={isLoadingCreateReq || waitingForConfirmation}
        onCancel={hideRequestModal}
        okText="Proceed To Request"
        cancelText="Cancel"
      >
        {!waitingForConfirmation &&
        <>
        <p>Amount ( {Number(requestAmount || 0) / 1000} Matic)</p>
        <InputNumber
          value={requestAmount}
          onChange={(val) => setRequestAmount(val)}
          />
        <p>From (address)</p>
        <Input
          placeholder="0x..."
          value={requestAddress}
          status={isuserAddressWrong && "error"}
          onChange={(val) => setRequestAddress(val.target.value)}
          />
        <p>Message</p>
        <Input
          placeholder="Lunch Bill..."
          value={requestMessage}
          onChange={(val) => setRequestMessage(val.target.value)}
          />
          </>
          }
        {waitingForConfirmation && (
          <Spin tip="Waiting for confirmation" size="large">
            <br/>
            <br/>
            <div className="content" />
            <br/>
            <br/>
          </Spin>
        )}
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
