import React, { useEffect, useState } from 'react'
import { createContext} from 'react'
import axios from 'axios'
export const context=createContext()
function ContextAPI({children}) {
  const [data,setData]=useState([]);
  const [NoItems,setNoItems]=useState(0);
  const [req,setReq]=useState([]);
  const [request,setRequest]=useState(0);
  const [income, setIncome] = useState([]);
  const [cost, setCost] = useState([]);
  const [item, setItem] = useState([]);
  const [earn,setEarn]=useState(0);
  const [sales, setSales] = useState([]);
  const [TotalItems,setTItem]=useState(0);
  useEffect(() => {
    fetchData();
    fetchRequests();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/item");
      const newData = response.data;
      setData(newData);

      setNoItems(newData.length);
      setSales(newData.map((item) => item.sale));
      setCost(newData.map((item) => item.sale * item.mprice));
      setIncome(newData.map((item) => item.sale * item.price));

      const totalEarn = newData.reduce((total, item) => total + item.sale * item.price, 0);
      const totalItems = newData.reduce((total, item) => total + item.sale, 0);

      setEarn(totalEarn);
      setTItem(totalItems);
      setItem(newData.map((item) => item.item));
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };
  const fetchRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3000/request");
      setReq(response.data);
      setRequest(response.data.length);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  const updateData = async () => {
    await fetchData(); 
    await fetchRequests();
  };
  const chartData = data.map((value, index) => ({
    value: value.sale,
    label:value.item
  }))
  return (
    <context.Provider value={{cost,chartData,NoItems,item,earn,TotalItems,income,sales,request,updateData}}>
      {children}
    </context.Provider>
  )
}

export default ContextAPI