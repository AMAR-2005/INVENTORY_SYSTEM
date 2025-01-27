import React,{useState} from 'react';
import logo from './image.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {TextField,Box,Container,Button,Typography} from '@mui/material';
import axios from 'axios';
function Login(){
  const[email,setEmail]=useState('');
  const[password,setPass]=useState('');
  const [error,setError]=useState({email:'',password:''});
  const [user,setUser]=useState([]);
  const [admin,setAdmin]=useState(false);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const log=()=>{
    axios.get("http://localhost:3000/user")
    .then((response)=>{
        setUser(response.data)
      })
  }
  log()
  const handleSubmit=(e)=>{
    const check = user.find((d)=>d.email===email && d.password===password)
    console.log(check)
    let newError={email:'',password:''};
    let valid = true;
    if(!regex.test(email) || check===undefined){
      newError.email="Invalid email address";
      valid=false;
    } 
    if(password.length<8 || check===undefined){
      newError.password="Password must be at least 8 characters long";
      valid=false;
    }
    if(valid){
      {check.role==="Admin"?setAdmin(true):setAdmin(false)}
      newError.email='';
      newError.password='';
      setError(newError);
      if(admin){
        gotoHome()
      }
    }
    else{
      setError(newError);
    }
  }
  const nav=useNavigate();
  const gotosignup=()=>{
    nav("/signup")
  }
  const gotoHome=()=>{
    nav("/dashboard")
  }
  return( 
    <div className='back'>
      <div className='sback'>
          <Container  sx={{display:'flex',justifyContent:'flex-start',alignItems:'center'}} >
              <Container sx={{display:'flex',flexDirection:'row',justifyContent:"flex-start",alignItems:'center'}}>
              <h1 className='title'>INVENTORY<br></br>MANAGEMENT</h1>
              <img class="log" src={logo} alt='ALt'width={200}></img>
              </Container>
              
              <Box className="Con" p={7} sx={{backgroundColor:'white',height:300,width: 400, border: '2px solid white' ,borderRadius: '16px'}}>
                <Typography variant="h4" gutterBottom>Sign in</Typography>
                <TextField  label={"Email"} sx={{width:400}} type='email' error={!!error.email} helperText={error.email} onChange={(e)=>{setEmail(e.target.value)}} onvalue={email}/>
                <br></br><br></br>
                <br></br>
                <TextField label={"Password"} sx={{width:400}} type='password' error={!!error.password} helperText={error.password} onChange={(e)=>{setPass(e.target.value)}} value={password}/>  
                <br></br><br></br>
                <br></br>
                <Button variant="primary" onClick={gotosignup}>Sign Up</Button>
                <Button variant="contained" onClick={handleSubmit}>Sign In</Button>
              </Box>
             
        </Container>
      </div>
    </div>
    )
}
export default Login;