import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 400,
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.background.paper,
    },
}));

const options = [
    'Test last day',
    'Test last 3 days',
    'Test last week',
    'Test last month',
];

const options2 = [
    'Primary language',
    'Foreign language'
];


export default function SimpleListMenu() {
    const classes = useStyles();
    console.log(classes);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [anchorEl2, setAnchorEl2] = React.useState(null);
    const [selectedIndex2, setSelectedIndex2] = React.useState(1);
    const handleClickListItem = (event,setAnchorEl) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index,setAnchorEl,setSelectedIndex) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = (setAnchorEl) => {
        setAnchorEl(null);
    };
    console.log(options);
    console.log(options2);

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="Device settings" 
                        style={{padding:0}}
            
            >
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Testing Knowledge"
                    onClick={(e) => handleClickListItem(e,setAnchorEl)}
                >
                    <ListItemText primary="Testing Knowledge" secondary={options[selectedIndex]} />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted

                open={Boolean(anchorEl)}
                onClose={() => handleClose(setAnchorEl)}
            >
                {options.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={event => handleMenuItemClick(event, index,setAnchorEl,setSelectedIndex)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            <List component="nav" aria-label="Device settings"
                        style={{padding:0}}
            
            >
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="Testing Knowledge"
                    onClick={(e) => handleClickListItem(e,setAnchorEl2)}
                >
                    <ListItemText primary="Main Language" secondary={options2[selectedIndex2]} />
                </ListItem>
            </List>
            <Menu
                id="lock-menu2"
                anchorEl={anchorEl2}
                keepMounted
                open={Boolean(anchorEl2)}
                onClose={() => handleClose(setAnchorEl2)}
            >
                {options2.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedIndex2}
                        onClick={event => handleMenuItemClick(event, index,setAnchorEl2,setSelectedIndex2)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            
        </div>
    );
}