import React, { useContext, useEffect, useState } from "react";
import Input from "./Input";
import Web3 from "web3";
import Ticket from "./Ticket";
import { AccountContext } from "../AccountContext";
import { ContractContext } from "../context/ContractContext";
const EventsProfile = () => {
  const [defaultTickets, setDefaultTickets] = useState([])
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [account] = useContext(AccountContext)
  const [contract] = useContext(ContractContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    const getEvents = async()=> {
        if(!contract)return;
        const res = await contract.methods.getMyTickets(account).call();
        const events = await contract.methods.getEvents().call();
        if(!events) return;
        var allTickets = [];
        res.forEach((ticket, index)=>{
          const evt = events[ticket.evtId];
          allTickets.push({title : evt.title, forSale: ticket.forSale, description: evt.description, date: evt.date, price: Web3.utils.fromWei(ticket.price), id: index, owner: ticket.owner, number: ticket.number, amount: evt.amount })
        })
        setDefaultTickets(allTickets);
        setTickets(allTickets);
        console.log(allTickets)
    }
    getEvents();
  },[refresh, account, contract])

  const updateSearch = (e) =>{
    const value = e.target.value;
    if(value === "") return setTickets(defaultTickets);

    const filteredEvents = defaultTickets?.filter((event)=>{
      return event.title.toLowerCase().includes(value.toLowerCase()) || event.description.toLowerCase().includes(value.toLowerCase());
    })
    setSearch(value);
    setTickets(filteredEvents);
  }

  return (
    <div>
      <div className="mb-10 flex justify-center sm:block">
        <Input search value={search} onChange={updateSearch}  placeholder="Search"></Input>
      </div>
      <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 content-center">
        {tickets?.length > 0 ? tickets.map((ticket, index) => {
          return <Ticket isOwner={account === ticket.owner.toLowerCase()} ticket={ticket} key={index} refresh={()=>setRefresh((refresh)=>!refresh)}></Ticket>;
        }):
        <h2 className="text-neutrals-400 font-normal font-body text-lg">No tickets found!</h2>}
      </div>        
    </div>
  );
};

export default EventsProfile;
