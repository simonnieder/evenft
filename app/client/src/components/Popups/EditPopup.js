import React, {useContext} from "react";
import Button from "../Button";
import Popup from "./Popup";
import {AccountContext} from "../../AccountContext";
import { ContractContext } from "../../context/ContractContext";
const EditPopup = ({ onClose, ticket, setAlert, openSellPopup }) => {
  const [account] = useContext(AccountContext);
  const [contract] = useContext(ContractContext)
  const stopSelling = () =>{
    onClose();
    const stopSellingTicket = async () => {
        if(!contract)return;
        await contract.methods.stopSellingTicket(ticket.id).send({from: account}).on('receipt', function(receipt){
          setAlert({error: false, message: "Ticket put off the market."}) 
        }).catch((err)=>{
          setAlert({error: true, message: "Putting ticket off the market failed."}) 
        })
    }
    stopSellingTicket();
  }
  return (
    <Popup title="Edit" onClose={onClose}>
      <h2 className="font-header text-xl text-neutrals-300 mb-3">
        Change the price for your ticket or put it off the market.
      </h2>
        <div className="space-y-2">
          <div className="flex space-x-5">
            <Button full submit primary onClick={()=>{
              onClose(); 
              openSellPopup();
              }}>Edit Price
            </Button>
            <Button full outlined onClick={stopSelling}>Stop selling</Button>
          </div>
          <Button full outlined onClick={onClose} >
            Cancel
          </Button>
        </div>
    </Popup>
  );
};

export default EditPopup;
