import  { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {api} from './assets/domain'
// Create the context
const AppContext = createContext();

// Create the provider
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getProduct = async ()  =>{
    const res =  await axios.get(`${api}/produit`)
    setData(res.data);
  }
  useEffect(()=>{getProduct()},[])
  return (
    <AppContext.Provider value={{ data, setData,filteredProducts,setFilteredProducts }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for easy access
export const useAppContext = () => useContext(AppContext);
