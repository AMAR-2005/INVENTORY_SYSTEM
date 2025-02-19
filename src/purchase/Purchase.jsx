import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Box, Button, Paper, Typography, } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { blue, pink, teal } from '@mui/material/colors';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { context } from '../ContextAPI';
import "../inventorypage/AddItem";
import "./Purchase.css";
function Purchase() {
  const [error,setError]=useState("");
  const [data,setData]=useState([]);
  const { updateData } = useContext(context);
  const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/item');
        setData(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    fetchData();
}, []);
const handelSubmit = async (id) => {
    try {
        const edit = data.find((d) => d.id === id);
        if (edit) {
            edit.qty -= edit.temp;
            edit.sale += edit.temp;
            edit.temp = 0;
            await axios.put(`http://localhost:3000/item/${id}`, edit);
            updateData();
        }
    } catch (error) {
        setError(error.message);
    }
};

const handelAdd = async (id) => {
    const edit = data.find((d) => d.id === id);
    if (edit && Number(edit.qty) > edit.temp) {
        edit.temp += 1;
        await axios.put(`http://localhost:3000/item/${id}`, edit);
        updateData(); 
    }
};

const handelSub = async (id) => {
    const edit = data.find((d) => d.id === id);
    if (edit && edit.temp > 0) {
        edit.temp -= 1;
        await axios.put(`http://localhost:3000/item/${id}`, edit);
        updateData(); 
    }
};
        return(
            <div className='Purch' style={{display:"flex",flexDirection:"column",marginTop:65,minHeight:"92.5vh"}}>
            <Paper sx={{backgroundImage:"linear-gradient(15deg, #13547a 0%, #80d0c7 100%)",display:"flex",alignItems:"center",zIndex:1000,marginLeft:1.7,width:"98%",position:"fixed",height:70}}>
                <p className="title"style={{color:"white",marginLeft:7}}>Purchases</p>
            </Paper>
            <Paper sx={{marginTop:13,marginLeft:7,p:2,width:"90%", backgroundColor:'rgba(255, 255, 255,0.3)',borderRadius:2,minHeight:"70vh"}}>
                <Box sx={{ flexGrow:1}}>
                <Grid container  spacing={2} sx={{marginLeft:3,marginRight:3,marginTop:1}} >
                {data.map((datas,index)=>{
                    const {id,qty,item,price,temp}=datas;
                    return(
                        <Grid item key={id} size={{ xs: 4}} sx={{p:2, backgroundColor:'rgba(0, 0, 0,0.3)',borderRadius:2}}>
                            <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>ItemName : {item}</Typography>
                            <Typography variant="h6"sx={{display:"flex",fontWeight:"bold",color:"white"}}>{qty===0?<Paper sx={{borderRadius:1,backgroundColor:teal[200],color:pink[500], display:"flex",justifyContent:"center",width:"150px" }} > SOLD OUT </Paper>:<>QTY :  <Button variant="contained" sx={{marginLeft:1, backgroundColor: blue[500] }}onClick={()=>handelSub(id)}><RemoveCircleIcon sx={{ color:'white' }}/></Button><Box variant="outlined"sx={{marginLeft:1,borderRadius:1, display:"flex",justifyContent:"center",border:1,width:"70px" }} > {temp} </Box><Button variant="contained" sx={{marginLeft:1, backgroundColor: teal[500] }} onClick={()=>handelAdd(id)} ><AddCircleIcon sx={{ color: 'white' }}/></Button></>}</Typography>
                            <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>Price : ₹{price*temp}</Typography>
                            <Button variant='contained'  sx={{backgroundColor:pink[400]}} onClick={()=>handelSubmit(id)}>SELL</Button>
                        </Grid>
                )
                     })}
                </Grid>
            </Box>
        </Paper>
        </div>
    
        )
    }

export default Purchase