import React,{useContext,useState} from 'react'
import axios from 'axios'
import dayjs from 'dayjs';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import '../Home.css';
import { BarChart,LineChart} from '@mui/x-charts';
import {Box,Typography, Container} from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { context } from '../ContextAPI';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate=useNavigate();
  const [data,setData]=useState([]);
  const {cost,NoItems,income,item,earn,sales,request,toggleChange}=useContext(context);
  const logReder=()=>{
        axios.get("http://localhost:3000/item")
        .then((response)=>{
          setData(response.data);
        }
      )
  }
  const lineChartsParams = {
    series: [
      
      {
        data: cost,
        label: 'cost',
        highlightScope: {
          highlight: 'item',
        },
        color:"#ed0c6e",
        valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
       
      },{
        data: income,
        label: 'Revenue',
        highlightScope: {
          highlight: 'item',
        },
        color:"#e5e0dd",
        valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
      },], 
      xAxis: [{ data: item, scaleType:'point'}],
  }
  logReder();
    return (
      <div >
      <Box className='Dashboard' sx={{display:'flex',justifyContent:"flex-start",height:'20vh',width:'100%'}}>
            <AutoGraphIcon sx={{ml:10,mt:5,fontSize: 40 }}/>
            <Typography  sx={{mt:5}}variant="h4">DASHBOARD</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker  sx={{ml:"55%",mt:4,'& .MuiOutlinedInput-root': {backgroundColor: 'white'}}} defaultValue={dayjs('2024-12-06')} />
            </LocalizationProvider>
        </Box>
        <Box className="card"sx={{display:'flex',justifyContent:"space-around",width:'100%'}}>
            <Box className='MIncom'sx={{height:150,width:350,alignItems:'center',borderRadius:1}}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Earning</p>
                  <Container sx={{display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
                  <h3>&nbsp;₹&nbsp;{earn}</h3>
                  <CalendarTodayIcon sx={{ml:25}}/>
                  </Container>
                  <Divider/>
                  <Container className='inM' sx={{height:70,display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                  <ListItemButton onClick={()=> navigate('/report') } sx={{display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                    <p>VIEW REPORT</p>
                      <KeyboardArrowRightIcon sx={{marginLeft:19}}/>
                    </ListItemButton>
                  </Container>

            </Box>
            <Box className='CTask'sx={{height:150,width:350,alignItems:'center',borderRadius:1}}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inventory Items</p>
                  <Container sx={{display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
                  <h3>&nbsp;{NoItems}</h3>
                  <CheckCircleIcon sx={{ml:30}}/>
                  </Container>
                  <Divider/>
                  <Container className="inC" sx={{height:70,display:'flex',justifyContent:"space-evenly",alignItems:'center'}}>
                  <ListItemButton onClick={()=> navigate('/inventory')} sx={{display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                      <p>VIEW INVENTORY</p>
                      <KeyboardArrowRightIcon sx={{marginLeft:19}}/>
                  </ListItemButton>
                  </Container>
                  
            </Box>
            <Box className='PTask'sx={{height:150,width:350,alignItems:'center',borderRadius:1}}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pending Task</p>
                  <Container sx={{display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
                  <h3>&nbsp;{request}</h3>
                  <ChatBubbleIcon sx={{ml:30}}/>
                  </Container>
                  <Divider/>
                  <Container className="inP"sx={{height:70,display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                  <ListItemButton onClick={()=>  navigate('/sales')} sx={{display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                    <p>VIEW REQUEST</p>
                      <KeyboardArrowRightIcon sx={{marginLeft:19}}/>
                    </ListItemButton>
                  </Container>
            </Box>
        </Box>
        <Box mt='33px' sx={{height:"50vh",display:'flex',justifyContent:'space-around',alignItems:'center'}}>
        <div className='dash' style={{borderRadius:10}} >
         <Container sx={{backgroundColor:'rgb(0, 0, 0,0.3)',borderRadius:3, display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
          <Typography variant='h5' sx={{color:"white",fontWeight:"bold"}} fontFamily={'monospace'}>Revenue vs Cost</Typography>
             <LineChart  sx={(theme) => ({[`.${axisClasses.root}`]:{[`.${axisClasses.tick}, .${axisClasses.line}`]: {stroke: '#FFFFFF',strokeWidth: 3},[`.${axisClasses.tickLabel}`]: {fill: '#FFFFFF',},}})}  {...lineChartsParams}  width={500} height={300}/>
          </Container>
        </div>
        <div className='dash' style={{borderRadius:10}}>
        <Container sx={{backgroundColor:'rgb(0, 0, 0,0.3)',borderRadius:3,display:'flex',flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}>
            <Typography variant='h5' sx={{color:"white",fontWeight:"bold"}} fontFamily={'monospace'}>SALES</Typography>
            <BarChart  sx={(theme) => ({[`.${axisClasses.root}`]:{[`.${axisClasses.tick}, .${axisClasses.line}`]: {stroke: '#FFFFFF',strokeWidth: 3},[`.${axisClasses.tickLabel}`]: {fill: '#FFFFFF',},}})}   xAxis={[{ scaleType: 'band', data: item }]}
            series={[{ data: sales,color: '#4fc3f7'}]} width={500}height={300}>
            </BarChart>
        </Container>
        </div>
      </Box>
      
    </div>
      
    )
  }
export default Dashboard