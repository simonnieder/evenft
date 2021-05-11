import { createContext, useState } from "react";

export const RefreshContext = createContext();
export const RefreshProvider = (props) => {
  const [refresh, setRefresh] = useState(false);
  
  return (
    <RefreshContext.Provider value={[refresh, setRefresh]}>
      {props.children}
    </RefreshContext.Provider>
  );
};
