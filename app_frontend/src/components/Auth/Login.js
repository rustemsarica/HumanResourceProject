import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { useStateContext } from "../contexts/ContextProvider";
import { Container } from "@mui/material";
import axiosClient from "../../axios-client";
import {  enqueueSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { firstUpperCase } from "../contexts/helpers";

function Login(){
    const navigate = useNavigate();   

    const [errors, setErrors] = useState(null);

    const {setName, setUserId, setToken, setRefreshToken, setRole, setIsAdmin, setPageName} = useStateContext(); 
    
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(()=>{
        setPageName("Login");
    },[])

    const onSubmit = (ev)=>{
        ev.preventDefault()
        axiosClient.post('/login',{
            username: username,
            password: password,
        })
        .then((response) => {
            console.log(response)
            if(response.status===200){
                setName(response.data.username);
                setUserId(response.data.id);
                setToken(response.data.token);
                setRefreshToken(response.data.refreshToken);
                setRole(response.data.role);
                setIsAdmin(response.data.role==="ROLE_ADMIN");
                navigate("/");
            }else{
                enqueueSnackbar(response.token,{variant:"error"})
            }
            
        })
        .catch((error)=>{
            if (error.response) {
                const { data } = error.response;
                if (data.fieldErrors) {
                  setErrors(data.fieldErrors);
                }
            }else{
                enqueueSnackbar(error.message,{variant:"error"}) 
            }
        })
    }


    return (
        <Container>
            <Grid container direction="row" justifyContent="center" alignItems="center" style={{minHeight:'calc(100vh - 80px)'}}> 
                <Grid item xs={12} md={6}>                   
                    <form onSubmit={onSubmit}>
                        <Card sx={{ textAlign: 'left' }}>
                            <CardContent>
                            { errors &&
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    {errors.map((key,i) => (
                                        <Alert key={key+i} severity="error">{firstUpperCase(key.field)+" "+key.message}</Alert>
                                    ))}
                                </Stack>
                                }                                
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="Username" 
                                        onChange={(ev)=>setUserName(ev.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={(ev)=>setPassword(ev.target.value)}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                            </CardContent>
                            <CardActions sx={{display:'flex', flexDirection:'row-reverse', p:2}} >
                                <Button type="Submit" variant="contained">Login</Button>
                                
                                <Button variant="outlined" href="/auth/register" sx={{mr:1}}>Register</Button>
                            </CardActions>
                        </Card>                        
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;