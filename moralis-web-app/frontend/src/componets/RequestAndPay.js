import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber } from "antd";
import { polygonMumbai } from "@wagmi/chains";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction
} from "wagmi";

import ABI from "../abi.json";

function RequestAndPay({ requests, getSetNameAndBalance }) {
  const [payModal, setPayModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [requestAmount, setRequestAmount] = useState(5);
  const [requestAddress, setRequestAddress] = useState("");
  const [requestMessage, setRequestMessage] = useState("");

  console.log(requests)

  const { config } = usePrepareContractWrite({
    address: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    abi: ABI,
    chainId: polygonMumbai.id,
    functionName: "payRequest",
    args: [0],
    overrides: {
      value: String(Number(requests["1"][0] * 1e15))
    }
  });
  const { data, write: callPayRequest } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  });

  const { config: configForCreateRequest } = usePrepareContractWrite({
    address: "0xFACb04C23b21f40A725b18F8d4AA5571e183dc7C",
    abi: ABI,
    chainId: polygonMumbai.id,
    functionName: "createRequest",
    args: [requestAddress, requestAmount, requestMessage],
  });
  const { data: createReqData, write: callCreateRequest } = useContractWrite(
    configForCreateRequest
  );

  const { isLoading: isLoadingCreateReq, isSuccess: isSuccessCreateReq } =
    useWaitForTransaction({
      hash: createReqData?.hash
    });

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

  return (
    <>
      <Modal
        title="Confirm Payment"
        open={payModal}
        onOk={() => {
          callPayRequest?.();
          hidePayModal();
        }}
        onCancel={hidePayModal}
        okText="Proceed To Pay"
        cancelText="Cancel"
      >
        {requests && requests["0"].length > 0 && (
          <>
            <h2>Sending payment to {requests["3"][0]}</h2>
            <h3>Value: {requests["1"][0]} Matic</h3>
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
