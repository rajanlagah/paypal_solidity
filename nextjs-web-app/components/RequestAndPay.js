import React, { useState, useEffect } from "react";
import { DollarOutlined, SwapOutlined } from "@ant-design/icons";
import { Modal, Input, InputNumber, Spin } from "antd";

const RequestAndPay = ({
  handleOnPayReqClick,
  payModal,
  isLoadingPayReq,
  hidePayModal,
  waitingForConfirmation,
  requests,
  requestModal,
  handleOnCreateReqClick,
  isLoadingCreateReq,
  hideRequestModal,
  setRequestAmount,
  requestAmount,
  setRequestAddress,
  requestAddress,
  setRequestMessage,
  requestMessage,
  showPayModal,
  showRequestModal,
  isuserAddressWrong
}) => (
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
          <p>{requests["2"][0]}</p>
        </>
      )}
      {waitingForConfirmation && (
        <Spin tip="Waiting for confirmation" size="large">
          <br />
          <br />
          <div className="content" />
          <br />
          <br />
        </Spin>
      )}
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
      {!waitingForConfirmation && (
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
      )}
      {waitingForConfirmation && (
        <Spin tip="Waiting for confirmation" size="large">
          <br />
          <br />
          <div className="content" />
          <br />
          <br />
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

export default RequestAndPay;
