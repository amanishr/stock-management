import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Suppliers from './Suppliers';
import Products from './Products';
import Orders from './Orders';
import Employees from './Employees';

import {useHistory} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Admin() {
    const history = useHistory();
    let curDesignation = JSON.parse(localStorage.getItem('curDesignation'));
    if(curDesignation!=="Admin")
    history.push("/sign_in");
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    let tab = JSON.parse(localStorage.getItem('Tab'));
    const [openScreen, setScreenOpen] = React.useState(tab);
    const employeeList = () => {
        setScreenOpen("Employees");
    };
    const purchaseList = () => {
        setScreenOpen("Orders");
    };
    const productList = () => {
        setScreenOpen("Products");
    };
    const supplierList = () => {
        setScreenOpen("Suppliers");
    };
    const logout = () => {
        localStorage.setItem('curDesignation', JSON.stringify(null));
        history.push("/sign_in");
    };
    const mainListItems = (
        <div>
        <ListItem button onClick={employeeList}>
            <ListItemIcon>
            <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employee Details" />
        </ListItem>
        <ListItem button onClick={productList}>
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Product Details" />
        </ListItem>
        <ListItem button onClick={purchaseList}>
            <ListItemIcon>
            <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Purchase Details" />
        </ListItem>
        <ListItem button onClick={supplierList}>
            <ListItemIcon>
            <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Supplier Details" />
        </ListItem>
        <ListItem button onClick={logout}>
            <ListItemIcon>
            <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout"/>
        </ListItem>
        </div>
    );

    return (
        <div className={classes.root}>
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                Dashboard
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            variant="permanent"
            classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
        >
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
        </Drawer>
        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>
                    {Loader()}
                </Paper>
                </Grid>
            </Grid>
            </Container>
        </main>
        </div>
    );

    function Loader(){
        var r =  <div/>;
        if(openScreen==="Orders")
        r = <Orders/>;
        else if(openScreen==="Products")
        r = <Products/>;
        else if(openScreen==="Suppliers")
        r = <Suppliers/>;
        else if(openScreen==="Employees")
        r = <Employees/>;
        return r;
    }
}