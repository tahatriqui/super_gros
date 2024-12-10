import  { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import {api} from './assets/domain'
// Create the context
const AppContext = createContext();

// Create the provider
export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sscategories, setSSCategories] = useState([]);
   const [categories, setCategories] = useState([]);
 const [ssscategories, setSSsCategories] = useState([]);
  const [solutionId,SetSolutionId] = useState(0)
   const [filteredCategory, setFilterdCategory] = useState([]);
  const [vh,setVh] = useState(14)
  const getProduct = async ()  =>{
    const res =  await axios.get(`${api}/produit`)
    setData(res.data);
  }
  useEffect(()=>{getProduct()},[])
  return (
    <AppContext.Provider value={{vh,setVh,filteredCategory, setFilterdCategory, solutionId,SetSolutionId,data, setData,filteredProducts,setFilteredProducts,sscategories, setSSCategories,categories, setCategories,ssscategories, setSSsCategories }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook for easy access
export const useAppContext = () => useContext(AppContext);
