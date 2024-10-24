import React,{useContext, useState} from 'react'
import axios from 'axios';
import {context} from '../ContextAPI';
import Grid from '@mui/material/Grid2';
import {  PieChart } from '@mui/x-charts';
import { Box,  Container,  Paper, Typography, } from '@mui/material'
import { teal , blue, indigo} from '@mui/material/colors'
function Report() {
    const [data,setData]=useState([]);
    const {earn,item,TotalItems,income,sales,chartData}=useContext(context);
  
    const logReder=()=>{
        axios.get("http://localhost:3000/item")
        .then((response)=>{
            setData(response.data);
        })
        console.log(chartData)
    }
    logReder();
    data.sort((a, b) => b.sale - a.sale);
  return (
    <div style={{display:"flex",flexDirection:"column",marginTop:65,minHeight:"92.5vh"}}>
        <Paper sx={{display:"flex",alignItems:"center",zIndex:1000,marginLeft:1.7,width:"98%",backgroundColor:blue[500],position:"fixed",height:70}}>
            <p className="title" style={{color:"white",marginLeft:7}}>REPORT</p>
        </Paper>
        <Paper sx={{display:"flex",justifyContent:"center",flexDirection:"column",marginTop:11,width:"98%",borderRadius:4,marginLeft:1.7,backgroundColor:teal[50],minHeight:"80vh"}}>
            <Box sx={{display:"flex",justifyContent:"space-around"}}>
               
                <Paper sx={{display:"flex",borderRadius:3,flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:blue[900],minHeight:"70vh",width:"55%"}}>

                    <Paper sx={{backgroundColor:'rgb(255, 255, 255,0.3)',borderRadius:3,p:2,width:500,justifyContent:"center",display:"flex",color:"white"}}><Typography variant='h5'>TOTAL AMOUNT : ₹ {earn}</Typography></Paper>
                    <br/>
                    <Paper sx={{borderRadius:3,backgroundColor:'rgb(255, 255, 255,0.3)',overflow:"scroll",zIndex:0,p:1,height:"55vh",width:"95%"}}>
                    <div style={{marginLeft:25}}>      
                        {data.map((datas,index)=>{
                            const {id,qty,item,sale,price}=datas;
                            return(
                                <div >
                                <br></br>
                                <Paper className="API" key={id} sx={{ backgroundColor:'rgba(0, 0, 0,0.2)',borderRadius:2,marginLeft:0,height:40,display:"flex",padding:1,width:"97%"}} >
                                    <Box sx={{ flexGrow:1}} >
                                    <Grid container  spacing={18}>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{index+1}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{item}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:teal[50]}}>  {sale}</Typography>
                                        </Grid>
                                        <Grid item key={id} size={{ xs: 2}}>
                                        <Typography variant="h6"sx={{fontWeight:"bold",color:blue[50]}}> ₹{price*sale}</Typography>
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
                <Paper sx={{p:1,borderRadius:3,display:"flex",flexDirection:"column",justifyContent:"center ",alignItems:"center",backgroundColor:indigo[100],minHeight:"70vh",width:"40%"}}>
                    <Paper sx={{backgroundColor:'rgb(255, 255, 255,0.3)',borderRadius:3,p:2,width:500,justifyContent:"center",display:"flex"}}><Typography variant='h5' >TOTAL ITEMS SOLD : {TotalItems}</Typography></Paper>
                    <br/>
                    <Container sx={{backgroundColor:'rgb(255, 255, 255,0.3)',borderRadius:3,color:"white",display:'flex',justifyContent:'center',alignItems:'center',width:530}}>
                    <PieChart
                        series={[
                            {
                            data: chartData,
                            innerRadius: 70,
                            outerRadius: 210,
                            paddingAngle: 2,
                            cornerRadius: 5,
                            startAngle: -143,
                            endAngle: 225,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        }
                        ]}
                        width={550}
                        height={500}
                   />
                    </Container>
                </Paper>
            </Box>
        </Paper>
    </div>
  )
}

export default Report