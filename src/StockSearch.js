import React from 'react';
import { useState } from 'react';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import './App.css';
import OpenClose from './OpenClose'

const StockSearch = ({ API_KEY }) => {
    const [stock, setStock] = useState(null);
    const [stockSymbol, setStockSymbol] = useState("");
    const [stockDate, setStockDate] = useState("");

    const searchOpenClose = async(symbol, date) => {
        const API_URL = "https://api.polygon.io/v1/open-close/";
        const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
        const response = await fetch(`${API_URL}${symbol}/${date}`, { headers });
        const data = await response.json();
        console.log(data);
        response.ok ? setStock(data) : setStock(null);
    }

    return(
            <div className="grid-container">
                <div>
                    <DatePicker value={stockDate}
                    inputFormat="YYYY-MM-DD" disableFuture onChange={(newValue) => {
                        const dateObject = newValue.toDate();
                        const year = dateObject.getFullYear();
                        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                        const day = String(dateObject.getDate()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day}`;
                        console.log(formattedDate);
                        setStockDate(formattedDate);
                    }
                    }/>
                    <TextField label="Stock Symbol" type="text" placeholder="Stock Symbol" value={stockSymbol}
                    onChange={
                        (e) => setStockSymbol(e.target.value)
                    }
                    ></TextField>
                    <IconButton variant="contained" onClick={
                        () => {
                            stockSymbol && stockDate ? searchOpenClose(stockSymbol, stockDate) : alert("Fill out all fields before searching.");
                    }}>
                        <SearchIcon/>
                    </IconButton>
                </div>
                <div>             
                    {
                        stock != null ? (
                            <OpenClose stock={stock}/>
                        ) : (
                        <Typography>No stock found.</Typography>
                        )
                    }
                </div>
            </div>
    );
}

export default StockSearch;
