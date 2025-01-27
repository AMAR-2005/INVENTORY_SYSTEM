import React, { useEffect, useState } from 'react'
import { createContext} from 'react'
import axios from 'axios'
export const context=createContext()
function ContextAPI({children}) {
  const [data,setData]=useState([]);
  const [NoItems,setNoitems]=useState(0);
  const [req,setReq]=useState([]);
  const [request,setRequest]=useState(0);
  const [income, setIncome] = useState([]);
  const [cost, setCost] = useState([]);
  const [item, setItem] = useState([]);
  const [earn,setEarn]=useState(0);
  const [sales, setSales] = useState([]);
  const [TotalItems,setTItem]=useState(0);
  useEffect(()=>{
    axios.get("http://localhost:3000/item")
    .then((response)=>{
      setData(response.data);
      setNoitems(data.length);
      const saleValues = data.map((item) => item.sale);
      setSales(saleValues);
      const Cost = data.map((item) => item.sale*item.mPrice);
      setCost(Cost)
      const income = data.map((item) => item.sale*item.price);
      setIncome(income)
      const amt=data.reduce((total,item)=>{return total+item.sale*item.price},0);
      const TotItem=data.reduce((total,item)=>{return total+item.sale},0);
      setEarn(amt);
      setTItem(TotItem)
      const itemValues = data.map((item) => item.item);
      setItem(itemValues);
    })
    axios.get("http://localhost:3000/request")
    .then((response) =>{
      setReq(response.data)
      setRequest(req.length)

    })
  })
  const chartData = data.map((value, index) => ({
    value: value.sale,
    label:value.item
  }))
  return (
    <context.Provider value={{cost,chartData,NoItems,item,earn,TotalItems,income,sales,request}}>
      {children}
    </context.Provider>
  )
}

export default ContextAPI