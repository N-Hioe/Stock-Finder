import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentIcon from '@mui/icons-material/Assignment';

const OpenClose = ({stock}) => {
    const { symbol, from, high, low } = stock;
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
                <AssignmentIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Stock" secondary={symbol} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
                <CalendarMonthIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Date" secondary={from} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
                <TrendingUpIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="High" secondary={high} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
                <TrendingDownIcon/>
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Low" secondary={low} />
        </ListItem>
      </List>
    );
}

export default OpenClose;