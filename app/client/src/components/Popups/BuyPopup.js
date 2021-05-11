import React, {useContext} from "react";
import Button from "../Button";
import Popup from "./Popup";
import {AccountContext} from "../../AccountContext";
import Web3 from "web3";
import { ContractContext } from "../../context/ContractContext";
const BuyPopup = ({ onClose, event, setAlert}) => {
  const [account] = useContext(AccountContext);
  const [contract] = useContext(ContractContext)
  const buy = () =>{
    onClose()
    const buyEvent = async()=> {
        if(!contract)return;
        await contract.methods.buyTicket(event.id).send({from: account, value: Web3.utils.toWei(event.price)}).on('receipt', function(receipt){
          console.log(receipt);
          setAlert( {message: "You purchased a ticket!!", error: false})
        }).catch((err)=>{
          setAlert({message: "Purchase failed!", error: true})
        })
    }
    buyEvent();
  }
  return (
    <Popup title="Details" onClose={onClose}>
      <div className="space-y-5">
        <div className="space-y">
          <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Title</span>
          <p className=" text-neutrals-400 font-normal font-body text-md">
              {event.title}
          </p>
          <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Description</span>
          <p className=" text-neutrals-400 font-normal font-body text-md">
              {event.description}
          </p>
          <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Date</span>
          <p className="text-neutrals-400 font-normal font-body text-md">
              {event.date}
          </p>
          <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Remaining tickets</span>
          <p className=" text-neutrals-400 font-normal font-body text-md">
              {event.remainingAmount}/{event.amount} left
          </p>
          <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Price</span>
          <p className="font-body font-normal text-md text-primary-green">
            {event.price} ETH
          </p>
        </div>


        <div className="flex flex-col gap-y-2">
          <Button full primary onClick={buy} disabled={event.remainingAmount === "0"}>Buy</Button>
          <Button full outlined onClick={onClose} >
            Cancel
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default BuyPopup;
