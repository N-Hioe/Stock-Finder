import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import CenteredTabs from './CenteredTabs';

const API_KEY = "dI4NYA1QT7Clz03oVAjNpBB6s9kb3YQ5";

const App = () => {
    useEffect(() => {
    }, []);

    return (
        <CenteredTabs API_KEY={ API_KEY }/>
    );
}

export default App;
