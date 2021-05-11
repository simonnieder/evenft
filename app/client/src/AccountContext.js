import React, { createContext, useEffect, useState } from "react";
export const AccountContext = createContext();

export const AccountProvider = (props) => {
  const [account, setAccount] = useState();

  useEffect(() => {
    if(!window.ethereum) return;

    window.ethereum.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
      console.log("changed")
    });

    window.ethereum.on("disconnect", (accounts) => {
      setAccount(undefined);
    });
    
    window.ethereum.on("connect", (accounts) => {
      setAccount(accounts[0]);
    });
  }, []);
  return (
    <AccountContext.Provider value={[account, setAccount]}>
      {props.children}
    </AccountContext.Provider>
  );
};
