import React from 'react';
import { useState, useEffect } from 'react';

import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Box from '@mui/material/Box';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

import './App.css';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


const StockProfile = ({ API_KEY }) => {   
    const [history, setHistory] = useState(null);    
    const [stock, setStock] = useState(null);

    const [historyChanged, setHistoryChanged] = useState(false);
    const [stockChanged, setStockChanged] = useState(false);

    const [stockSymbol, setStockSymbol] = useState("");

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Check when history is updated:
    useEffect(() => {
        console.log(history);
    }, [historyChanged])

    useEffect(() => {
        console.log(stock);
    }, [stockChanged])

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
        setStockChanged(true);
        response.ok ? setStock(data.results) : setStock(null);
    }

    const searchHistory = async(symbol, startDate, endDate) => {
        const API_URL = "https://api.polygon.io/v2/aggs/ticker/";
        const headers = { 'Authorization': 'Bearer ' + API_KEY.API_KEY };
        const response = await fetch(`${API_URL}${symbol}/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&limit=365`, { headers });
        const data = await response.json();
        console.log(data);
        setHistoryChanged(true);
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
                    stock !== null && stockChanged ? 
                    <div>
                        <div className="profile-container-desc">
                            <Typography variant="h2">{ stock.name }</Typography>
                            <Avatar
                            alt={ stock.name }
                            src={ `${stock.branding.icon_url}?apiKey=${API_KEY.API_KEY}` }
                            sx={{width: 110, height: 110}}
                            />
                            <Typography>{ stock.description }</Typography>
                        </div>
                        <div class="profile-container-list">
                            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Address" secondary={
                                        `${stock.address.address1}, ${stock.address.city}, ${stock.address.state}, ${stock.address.postal_code}`
                                    }/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Contact" secondary={stock.phone_number} />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Total Employees" secondary={stock.total_employees} />
                                </ListItem>
                            </List>
                            <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Market Cap" secondary={ stock.market_cap }/>
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <WorkIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Currency" secondary={ (stock.currency_name).toUpperCase() } />
                                </ListItem>
                                <ListItem>
                                    <ListItemAvatar>
                                    <Avatar>
                                        <BeachAccessIcon />
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Market Type" secondary={ (stock.market).toUpperCase() } />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                    
                    : <Typography>Stock not found.</Typography>
                }
                {
                    history !== null && historyChanged ?
                        <div className="graph-container">
                            <div className="row">
                                <Typography>Closing Price (Day):</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <SparkLineChart data={ history.map((day) => {
                                        return day.c;
                                    }) } height={200}
                                    showTooltip showHighlight/>
                                </Box>
                                <Typography>Opening Price (Day):</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <SparkLineChart data={ history.map((day) => {
                                        return day.o;
                                    }) } height={200}
                                    showTooltip showHighlight/>
                                </Box>
                            </div>
                            <div className="row">
                                <Typography>Number of Transactions (Day):</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <SparkLineChart data={ history.map((day) => {
                                        return day.n;
                                    }) } height={200}
                                    showTooltip showHighlight/>
                                </Box>
                                <Typography>Trading Volume (Day):</Typography>
                                <Box sx={{ flexGrow: 1 }}>
                                    <SparkLineChart data={ history.map((day) => {
                                        return day.v;
                                    }) } height={200}
                                    showTooltip showHighlight/>
                                </Box>
                            </div>
                        </div>
                    : <Typography>Data not found.</Typography>
                }
            </div>
        </div>
    )
}

export default StockProfile;