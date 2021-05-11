import React, { useContext, useEffect, useState } from "react";
import Event from "./Event";
import Input from "./Input";
import Web3 from "web3"
import { ContractContext } from "../context/ContractContext";
import { RefreshContext } from "../context/RefreshContext";
const Events = () => {
  const [defaultEvents, setDefaultEvents] = useState()
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState();
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [contract] = useContext(ContractContext);

  useEffect(()=>{
    const getEvents = async ()=> {
        if(!contract)return;
        const res = await contract.methods.getEvents().call();
        const events = [];
        res?.forEach((event, index)=>{
          events.push({title : event.title, amount: event.amount, remainingAmount: event.remainingAmount, description: event.description, date: event.date, price: Web3.utils.fromWei(event.price), creator: event.creator, id: index })
        })
        setDefaultEvents(events)
        setEvents(events);
    }
    getEvents();
  },[refresh, contract])

  const updateSearch = (e) =>{
    const value = e.target.value;
    if(value === "") return setEvents(defaultEvents);

    const filteredEvents = defaultEvents?.filter((event)=>{
      return event.title.toLowerCase().includes(value.toLowerCase()) || event.description.toLowerCase().includes(value.toLowerCase());
    })
    setSearch(value);
    setEvents(filteredEvents);
  }

  return (
    <div>
      <div className="mb-10 flex justify-center sm:block">
        <Input value={search} onChange={updateSearch}  placeholder="Search" search></Input>
      </div>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 content-center">
        {events && events.sort((a, b) => a.title.localeCompare(b.title)).map((event, index) => {
          return <Event refresh={()=>setRefresh(!refresh)} event={event} key={index}></Event>;
        })}
      </div>
      {events?.length === 0 && <h2 className="text-neutrals-400 font-normal font-body text-lg">No events found!</h2>}
    </div>
  );
};

export default Events;
