import React,{useState} from 'react';
import logo from './image.png';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import {TextField,Box,Container,Button,Typography, InputLabel, Select, MenuItem, FormControl} from '@mui/material';
import axios from 'axios';
function Signup(){
  const[conpassword,setCon]=useState('');
  const[error,setError]=useState({email:'',password:'',conpassword:''});
  const[user,setUser]=useState({"email":"","password":"","role":""});
  const nav=useNavigate();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const gotologin=()=>{
    nav("/");
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };
  const handleSubmit=(e)=>{
    const newError={email:'',password:'',conpassword:''};
    let valid = true;
    if(!regex.test(user.email)){
      newError.email="Invalid email address";
      valid=false;
    }
    if(user.password.length<8){
      newError.password="Password must be at least 8 characters long";
      valid=false;
    }
    if(conpassword!==user.password){
        newError.conpassword="Password mismatch";
        valid=false;
    }
    if(valid){
      console.log(user);
      axios.post("http://localhost:3000/user",user)
      newError.email='';
      newError.password='';
      newError.conpassword='';
      setError(newError);
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
    
              <Box className="Con" p={7} sx={{backgroundColor:'white',minHeight:390,width: 400, border: '2px solid white' ,borderRadius: '16px'}}>
                <Typography variant="h4" gutterBottom>Sign up</Typography>
                <TextField name="email"  label={"Email"} sx={{width:400}} type='email' error={!!error.email} helperText={error.email} onChange={handleChange} value={user.email}/>
                <br></br><br></br>
                <br></br>
                <TextField name="password" label={"Enter Password"} sx={{width:400}} type='password' error={!!error.password} helperText={error.password} onChange={handleChange} value={user.password}/>  
                <br></br><br></br>
                <br></br>
                <TextField label={"Confirm Password"} sx={{width:400}} type='password' error={!!error.conpassword} helperText={error.conpassword} onChange={(e)=>{setCon(e.target.value)}} value={conpassword}/>  
                <br></br><br></br>
                <br></br>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user.role}
                  label="Role"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                </Select>
              </FormControl>
              <br></br><br></br>
                <Button variant="contained" onClick={handleSubmit}>Sign Up</Button>
              </Box>
             
        </Container>
      </div>
    </div>
    )
}
export default Signup;