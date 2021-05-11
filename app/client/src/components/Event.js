import React, { useContext, useState } from "react";
import { AlertContext } from "../AlertContext";
import Button from "./Button";
import BuyPopup from "./Popups/BuyPopup";  
const Event = ({ event, key, refresh }) => {
  const [buyOpen, setBuyOpen] = useState(false);
  const [state,dispatch] = useContext(AlertContext);
  
  return (
    <div className=" max-w-sm flex flex-col justify-between justify-self-center sm:justify-self-start w-full border border-neutrals-600 px-3 py-6 rounded-2xl">
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-neutrals-100 font-header text-2xl line-clamp-1 break-all">
            {event.title}
          </h2>
          <span className="min-w-max text-primary-green rounded-md text-lg font-regular font-body  bg-neutrals-800 bg-opacity-80">
              {event.price} ETH
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={`text-neutrals-300 font-header font-normal text-lg`}>
              {event.date}
          </span>
          <span className={`${event.remainingAmount > 0 ? "text-neutrals-300" : "text-primary-red"} font-header font-normal text-lg`}>
              {event.remainingAmount}/{event.amount} left
          </span>
        </div>  
      </div>    
      <div className="pt-2 flex-1 border-t border-neutrals-500 border-opacity-60">
        <span className="text-xs text-neutrals-400 font-header">Description</span>
        <p className="mb-2 text-neutrals-300 font-normal font-body text-md line-clamp-2">
            {event.description}
        </p>
      </div>
      <div>
        <Button full outlined onClick={() => setBuyOpen(true)}>
          Details
        </Button>
      </div>
      {buyOpen && (
        <BuyPopup onClose={() => setBuyOpen(false)} event={event} setAlert={(payload)=>{
          dispatch({type: "ADD_ALERT", payload: payload});
          refresh();
        }}></BuyPopup>
      )}
    </div>
  );
};

export default Event;
