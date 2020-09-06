import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {BrowserRouter, useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
            <TextField
                autoComplete="fname"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                type="name"
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={HandleClick}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item>
                <BrowserRouter>
                <Button color="primary" type="submit" onClick={() => {history.push("/sign_up")}}>
                    {"Don't have an account? Sign Up"}
                </Button>
                </BrowserRouter>
                </Grid>
            </Grid>
        </form>
      </div>
    </Container>
  );
  function HandleClick(e){
    e.preventDefault();
    let name = document.getElementById('Name').value;
    let pass = document.getElementById('password').value;
    if(!accExists(name)){
        alert("Account does not exist! Sign Up");
        return;
    }
    if(!checkPass(name, pass)){
        alert("Wrong password! Try again");
        return;
    }
    let designation = getDesignation(name);
    localStorage.setItem('curName', JSON.stringify(name));
    localStorage.setItem('curDesignation', JSON.stringify(designation));
    alert("Welcome "+name);
    history.push("/"+designation);
  }
}

export function accExists(name){
    let accList = JSON.parse(localStorage.getItem('accList'));
    if(accList===null)
        return false;
    for(let i = 0; i<accList.length; i++){
        if(accList[i].name===name)
            return true;
    }
    return false;
}

function checkPass(name, pass){
    let accList = JSON.parse(localStorage.getItem('accList'));
    let temp = false;
    for(let i = 0; i<accList.length; i++){
        if(accList[i].name===name)
            if(accList[i].pass===pass)
                temp = true;
    }
    return temp;
}

function getDesignation(name){
    let accList = JSON.parse(localStorage.getItem('accList'));
    for(let i = 0; i<accList.length; i++){
        if(accList[i].name===name)
            return accList[i].designation;
    }
}

