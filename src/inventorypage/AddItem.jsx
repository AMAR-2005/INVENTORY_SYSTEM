import React,{useEffect,useState} from 'react'
import axios from 'axios'
import {Box,Button ,Paper,InputBase,  Typography,ButtonBase,} from '@mui/material';
import "./AddItem.css"
import Grid from '@mui/material/Grid2';
import { green,  pink } from '@mui/material/colors';
function AddItem() {
    
    const [data,setData]=useState([]);
    const [id,setId]=useState("");
    const [input,setInput]=useState({"item":"","qty":0,"price":0,"sale":0,"temp":0});
    const [error,setError]=useState("");
    useEffect( 
        ()=>{
            try{
                axios.get("http://localhost:3000/item")
                .then((response)=>{
                    setData(response.data);
                }
                )
             }
             catch(error){  
                 setError(error.message);
             }
         }
    ,[])
    const handelChange=(e)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value});
    }
    const handelSubmit=(e)=>{
        e.preventDefault();
        if(id){
            axios.put(`http://localhost:3000/item/${id}`,input)
            .then((response)=>{
                setData(data.map((item)=>(item.id===id?response.data:item)));
                setId(null);
                setInput({item:"",qty:0,price:0,sale:0,temp:0});
            })
        }
        else{
            axios.post("http://localhost:3000/item",input)
            .then((response)=>{
                setData([...data,response.data]);
                setInput({item:"",qty:0,price:0,sale:0,temp:0});
            })
        }
    }
    const handelReset=(id)=>{
        const edit=data.find((i)=>i.id===id);
        edit.sale=0;
        axios.put(`http://localhost:3000/item/${id}`,edit)
        .then((response)=>{
            setData(data.map((i)=>(i.item.id===id?response.data:i)))
        })
        
    }
    const handelDelete=(id)=>{

        axios.delete(`http://localhost:3000/item/${id}`)
        .then(()=>{
            setData(data.filter((d)=>d.id!==id))
        })
    }
    const handelEdit=(id)=>{
        const edit=data.find((d)=>d.id===id)
        setInput({item:edit.item,qty:edit.qty,price:edit.price,sale:edit.sale,temp:edit.temp});
        setId(id);
    }

   return (
    <div style={{display:"flex",width:"100%",flexDirection:"column"}}>
        <div className='add' style={{zIndex:1000,marginTop:"65px",overflow:"hidden",position:"fixed", display:'flex', alignItems: 'center', width:"100%",}}>
            <p class="title" style={{color:"white"}}>Add Item</p><br/>
            <Paper component="form" sx={{ marginLeft:5,display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='item' value={input.item} onChange={handelChange} sx={{ ml: 1, flex: 1 }} placeholder="Item Name" />
            </Paper>
            <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='qty' value={input.qty} onChange={handelChange}  sx={{ ml: 1, flex: 1 }} placeholder="Quantity" inputProps={{ 'aria-label': 'search google maps' }}/>
            </Paper>
            <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='price' value={input.price} onChange={handelChange}  sx={{ ml: 1, flex: 1 }} placeholder="Price" inputProps={{ 'aria-label': 'search google maps' }}/>
            </Paper>
            <Button sx={{ marginLeft:5,backgroundColor: green[500],}} variant='contained' className ="button" type='submit' onClick={handelSubmit} >ADD</Button>
            
        </div>
        <div className='List' style={{marginTop:"160px"}}>
            {data.map((datas,index)=>{
                const {id,qty,item,price}=datas;
            return(
                <div >
                <br></br>
                <Paper className="API" key={id} sx={{ backgroundColor:'rgba(255, 255, 255,0.2)',borderRadius:2,marginLeft:3,height:40,display:"flex",padding:1,width:"95%"}} >
                    <Box sx={{ flexGrow:1,marginLeft:15}} >
                    <Grid container  spacing={19}>
                    {/* <div style={{opacity:1,height:1,display:"flex",marginRight:"25%"}}> */}
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
                    <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}> ₹{price}</Typography>
                    </Grid>
                    {/* </div> */}
                    <Grid item key={id} size={{ xs: 2}}>
                    <ButtonBase >
                        <Button sx={{backgroundColor:pink[700]}}variant='contained' onClick={()=>handelDelete(id)}>Delete</Button>
                        <Button sx={{marginLeft:4}} variant='contained' onClick={()=>handelEdit(id)}>Edit</Button>
                        <Button sx={{ marginLeft:1,backgroundColor: green[500],}} variant='contained' className ="button" type='submit' onClick={()=>handelReset(id)} >Reset</Button>
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
    </div>
  )
}
export default AddItem