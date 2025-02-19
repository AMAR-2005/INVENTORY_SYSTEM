import React,{useContext, useEffect, useState} from 'react'
import axios from 'axios';
import {context} from '../ContextAPI';
import Grid from '@mui/material/Grid2';
import { axisClasses,BarChart } from '@mui/x-charts';
import { Box, Button, Container, InputBase, Paper, Typography,ButtonBase } from '@mui/material'
import { green, teal ,pink} from '@mui/material/colors'
function Sale() {
    const [data,setData]=useState([]);
    const [sales, setSales] = useState([]);
    const [input,setInput]=useState({"item":"","qty":0});
    const { updateData, earn, TotalItems, item, income } = useContext(context); 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3000/request');
            setSales(response.data);
            const response2 = await axios.get('http://localhost:3000/item');
            setData(response2.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [context]);
    const handelChange=(e)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value});
    }
    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/request", input);
            setSales((prevData) => [...prevData, response.data]); 
            setInput({ item: "", qty: 0 });
            updateData() 
        } catch (error) {
            console.error("Error adding request:", error);
        }
    };
    const handelDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/request/${id}`);
            setSales(sales.filter((d) => d.id !== id));
            updateData();
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };
    const handelFullfill = async (id) => {
        try {
            const edit2 = sales.find((d) => d.id === id);
            if (!edit2) {
                console.error("Request item not found.");
                return;
            }
    
            const edit1 = data.find((d) => d.item.toLowerCase() === edit2.item.toLowerCase());
            if (!edit1) {
                console.error("Item not found in inventory.");
                return;
            }
    
            const n1 = parseInt(edit1.qty, 10);
            const n2 = parseInt(edit2.qty, 10);
            if (n1 >= n2) {
                const updatedItem = {
                    ...edit1,
                    qty: n1 - n2,
                    sale: (parseInt(edit1.sale, 10) || 0) + n2,
                };
                await axios.put(`http://localhost:3000/item/${edit1.id}`, updatedItem);
                handelDelete(id);
                updateData();
            } else {
                console.error("Not enough stock to fulfill the request.");
            }
        } catch (error) {
            console.error("Error fulfilling request:", error);
        }
    };
  return (
    <div style={{display:"flex",flexDirection:"column",marginTop:65,minHeight:"92.5vh"}}>
        <Paper sx={{display:"flex",alignItems:"center",zIndex:1000,marginLeft:1.7,width:"98%",backgroundColor:teal[500],position:"fixed",height:70}}>
            <p className="title" style={{color:"white",marginLeft:7}}>Sales</p>
        </Paper>
        <Paper sx={{display:"flex",justifyContent:"center",flexDirection:"column",marginTop:11,width:"98%",borderRadius:4,marginLeft:1.7,backgroundColor:teal[50],minHeight:"80vh"}}>
            <Box sx={{display:"flex",justifyContent:"space-around"}}>
                <Paper sx={{p:1,borderRadius:3,display:"flex",flexDirection:"column",justifyContent:"center ",alignItems:"center",backgroundColor:pink[400],minHeight:"70vh",width:"40%"}}>
                    <Paper sx={{backgroundColor:'rgb(0, 0, 0,0.3)',borderRadius:3,p:2,width:500}}><Typography variant='h5' color='white' >TOTAL AMOUNT : ₹ {earn}</Typography></Paper>
                    <br/>
                    <Paper sx={{backgroundColor:'rgb(0, 0, 0,0.3)',borderRadius:3,p:2,width:500}}><Typography variant='h5' color='white' >TOTAL ITEMS SOLD : {TotalItems}</Typography></Paper>
                    <br/>
                    <Container sx={{backgroundColor:'rgb(0, 0, 0,0.3)',borderRadius:3,display:'flex',justifyContent:'center',alignItems:'center',width:530}}>
                        <BarChart layout="horizontal" borderRadius={15} sx={(theme) => ({[`.${axisClasses.root}`]:{[`.${axisClasses.tick}, .${axisClasses.line}`]: {stroke: '#FFFFFF',strokeWidth: 3},[`.${axisClasses.tickLabel}`]: {fill: '#FFFFFF',},}})}   yAxis={[{ scaleType: 'band', data: item }]}
                        series={[{ data: income,color: '#c2e358'}]} width={500}height={300}>
                        </BarChart>
                    </Container>
                </Paper>
                <Paper sx={{display:"flex",borderRadius:3,flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:teal[300],minHeight:"70vh",width:"55%"}}>
                    <Paper  sx={{backgroundColor:'rgb(0, 0, 0,0.3)',p:1,zIndex:1000,justifyContent:"center", display:'flex', alignItems: 'center', width:"95%",}}>
                        <Typography variant='h5' color='white' >REQUEST</Typography>
                        <Paper component="form" sx={{ marginLeft:5,display:'flex', alignItems: 'center', width:200 }}>
                            <InputBase name='item' value={input.item} onChange={handelChange} sx={{ ml: 1, flex: 1 }} placeholder="Item Name" />
                         </Paper>
                        <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
                            <InputBase name='qty' value={input.qty} onChange={handelChange}  sx={{ ml: 1, flex: 1 }} placeholder="Quantity" inputProps={{ 'aria-label': 'search google maps' }}/>
                        </Paper>
                        <Button sx={{ marginLeft:5,backgroundColor: green[500],}} variant='contained' className ="button" type='submit' onClick={handelSubmit} >ADD</Button>
                    </Paper>
                    <br/>
                    <Paper sx={{backgroundColor:'rgb(0, 0, 0,0.3)',overflow:"scroll",zIndex:0,p:1,height:"55vh",width:"95%"}}>
                    <div style={{marginLeft:5}}>      
                        {sales.map((datas,index)=>{
                            const {id,qty,item}=datas;
                            return(
                                <div >
                                <br></br>
                                <Paper className="API" key={id} sx={{ backgroundColor:'rgba(255, 255, 255,0.2)',borderRadius:2,marginLeft:0,height:40,display:"flex",padding:1,width:"97%"}} >
                                    <Box sx={{ flexGrow:1,marginLeft:5}} >
                                    <Grid container  spacing={18}>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{index+1}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{item}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>  {qty}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <ButtonBase >
                                            <Button sx={{backgroundColor:pink[700]}}variant='contained' onClick={()=>handelDelete(id)}>Delete</Button>
                                            <Button sx={{marginLeft:1}} variant='contained' onClick={()=>handelFullfill(id)}>Grant</Button>
                                        </ButtonBase>
                                        </Grid>
                                    </Grid>
                                    </Box>
                                </Paper>
                                <br></br>
                            </div>
                            )
                        })}
                    </div>
                    </Paper>
                </Paper>
            </Box>
        </Paper>
    </div>
  )
}

export default Sale