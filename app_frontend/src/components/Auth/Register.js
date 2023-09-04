import React from "react";
import { useState } from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Grid from '@mui/material/Grid';
import { Container } from "@mui/material";
import axiosClient from "../../axios-client";
import {  enqueueSnackbar } from 'notistack';
import { useStateContext } from "../../components/contexts/ContextProvider";

function Register(){
    const {setPageName} = useStateContext();
    setPageName("Register");

    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState(null);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = (ev)=>{
        ev.preventDefault()
        setErrors(null)

        axiosClient.post('/register',{
            role:role,
            name: name,
            username: username,
            password: password,
        })
        .then(({data}) => {
            enqueueSnackbar(data,{variant:"success"})
        })
        .catch((err) => {
            if (err.response) {
                const { data } = err.response;
                if (data.fieldErrors) {
                  setErrors(data.fieldErrors);
                }
            }else{
                enqueueSnackbar(err,{variant:"error"}) 
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
                                    {errors.map((key) => (
                                        <Alert key={key} severity="error">{key.message}</Alert>
                                    ))}
                                </Stack>
                                }
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={role}
                                        label="Role"
                                        onChange={(e)=>{setRole(e.target.value)}}
                                    >
                                        <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                                        <MenuItem value={"USER"}>USER</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="Name" 
                                        onChange={(ev)=>setName(ev.target.value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth sx={{ m: 1 }}>
                                    <InputLabel htmlFor="outlined-adornment-amount">Username</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-amount"
                                        label="Username" 
                                        onChange={(ev)=>setUsername(ev.target.value)}
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
                            <CardActions disableSpacing sx={{display:'flex', flexDirection:'row-reverse', p:2}} >
                                <Button type="Submit" variant="contained">Register</Button>
                                <Button variant="outlined" href="/auth/login" sx={{mr:1}}>Login</Button>
                            </CardActions>
                        </Card>                    
                    </form>
                </Grid>    
            </Grid>
        </Container>
    )
}

export default Register;