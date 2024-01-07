import React from 'react';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import './App.css';
import CenteredTabs from './CenteredTabs';

const API_KEY = "dI4NYA1QT7Clz03oVAjNpBB6s9kb3YQ5";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CenteredTabs API_KEY={ API_KEY }/>
        </LocalizationProvider>
    );
}

export default App;
