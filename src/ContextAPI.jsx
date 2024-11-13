import React, { useEffect, useState } from 'react'
import { createContext} from 'react'
import axios from 'axios'
export const context=createContext()
function ContextAPI({children}) {
  const [dash, setDash]=React.useState(true);
  const [invn, setInvn]=React.useState(false);
  const [sale, setSale]=React.useState(false);
  const [purc, setPurc]=React.useState(false);
  const [report, setReport]=React.useState(false);
  const toggleChange = (id) => () => {
    {id===1?setDash(true):setDash(false)}
    {id===2?setInvn(true):setInvn(false)}
    {id===3?setSale(true):setSale(false)}
    {id===4?setPurc(true):setPurc(false)}
    {id===5?setReport(true):setReport(false)}
  };
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
    <context.Provider value={{cost,chartData,NoItems,item,earn,TotalItems,income,sales,request,dash,invn,purc,sale,report,toggleChange}}>
      {children}
    </context.Provider>
  )
}

export default ContextAPI