import React, { createContext, useReducer } from "react";
export const AlertContext = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD_ALERT":
            return {alerts: [...state.alerts, {...action.payload, id: state.count}], count: state.count+1};
        case "REMOVE_ALERT":
          return {...state, alerts: state.alerts.filter((alert)=> alert.id !== action.payload )}
        default: return state;
    }
}

export const AlertProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {alerts : [], count: 0});

  return (
    <AlertContext.Provider value={[state, dispatch]}>
      {props.children}
    </AlertContext.Provider>
  );
};
