import React, {useContext, useState} from "react";
import Button from "../Button";
import Popup from "./Popup";
import {AccountContext} from "../../AccountContext";
import Input from "../Input";
import Web3 from "web3"
import { ContractContext } from "../../context/ContractContext";
const BuyPopup = ({ onClose, ticket, setAlert }) => {
  const [account] = useContext(AccountContext);
  const [price, setPrice] = useState(ticket.price);
  const [contract] = useContext(ContractContext)
  const sell = () =>{
    onClose();
    const sellTicket = async ()=> {
        if(!contract)return;
        await contract.methods.startSellingTicket(ticket.id, Web3.utils.toWei(price)).send({from: account}).on('receipt', function(receipt){
          setAlert({error: false, message: "Ticket put up for sale."}) 
        }).catch((err)=>{
          setAlert({error: true, message: "Ticket not put up for sale."}) 
        })
    }
    sellTicket();
  }
  return (
    <Popup title="Sell your ticket" onClose={onClose}>
      <h2 className="font-header text-xl text-neutrals-300 mb-4">
        You are about to put a ticket for {ticket.title} up for sale. Be aware that 10% of the selling price will go to the creator.
      </h2>
      <form onSubmit={sell}>
        <Input
            title="Ticket Price in ETH"
            placeholder="Ticket Price"
            full
            type="number"
            min={0}
            max={1000}
            required
            step={0.000005}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            defaultValue={ticket.price}
        ></Input>
        <div className="flex flex-col gap-y-2">
          <Button full submit primary>Sell</Button>
          <Button full outlined onClick={onClose} >
            Cancel
          </Button>
        </div>
      </form>
    </Popup>
  );
};

export default BuyPopup;
