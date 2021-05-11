import React, { createContext, useContext, useEffect, useState } from "react";
import EventMain from "../contracts/EventMain.json"
import Web3 from "web3";
import { AlertContext } from '../AlertContext';

export const ContractContext = createContext();
export const ContractProvider = (props) => {
  const [contract, setContract] = useState(undefined);
  const [state, dispatch] = useContext(AlertContext);
  const loadWeb3 = () => {
    if (window.ethereum) {
      return new Web3(window.ethereum);
    }
  }
  useEffect(() => {
    const initContract = async()=>{
      const web3 = loadWeb3();
      if(!web3) return dispatch({type: "ADD_ALERT", payload: {message: "Install Metamask to use this site!", error: true}});

      const networkId = await web3.eth.net.getId()
      const networkData = EventMain.networks[networkId]
      if(networkData) {
        const abi = EventMain.abi
        const address = networkData.address
        const contract = new web3.eth.Contract(abi, address)
        setContract(contract)
      }
    }
    initContract();

  }, []);
  
  return (
    <ContractContext.Provider value={[contract, setContract]}>
      {props.children}
    </ContractContext.Provider>
  );
};
