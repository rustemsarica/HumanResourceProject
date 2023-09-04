import React, {useState, useEffect} from "react";
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Paper, TableContainer } from "@mui/material";
import TablePagination from '@mui/material/TablePagination';
import { useNavigate } from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  enqueueSnackbar } from 'notistack';
import { Card, CardContent, Typography } from "@mui/material";

function Home(){
    const navigate = useNavigate();

    const {setPageName, isAdmin, userId} = useStateContext();

    const [user, setUser] = useState(null);

    const [transactions, setTransactions] = useState([]);

    const[page, setPage] = useState(0);
    const[totalElements, setTotalElements] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(10);

    const[amount, setAmount] = useState(0);
    const[transaction, setTransaction] = useState(0);
    const[receiver, setReceiver] = useState("");

    const handleChangePage = (event, newPage) => {        
        setPage(newPage);
        getTransactions(newPage, rowsPerPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
        getTransactions(0,event.target.value);
    };

    
    const getTransactions = (pageNumber, size) => {
        axiosClient.get("/transactions?page="+parseInt(pageNumber)+"&size="+parseInt(size))
        .then(
            ({data})=>{
                console.log(data)
                setTransactions(data.content);
                
                setTotalElements(data.totalElements);
            },
            (error)=>{
            }
        )
    }

    const createTransactions = () => {
        var formData = new FormData();
        formData.append('amount', amount);
        formData.append('type', transaction);
        formData.append('receiver', receiver);
        
        axiosClient.post("/transactions/create", formData)
        .then(
            ({data})=>{       
                console.log(data);
                getTransactions(page,rowsPerPage);
                getUser();
            },
            (error)=>{
                if(error.response.data){
                    enqueueSnackbar(error.response.data,{variant:"error"})
                }else{
                    enqueueSnackbar(error.message,{variant:"error"})
                }                
            }
        )
        
    }

    const getUser = () => {
        axiosClient.get("/users/"+userId)
        .then(
            ({data})=>{
                console.log(data)
                setUser(data);
            },
            (error)=>{
            }
        )
    }
    
    useEffect(()=>{
        setPageName("Home");
        getTransactions(page,rowsPerPage);
        getUser();
    })

        
    return (
        <Container style={{marginBottom:"80px"}}>
            {user!==null && isAdmin==="false" &&
                <div>
                <Card style={{marginBottom:"40px"}}>
                    <CardContent>                        
                        <Typography variant="h5" component="div" gutterBottom>{user.name}</Typography>
                        <Typography variant="h6" component="div" gutterBottom>Balance : {user.balance}</Typography>
                        <Typography variant="h6" component="div" gutterBottom>{user.username}</Typography>
                    </CardContent>
                </Card>
            
                <Container style={{marginBottom:"40px"}}>
                    <TextField id="outlined-basic" label="Amount" variant="outlined" defaultValue={amount} onChange={(e)=>{setAmount(e.target.value)}} />
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Transaction</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={transaction}
                            label="Transaction"
                            onChange={(e)=>{ setTransaction(e.target.value)}}
                        >
                            <MenuItem value={0}>Withdraw</MenuItem>
                            <MenuItem value={1}>Deposit</MenuItem>
                            <MenuItem value={2}>Transfer</MenuItem>
                        </Select>
                    </FormControl>
                    {transaction===2 &&
                        <TextField id="outlined-basic" label="Receiver" variant="outlined" value={receiver} onChange={(e)=>{setReceiver(e.target.value)}} />
                    }
                    <Button disabled={amount>0 & (transaction!==2 || (receiver!=="" && receiver!==null)) ? false : true } onClick={ createTransactions } variant="contained">Submit</Button>
                </Container>
                </div>
            }
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">
                            </TableCell>
                            <TableCell align="left">Amount</TableCell>
                            <TableCell align="left">Type</TableCell>
                            <TableCell align="right">Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {transactions.map((element,i) => (
                            <TableRow hover
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell style={{cursor:isAdmin==="true" && "pointer"}} onClick={isAdmin==="true" ? () => {navigate("/user/"+element.user.id);} : null} align="left"> {element.user.name } </TableCell>
                                <TableCell align="left">{element.amount}</TableCell>
                                <TableCell align="left">{element.type}</TableCell>
                                <TableCell align="right">{new Date(element.createdDate).toUTCString()}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    )
       
}

export default Home;