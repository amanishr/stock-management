import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

import { Divider } from '@material-ui/core';
export default function Employees() {
  return (
    <React.Fragment>
      <Title>Employee Details</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Employee ID</TableCell>
            <TableCell>Starting Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell align="right">Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadRows()}
        </TableBody>
      </Table>
      <Divider></Divider>
      {AddEmployee()}
      <Divider></Divider>
      {UpdateEmployee()}
      <Divider></Divider>
      {DeleteEmployee()}
    </React.Fragment>
  );
}

function loadRows(){
  let rows = JSON.parse(localStorage.getItem('Employees'));
  if(rows===null)
    return;
  const r = rows.map((row) => (
  <TableRow key={row.id}>
    <TableCell>{row.id}</TableCell>
    <TableCell>{row.date}</TableCell>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.add}</TableCell>
    <TableCell align="right">{row.Salary}</TableCell>
  </TableRow>
  ));
  return r;
}

function AddEmployee(){
  return(
    <Grid container sm>
      <Grid item>
      <TextField
          name="Date"
          variant="outlined"
          required
          id="Date"
          type="Date"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Name"
          variant="outlined"
          required
          id="Name"
          label="Name"
          type="name"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Address"
          variant="outlined"
          required
          id="Address"
          label="Address"
          type="Address"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Salary"
          variant="outlined"
          required
          id="Salary"
          label="Salary"
          type="Salary"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={addEmployee}
      >
          Add Employee
      </Button>
      </Grid>
    </Grid>
  );
}

function UpdateEmployee(){
  return(
    <Grid container sm>
      <Grid item>
      <TextField
          name="Id"
          variant="outlined"
          required
          id="updateId"
          type="Id"
          label="Employee Id"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Date"
          variant="outlined"
          required
          id="updateDate"
          type="Date"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Name"
          variant="outlined"
          required
          id="updateName"
          label="Name"
          type="name"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Address"
          variant="outlined"
          required
          id="updateAddress"
          label="Address"
          type="Address"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Salary"
          variant="outlined"
          required
          id="updateSalary"
          label="Salary"
          type="Salary"
      />
      </Grid>
      <Grid item xs="12">
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={updateEmployee}
      >
          Update Employee
      </Button>
      </Grid>
    </Grid>
  );
}

function DeleteEmployee(){
  return(
    <Grid>
      <Grid item>
      <TextField
          name="deleteId"
          variant="outlined"
          required
          id="deleteId"
          type="Id"
          label="Employee Id"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={deleteEmployee}
      >
          Delete Employee
      </Button>
      </Grid>
    </Grid>
  );
}

function addEmployee(e){
  let name = document.getElementById('Name').value;
  let date = document.getElementById('Date').value;
  let add = document.getElementById('Address').value;
  let Salary = document.getElementById('Salary').value;
  let Employees = JSON.parse(localStorage.getItem('Employees'));
  let EmployeeMaxId = JSON.parse(localStorage.getItem('EmployeeMaxId'));
  if(Employees===null)
    Employees = [];
  if(EmployeeMaxId===null)
    EmployeeMaxId = 0;
  EmployeeMaxId += 1;
  let id = EmployeeMaxId;
  let row = {id, date, name, add, Salary};
  Employees.push(row);
  localStorage.setItem('Employees', JSON.stringify(Employees));
  localStorage.setItem('EmployeeMaxId', JSON.stringify(EmployeeMaxId));
  localStorage.setItem('Tab', JSON.stringify("Employees"));
  window.location.reload();
  e.preventDefault();
}

function updateEmployee(e){
  let id = document.getElementById('updateId').value;
  let name = document.getElementById('updateName').value;
  let date = document.getElementById('updateDate').value;
  let add = document.getElementById('updateAddress').value;
  let Salary = document.getElementById('updateSalary').value;
  let row = {id, date, name, add, Salary};
  let Employees = JSON.parse(localStorage.getItem('Employees'));
  console.log(row);
  let done = false;
  if(Employees===null)
    Employees = [];
  for(let i=0; i<Employees.length; i++){
    if(Employees[i].id==id){
      Employees.splice(i,1,row);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Employee Id');
    return;
  }
  localStorage.setItem('Employees', JSON.stringify(Employees));
  localStorage.setItem('Tab', JSON.stringify("Employees"));
  window.location.reload();
  e.preventDefault();
}

function deleteEmployee(e){
  let id = document.getElementById('deleteId').value;
  let Employees = JSON.parse(localStorage.getItem('Employees'));
  let done = false;
  if(Employees===null)
    Employees = [];
  for(let i=0; i<Employees.length; i++){
    if(Employees[i].id==id){
      Employees.splice(i,1);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Employee Id');
    return;
  }
  localStorage.setItem('Employees', JSON.stringify(Employees));
  localStorage.setItem('Tab', JSON.stringify("Employees"));
  window.location.reload();
  e.preventDefault();
}