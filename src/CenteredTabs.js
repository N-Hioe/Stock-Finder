import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import StockSearch from './StockSearch';
import StockNews from './StockNews';
import StockProfile from './StockProfile';

export default function CenteredTabs(API_KEY) {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch(tabValue) {
        case 0:
            return (<StockSearch API_KEY={ API_KEY }/>);
        case 1:
            return (<StockNews API_KEY= { API_KEY }/>);
        case 2:
            return (<StockProfile API_KEY= { API_KEY }/>);
        default:
            return null;
    }
  }

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs value={tabValue} onChange={handleChange} centered>
        <Tab label="Stock Open/Close" />
        <Tab label="Stock News" />
        <Tab label="Stock Profile" />
      </Tabs>
      {
        renderTabContent()
      }
    </Box>
  );
}