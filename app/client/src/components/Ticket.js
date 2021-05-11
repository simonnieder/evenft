import { useContext, useState } from "react";
import { AlertContext } from "../AlertContext";
import Button from "./Button";
import BuyTicketPopup from "./Popups/BuyTicketPopup";
import SellPopup from "./Popups/SellPopup";
import EditPopup from "./Popups/EditPopup";

const Ticket = ({ ticket, isOwner, refresh }) => {
    const [open, setOpen] = useState(false);
    const [sellOpen, setSellOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [state,dispatch] = useContext(AlertContext);
    return (
      <div className=" max-w-sm flex flex-col justify-between justify-self-center sm:justify-self-start w-full border border-neutrals-600 px-3 py-6 rounded-2xl">
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-neutrals-100 font-header text-2xl line-clamp-1 break-all">
            {ticket.title}
          </h2>
          <span className="min-w-max text-primary-green rounded-md text-lg font-regular font-body  bg-neutrals-800 bg-opacity-80">
              {ticket.price} ETH
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-neutrals-300 font-header font-normal text-lg`}>
              {ticket.date}
          </span>
          <span className={`text-neutrals-300 font-header font-normal text-lg`}>
              #{ticket.number}
          </span>
        </div>  
      </div>    
      <div className="pt-2 flex-1 border-t border-neutrals-500 border-opacity-60">
        <span className="text-xs text-neutrals-300 font-body font-bold uppercase">Description</span>
        <p className="mb-2 text-neutrals-400 font-normal text-md font-body text-md line-clamp-2">
            {ticket.description}
        </p>
      </div>        
      {isOwner ? (ticket.forSale ? 
          <Button full outlined onClick={() => setEditOpen(true)}>
              Edit
          </Button>:
          <Button full outlined onClick={() => setSellOpen(true)}>
            Sell
          </Button>
          ) 
          :
          <Button full outlined onClick={() => setOpen(true)}>
            Details
          </Button>
        }
        {sellOpen && (
          <SellPopup onClose={() => setSellOpen(false)} ticket={ticket} setAlert={(payload)=> {
            dispatch({type: "ADD_ALERT", payload: payload});
            refresh();
        }}></SellPopup>
        )}
 
        {open && (
          <BuyTicketPopup onClose={() => setOpen(false)} ticket={ticket} setAlert={(payload)=> {
            dispatch({type: "ADD_ALERT", payload: payload});
            refresh();
          }}></BuyTicketPopup>
        )}
        {editOpen && (
          <EditPopup ticket={ticket} onClose={() => setEditOpen(false)} openSellPopup={()=>setSellOpen(true)} setAlert={(payload)=> {
            dispatch({type: "ADD_ALERT", payload: payload})
            refresh();
          }}
            ></EditPopup>
        )}
      </div>
    );
  };
  
  export default Ticket;
  