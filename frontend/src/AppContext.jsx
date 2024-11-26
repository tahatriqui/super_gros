import  { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create the provider
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [ssid,setSsid] =useState(0)
  const [sscat,setSsCat] =useState([])
const [istrue,setIstrue] = useState(false)
  return (
    <AppContext.Provider value={{ data, setData,setSsid,ssid,sscat,setSsCat,setIstrue,istrue }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for easy access
export const useAppContext = () => useContext(AppContext);
