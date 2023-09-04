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
import { useNavigate,useParams } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {  enqueueSnackbar } from 'notistack';
import { Card, CardContent, Typography } from "@mui/material";

export default function UserDetail(){
    const navigate = useNavigate();
    const {userId} = useParams();

    const {setPageName, isAdmin} = useStateContext();

    const [user, setUser] = useState(null);

    const [dayOffs, setDayOffs] = useState([]);

    const[page, setPage] = useState(0);
    const[totalPages, setTotalPages] = useState(0);
    const[totalElements, setTotalElements] = useState(0);
    const[rowsPerPage, setRowsPerPage] = useState(10);

    const[startDate, setStartDate] = useState(new Date().toISOString().substring(0,10));
    const[dayCount, setDayCount] = useState(20);

    const handleChangePage = (event, newPage) => {        
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    
    const getDayOffs = (pageNumber, size) => {
        axiosClient.get("/day-offs/"+parseInt(userId)+"?page="+parseInt(pageNumber)+"&size="+parseInt(size))
        .then(
            ({data})=>{
                setDayOffs(data.content);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    const getUser = () => {
        axiosClient.get("/users/"+userId)
        .then(
            ({data})=>{
                setUser(data);
            }
        ).catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        setPageName("Home");   
        getUser();
    },[])
    
    
    useEffect(()=>{
        getDayOffs(page,rowsPerPage);
    },[page,rowsPerPage])

    const createDayOffs = () => {
        var formData = new FormData();
        formData.append('dayOffCount', dayCount);
        formData.append('date', startDate);
        formData.append('userId', userId);
        
        axiosClient.post("/day-offs", formData)
        .then(
            ({data})=>{       
                enqueueSnackbar(data,{variant:"success"})
                getDayOffs(page,rowsPerPage);
            }
        )
        .catch((error)=>{
            console.log(error);
                if(error.response.data){
                    enqueueSnackbar(error.response.data,{variant:"error"})
                }else{
                    enqueueSnackbar(error.message,{variant:"error"})
                }    
        })
    }
        
    return (
        <Container style={{marginBottom:"80px"}}>
            {user!=null &&
            <Card style={{marginBottom:"40px"}}>
                <CardContent>                        
                    <Typography variant="h5" component="div" gutterBottom>{user.name}</Typography>
                    <Typography variant="h6" component="div" gutterBottom>Salary : {user.salary}</Typography>
                    <Typography variant="h6" component="div" gutterBottom>{user.username}</Typography>
                </CardContent>
            </Card>
            }
             <Container style={{marginBottom:"40px", maxWidth:"400px"}}>
                    <TextField fullWidth id="outlined-basic" label="Start Date" variant="outlined" type="date" defaultValue={startDate} onChange={(e)=>{setStartDate(e.target.value)}} />
                    <TextField fullWidth id="outlined-basic" label="Day Count" variant="outlined" type="number" defaultValue={dayCount} onChange={(e)=>{setDayCount(e.target.value)}} />
                    
                    <Button fullWidth onClick={createDayOffs} variant="contained">Submit</Button>
                </Container>
            <Paper>
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            <TableCell align="left">Start Date</TableCell>
                            <TableCell align="left">End Date</TableCell>
                            <TableCell align="left">Day Off Count</TableCell>
                            <TableCell align="left">Created By</TableCell>
                            <TableCell align="right">Created Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {dayOffs.map((element,i) => (
                            <TableRow hover
                                key={i}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell align="left"> {new Date(element.startDate).toDateString() } </TableCell>
                                <TableCell align="left">{new Date(element.endDate).toDateString()}</TableCell>
                                <TableCell align="left">{element.dayOffsCount}</TableCell>
                                <TableCell align="left">{element.createdBy}</TableCell>
                                <TableCell align="right">{new Date(element.createdDate).toDateString()}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {totalPages > 1 && 
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                }
            </Paper>
        </Container>
    )
       
}
