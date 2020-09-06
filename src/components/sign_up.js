import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {BrowserRouter, useHistory} from 'react-router-dom';

import {accExists} from './sign_in';


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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="designation"
                label="Designation"
                name="designation"
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={accAdd}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
            <BrowserRouter>
            <Button color="primary" type="submit" onClick={() => {history.push("/sign_in")}}>
              {"Have an account? Sign In"}
            </Button>
            </BrowserRouter>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
  
}

function accAdd(e){
    e.preventDefault();
    let name = document.getElementById('Name').value;
    let pass = document.getElementById('password').value;
    let designation = document.getElementById('designation').value;
    let acc = {name, designation, pass};
    if(accExists(name)){
        alert("Account already exists! Sign in");
        return;
    }
    if(!checkDesignation(designation)){
        alert("Invalid designation! Valid designations are Manager, Clerk and Admin");
        return;
    }
    let accList = JSON.parse(localStorage.getItem('accList'));
    if(accList===null)
        accList = [];
    accList.push(acc);
    console.log(accList);
    localStorage.setItem('accList', JSON.stringify(accList));
    alert("Registration complete! Sign in");
}

function checkDesignation(designation){
    let temp = false;
    if(designation==='Manager')
        temp=true;
    else if(designation==='Clerk')
        temp=true;
    else if(designation==='Admin')
        temp=true;
    return temp;
}