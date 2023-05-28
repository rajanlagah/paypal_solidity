import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";

import ABI from "../abi.json";
import RequestAndPay from "../components/RequestAndPay";

function RequestAndPayContainer({ requests, getSetNameAndBalance }) {
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
    if (res) {
      setwaitingForConfirmation(true);
      await res.wait(1);
      setwaitingForConfirmation(false);
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
    <RequestAndPay
      handleOnPayReqClick={handleOnPayReqClick}
      payModal={payModal}
      isLoadingPayReq={isLoadingPayReq}
      hidePayModal={hidePayModal}
      waitingForConfirmation={waitingForConfirmation}
      requests={requests}
      requestModal={requestModal}
      handleOnCreateReqClick={handleOnCreateReqClick}
      isLoadingCreateReq={isLoadingCreateReq}
      hideRequestModal={hideRequestModal}
      setRequestAmount={setRequestAmount}
      requestAmount={requestAmount}
      setRequestAddress={setRequestAddress}
      requestAddress={requestAddress}
      setRequestMessage={setRequestMessage}
      requestMessage={requestMessage}
      showPayModal={showPayModal}
      showRequestModal={showRequestModal}
      isuserAddressWrong={isuserAddressWrong}
    />
  );
}

export default RequestAndPayContainer;
