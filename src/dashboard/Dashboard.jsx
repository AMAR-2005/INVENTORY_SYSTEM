import React,{useContext,useEffect,useState} from 'react'
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
  const {cost,NoItems,income,item,earn,sales,request}=useContext(context);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/item');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [context]);
    return (
      <div>
        <Box className="Dashboard" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between', padding: '40px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AutoGraphIcon sx={{ fontSize: 40, marginRight: 2 }} />
            <Typography variant="h4">DASHBOARD</Typography>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              sx={{
                mt: { xs: 2, md: 0 },
                '& .MuiOutlinedInput-root': { backgroundColor: 'white' },
              }}
              defaultValue={dayjs('2024-12-06')}
            />
          </LocalizationProvider>
        </Box>
  
        <Box className="card" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, padding: '10px' }}>
  
        <Box className='MIncom' sx={{ height: 150, width: 350, alignItems: 'center', borderRadius: 1 }}>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Earning</p>
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: "flex-start" }}>
                <h2>{earn}</h2>
                <CalendarTodayIcon sx={{ ml: 25 }} />
            </Container>
            <Divider/>
            <Container className='inM' sx={{marginBottom:100 , height: "60px", display: 'flex', justifyContent: "space-evenly", alignItems: 'center', borderRadius: 1 }}>
                <ListItemButton onClick={() => navigate('/report')} sx={{ display: 'flex', justifyContent: "flex-start", alignItems: 'center' }}>
                    <p>VIEW REPORT</p>
                    <KeyboardArrowRightIcon sx={{ marginLeft: 19 }} />
                </ListItemButton>
            </Container>
        </Box>
            <Box className='CTask'sx={{height:150,width:350,alignItems:'center',borderRadius:1}}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Inventory Items</p>
                  <Container sx={{display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
                  <h2>&nbsp;{NoItems}</h2>
                  <CheckCircleIcon sx={{ml:30}}/>
                  </Container>
                  <Divider/>
                  <Container className="inC" sx={{height:"60px",display:'flex',justifyContent:"space-evenly",alignItems:'center',borderRadius:1}}>
                  <ListItemButton onClick={()=> navigate('/inventory')} sx={{display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                      <p>VIEW INVENTORY</p>
                      <KeyboardArrowRightIcon sx={{marginLeft:19}}/>
                  </ListItemButton>
                  </Container>
                  
            </Box>
            <Box className='PTask'sx={{height:150,width:350,alignItems:'center',borderRadius:1}}>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pending Task</p>
                  <Container sx={{display:'flex',alignItems:'center',justifyContent:"flex-start"}}>
                    <h2>&nbsp;{request}</h2>
                    <ChatBubbleIcon sx={{ml:30}}/>
                    </Container>
                  <Divider/>
                  <Container className="inP"sx={{height:"60px",display:'flex',justifyContent:"flex-start",alignItems:'center',borderRadius:1}}>
                  <ListItemButton onClick={()=>  navigate('/sales')} sx={{display:'flex',justifyContent:"flex-start",alignItems:'center'}}>
                    <p>VIEW REQUEST</p>
                      <KeyboardArrowRightIcon sx={{marginLeft:19}}/>
                    </ListItemButton>
                  </Container>
            </Box>
        </Box>
        <Box mt="33px" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 4, padding: '20px' }}>
          <div className="dash" style={{ borderRadius: 10 }}>
            <Container sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 3, padding: 3, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", fontFamily: "monospace" }}>Revenue vs Cost</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: item }]}
                series={[
                  { data: cost, label: 'Capital', color: "#ed0c6e" },
                  { data: income, label: 'Revenue', color: "#2196F3" },
                ]}
                width={500}
                height={300}
                borderRadius={15}
              />
            </Container>
          </div>

          <div className="dash" style={{ borderRadius: 10 }}>
            <Container sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 3, padding: 3, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: "white", fontWeight: "bold", fontFamily: "monospace" }}>SALES</Typography>
              <BarChart
                xAxis={[{ scaleType: 'band', data: item }]}
                series={[{ data: sales, color: '#2196F3' }]}
                width={500}
                height={300}
                borderRadius={15}
              />
            </Container>
          </div>
        </Box>
      </div>
    );
  }
export default Dashboard