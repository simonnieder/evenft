import Button from "../Button";
import Input from "../Input";
import Popup from "./Popup";
import { AccountContext } from "../../AccountContext";
import React, { useState, useContext } from "react";
import Web3 from "web3";
import { AlertContext } from "../../AlertContext";
import { ContractContext } from "../../context/ContractContext";
const CreateEventPopup = ({ onClose, setRefresh}) => {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    title: "",
    description: "",
    amount: "",
    price: "",
    date: today,
  });
  const [account] = useContext(AccountContext);
  const [state,dispatch] = useContext(AlertContext);
  const [contract] = useContext(ContractContext)

  const parseDate = (date)=>{
    const units = date.split("-");
    if(units?.length !== 3) return;
    const year = units[0];
    const month = units[1];
    const day = units[2];
    return `${day}.${month}.${year}`;
  }

  const submitForm = (e) => {
    e.preventDefault();
    onClose();
    const createEvent = async()=> {
        if(!contract)return;
        await contract.methods.createEvent(form.title, form.description, parseDate(form.date), parseInt(form.amount), Web3.utils.toWei(form.price)).send({from: account}).on('receipt', function(receipt){
          dispatch({type: "ADD_ALERT", payload: {message: "Event has been created!", error: false}})
          setRefresh();
        }).catch((err)=>{
          dispatch({type: "ADD_ALERT", payload: {message: "Event not created!", error: true}})
        })
    }
    createEvent();
  };
  return (
      <Popup onClose={onClose} title="Create an event">
        <form onSubmit={submitForm}>  
          <div className="mb-3">
            <Input
              title="Event title"
              placeholder="Give your Event a title"
              full
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            ></Input>
            <Input
              title="Event description"
              placeholder="Give your Event a description"
              rows={3}
              full
              value={form.description}
              requiredf
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            ></Input>
            <Input
              title="Event date"
              full
              type="date"
              required
              min={today}
              defaultValue={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            ></Input>
            <Input
              title="Ticket Amount"
              placeholder="Ticket Amount"
              full
              type="number"
              value={form.amount}
              min={1}
              max={1000000}
              required
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            ></Input>
              <Input
              title="Ticket Price in ETH"
              placeholder="Ticket Price"
              full
              type="number"
              min={0}
              max={1000}
              required
              step={0.000005}
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            ></Input>
          </div>
          <div className="flex flex-col gap-y-2">
            <Button full submit primary >
              Create Event
            </Button>
            <Button full outlined onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Popup>
  );
};

export default CreateEventPopup;
