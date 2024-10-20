import React,{useState} from 'react';
import logo from './image.png';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import {TextField,Box,Container,Button,Typography} from '@mui/material';
function Signup(){
  let[email,setEmail]=useState('');
  let[password,setPass]=useState('');
  let[conpassword,setCon]=useState('');
  const nav=useNavigate();
  let[error,setError]=useState({email:'',password:'',conpassword:''});
  let[user,setUser]=useState([]);
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gotologin=()=>{
    nav("/");
  }
  const handleSubmit=(e)=>{
    let newError={email:'',password:'',conpassword:''};
    let valid = true;
    if(!regex.test(email)){
      newError.email="Invalid email address";
      valid=false;
    }
    if(password.length<8){
      newError.password="Password must be at least 8 characters long";
      valid=false;
    }
    if(conpassword!=password){
        newError.conpassword="Password mismatch";
        valid=false;
    }
    if(valid){
      setUser([...user,{email,password}]);
      newError.email='';
      newError.password='';
      newError.conpassword='';
      setError(newError);
      alert(JSON.stringify(user));
      gotologin();
    }
    else{
      setError(newError);
    }
  }
  return( 
    <div className='back'>
      <div className='sback'>
          <Container  sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
              <Container sx={{display:'flex',flexDirection:'row',justifyContent:"center",alignItems:'center'}}>
              <h1 className='title'>INVENTORY<br></br>MANAGEMENT</h1>
              <img class="log" src={logo} alt='ALt'width={100}></img>
              </Container>
    
              <Box className="Con" p={7} sx={{backgroundColor:'white',height:390,width: 400, border: '2px solid white' ,borderRadius: '16px'}}>
                <Typography variant="h4" gutterBottom>Sign up</Typography>
                <TextField  label={"Email"} sx={{width:400}} type='email' error={!!error.email} helperText={error.email} onChange={(e)=>{setEmail(e.target.value)}} onvalue={email}/>
                <br></br><br></br>
                <br></br>
                <TextField label={"Enter Password"} sx={{width:400}} type='password' error={!!error.password} helperText={error.password} onChange={(e)=>{setPass(e.target.value)}} value={password}/>  
                <br></br><br></br>
                <br></br>
                <TextField label={"Confirm Password"} sx={{width:400}} type='password' error={!!error.conpassword} helperText={error.conpassword} onChange={(e)=>{setCon(e.target.value)}} value={conpassword}/>  
                <br></br><br></br>
                <br></br>
                <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
              </Box>
             
        </Container>
      </div>
    </div>
    )
}
export default Signup;