import React from 'react';
import { useEffect, useState } from 'react';

import OpenClose from './OpenClose'
import './App.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';


const API_URL = "https://api.polygon.io/v1/open-close/";
const API_KEY = "dI4NYA1QT7Clz03oVAjNpBB6s9kb3YQ5";

const App = () => {

    const [stock, setStock] = useState(null);
    const [stockSymbol, setStockSymbol] = useState("");
    const [stockDate, setStockDate] = useState("");

    const searchOpenClose = async(symbol, date) => {
        const headers = { 'Authorization': 'Bearer ' + API_KEY };
        const response = await fetch(`${API_URL}${symbol}/${date}`, { headers });
        const data = await response.json();
        console.log(data);
        response.ok ? setStock(data) : setStock(null);
    }

    useEffect(() => {
    }, []);

    return (
        <>
        <Typography variant="h3">Find a Stock</Typography>     
        <div>
            <div className="container">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker value={stockDate}
                    inputFormat="YYYY-MM-DD" onChange={(newValue) => {
                        const dateObject = newValue.toDate();
                        const year = dateObject.getFullYear();
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObject.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        console.log(formattedDate);
                        setStockDate(formattedDate);
                    }
                    }/>
                </LocalizationProvider>
                <TextField label="Stock Symbol" type="text" placeholder="Stock Symbol" value={stockSymbol}
                onChange={
                    (e) => setStockSymbol(e.target.value)
                }
                ></TextField>
                <IconButton variant="contained" onClick={() => {
                stockSymbol && stockDate ? searchOpenClose(stockSymbol, stockDate)
                    : alert("Fill out all fields before searching.");
                }}>
                    <SearchIcon/>
                </IconButton>
            </div>
            {
                stock != null ? (
                    <OpenClose stock={stock}/>
                ) : (
                <div>No stock found.</div>
                )
            }
        </div>
        </>
    );
}

export default App;
