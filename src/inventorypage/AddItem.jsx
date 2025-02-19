import React,{useContext, useEffect,useState} from 'react'
import axios from 'axios'
import {Box,Button ,Paper,InputBase,  Typography,ButtonBase, Stack, Divider, useMediaQuery,} from '@mui/material';
import "./AddItem.css"
import Grid from '@mui/material/Grid2';
import { green,  pink } from '@mui/material/colors';
import { context } from '../ContextAPI';
function AddItem() {
    const { updateData } = useContext(context);
    const [data,setData]=useState([]);
    const [id,setId]=useState("");
    const [input,setInput]=useState({"item":"","qty":"","mprice":"","price":"","sale":0,"temp":0});
    const [error,setError]=useState("");
    const isMobile = useMediaQuery("(max-width: 768px)");
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
    }, [context]);
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setInput({...input,[name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (id) {
            await axios.put(`http://localhost:3000/item/${id}`, input);
            setData((prevData) =>
              prevData.map((item) => (item.id === id ? { ...input, id } : item))
            );
          } else {
            const response = await axios.post("http://localhost:3000/item", input);
            setData((prevData) => [...prevData, response.data]); 
          }
          setInput({ item: "", qty: "",mprice: "", price: "", sale: 0, temp: 0 });
          setId(null);
          updateData();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const handleReset = async (id) => {
        try {
          setData((prevData) =>
            prevData.map((item) => (item.id === id ? { ...item, sale: 0 } : item))
          );
          await axios.put(`http://localhost:3000/item/${id}`, {
            ...data.find((i) => i.id === id),
            sale: 0,
          });
          updateData()
        } catch (error) {
          console.error("Error resetting sale:", error);
        }
      };
    const handleDelete=(id)=>{

        axios.delete(`http://localhost:3000/item/${id}`)
        .then(()=>{
            setData(data.filter((d)=>d.id!==id))
            updateData()
        })
    }
    const handleEdit = (id) => {
        const editItem = data.find((d) => d.id === id);
        setInput({ ...editItem });
        setId(id);
    };

   return (
    <div style={{display:"flex",width:"100%",flexDirection:"column"}}>
        <div className='add' style={{zIndex:1000,marginTop:"65px",overflow:"hidden",position:"fixed", display:'flex', alignItems: 'center', width:"100%",}}>
            <p class="title" style={{color:"white"}}>Add Item</p><br/>
            <Paper component="form" sx={{ marginLeft:5,display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='item' value={input.item} onChange={handleChange} sx={{ ml: 1, flex: 1 }} placeholder="Item Name" />
            </Paper>
            <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='qty' value={input.qty} onChange={handleChange}  sx={{ ml: 1, flex: 1 }} placeholder="Quantity" />
            </Paper>
            <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='mprice' value={input.mprice} onChange={handleChange}  sx={{ ml: 1, flex: 1 }} placeholder="Market-Price" inputProps={{ 'aria-label': 'search google maps' }}/>
            </Paper>
            <Paper component="form"  sx={{ marginLeft:5, display:'flex', alignItems: 'center', width:200 }}>
            <InputBase name='price' value={input.price} onChange={handleChange}  sx={{ ml: 1, flex: 1 }} placeholder="Selling-Price" inputProps={{ 'aria-label': 'search google maps' }}/>
            </Paper>
            <Button sx={{ marginLeft:5,backgroundColor: green[500],}} variant='contained' className ="button" type='submit' onClick={handleSubmit} >ADD</Button>
        </div>
        <Paper sx={{zIndex:1000,marginTop:"150px",overflow:"hidden",position:"fixed", display:'flex',justifyContent:"flex-start", alignItems: 'center', width:"100%",}}>
            <Stack direction="row" sx={{marginLeft:18}}divider={<Divider orientation="vertical" flexItem />} spacing={{ xs: 100, sm: 200, md: 10 }}>
                    <Typography variant="h6"sx={{fontWeight:"bold"}}>S.NO</Typography>
                    <Typography variant="h6"sx={{fontWeight:"bold"}}>ITEMS</Typography>
                    <Typography variant="h6"sx={{fontWeight:"bold"}}>QUANTITY</Typography>
                    <Typography variant="h6"sx={{fontWeight:"bold"}}>Selling-Price</Typography>
            </Stack>
        </Paper>
        <div className='List' style={{marginTop:"180px"}}>
            {data.map((datas,index)=>{
                const {id,qty,item,price}=datas;
            return(
                <div >
                <br></br>
                <Paper className="API" key={id} sx={{ backgroundColor:'rgba(255, 255, 255,0.2)',borderRadius:2,marginLeft:3,height:40,display:"flex",padding:1,width:"95%"}} >
                    <Box sx={{ flexGrow:1,marginLeft:15}} >
                    <Grid container  spacing={19}>
                    <Grid item key={id} size={{ xs: 1.7}}>
                    <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{index+1}</Typography>
                    </Grid>
                    <Grid item key={id} size={{ xs: 1.9}}>
                    <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>{item}</Typography>
                    </Grid>
                    <Grid item key={id} size={{ xs: 2.3}}>
                    <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}>  {qty}</Typography>
                    </Grid>
                    <Grid item key={id} size={{ xs: 2}}>
                    <Typography variant="h6"sx={{fontWeight:"bold",color:"white"}}> ₹{price}</Typography>
                    </Grid>
                    {/* </div> */}
                    <Grid item key={id} size={{ xs: 2}}>
                    <ButtonBase >
                        <Button sx={{backgroundColor:pink[700]}}variant='contained' onClick={()=>handleDelete(id)}>Delete</Button>
                        <Button sx={{marginLeft:4}} variant='contained' onClick={()=>handleEdit(id)}>Edit</Button>
                        <Button sx={{ marginLeft:1,backgroundColor: green[500],}} variant='contained' className ="button" type='submit' onClick={()=>handleReset(id)} >Reset</Button>
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