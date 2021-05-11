import React, {useContext} from "react";
import Button from "../Button";
import Popup from "./Popup";
import {AccountContext} from "../../AccountContext";

import Web3 from "web3";

import { ContractContext } from "../../context/ContractContext";
const BuyTicketPopup = ({ onClose, ticket, setAlert }) => {
  const [account] = useContext(AccountContext);
  const [contract] = useContext(ContractContext)
  const buy = () =>{
    onClose()
    const buyTicket = async ()=> {
        if(!contract)return;
        await contract.methods.buyTicketFromMarket(ticket.id).send({from: account, value: Web3.utils.toWei(ticket.price)}).on('receipt', function(receipt){
          setAlert({message: "You purchased a ticket!", error: false})
        }).catch((err)=>{
          setAlert({message: "Purchase failed!", error: false})
        });
    }
    buyTicket();
  }
  return (
    <Popup title="Checkout" onClose={onClose}>
      <div className="space-y-5">
          <div className="space-y">
            <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Title</span>
            <p className=" text-neutrals-400 font-normal font-body text-md">
                {ticket.title}
            </p>
            <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Description</span>
            <p className=" text-neutrals-400 font-normal font-body text-md">
                {ticket.description}
            </p>
            <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Date</span>
            <p className="text-neutrals-400 font-normal font-body text-md">
                {ticket.date}
            </p>
            <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Ticket No.</span>
            <p className=" text-neutrals-400 font-normal font-body text-md">
                #{ticket.number}
            </p>
            <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Price</span>
            <p className="font-body font-normal text-md text-primary-green">
              {ticket.price} ETH
            </p>
          </div>


        <div className="flex flex-col gap-y-2">
          <Button full primary onClick={buy}>Buy</Button>
          <Button full outlined onClick={onClose} >
            Cancel
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default BuyTicketPopup;
