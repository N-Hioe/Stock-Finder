import React from 'react';
import { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import './App.css';

const StockProfile = ({ API_KEY }) => {   
    const [history, setHistory] = useState([]);
    const [stock, setStock] = useState(null);
    const [stockSymbol, setStockSymbol] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Check when history is updated:
    useEffect(() => {
        console.log(history);
    }, [history])

    const runSearch = async(symbol, startDate, endDate) => {
        searchProfile(symbol);
        searchHistory(symbol, startDate, endDate);
    }

    const searchProfile = async(symbol) => {
        const API_URL = "https://api.polygon.io/v3/reference/tickers/";
        const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
        const response = await fetch(`${API_URL}${symbol}`, { headers });
        const data = await response.json();
        console.log(data);
        response.ok ? setStock(data) : setStock(null);
    }

    const searchHistory = async(symbol, startDate, endDate) => {
        const API_URL = "https://api.polygon.io/v2/aggs/ticker/";
        const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
        const response = await fetch(`${API_URL}${symbol}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=365`, { headers });
        const data = await response.json();
        console.log(data);
        response.ok ? setHistory(data.results) : setHistory([]);
    }

    return(
        <div className="grid-container">
            <div>
                <DatePicker value={startDate}
                    inputFormat="YYYY-MM-DD" disableFuture onChange={(newValue) => {
                        const dateObject = newValue.toDate();
                        const year = dateObject.getFullYear();
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObject.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        setStartDate(formattedDate);
                    }
                }/>
                <DatePicker value={endDate}
                    inputFormat="YYYY-MM-DD" disableFuture 
                    onChange={(newValue) => {
                        const dateObject = newValue.toDate();
                        const year = dateObject.getFullYear();
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObject.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        setEndDate(formattedDate);
                    }
                }/>
                <TextField label="Stock Symbol" type="text" placeholder="Stock Symbol" value={stockSymbol}
                onChange={
                    (e) => setStockSymbol(e.target.value)
                }
                ></TextField>
                <IconButton variant="contained" onClick={
                    () => {
                        stockSymbol && startDate && endDate ? runSearch(stockSymbol, startDate, endDate) : alert("Fill out all fields before searching.");
                }}>
                    <SearchIcon/>
                </IconButton>
            </div>
            <div>
                {
                <Box sx={{ flexGrow: 1 }}>
                    <SparkLineChart data={ history.map((day) => {
                        return day.c;
                    }) } height={100} />
                </Box>
                }
            </div>
        </div>
    )
}

export default StockProfile;