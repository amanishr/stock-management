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
export default function Suppliers() {
  return (
    <React.Fragment>
      <Title>Supplier Details</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Supplier ID</TableCell>
            <TableCell>Starting Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadRows()}
        </TableBody>
      </Table>
      <Divider></Divider>
      {AddSupplier()}
      <Divider></Divider>
      {UpdateSupplier()}
      <Divider></Divider>
      {DeleteSupplier()}
    </React.Fragment>
  );
}

function loadRows(){
  let rows = JSON.parse(localStorage.getItem('Suppliers'));
  if(rows===null)
    return;
  const r = rows.map((row) => (
  <TableRow key={row.id}>
    <TableCell>{row.id}</TableCell>
    <TableCell>{row.date}</TableCell>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.add}</TableCell>
    <TableCell align="right">{row.rating}</TableCell>
  </TableRow>
  ));
  return r;
}

function AddSupplier(){
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
          label="Location"
          type="Address"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Rating"
          variant="outlined"
          required
          id="Rating"
          label="Rating"
          type="Rating"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={addSupplier}
      >
          Add Supplier
      </Button>
      </Grid>
    </Grid>
  );
}

function UpdateSupplier(){
  return(
    <Grid container sm>
      <Grid item>
      <TextField
          name="Id"
          variant="outlined"
          required
          id="updateId"
          type="Id"
          label="Supplier Id"
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
          label="Location"
          type="Address"
      />
      </Grid>
      <Grid item>
      <TextField
          name="Rating"
          variant="outlined"
          required
          id="updateRating"
          label="Rating"
          type="Rating"
      />
      </Grid>
      <Grid item xs="12">
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={updateSupplier}
      >
          Update Supplier
      </Button>
      </Grid>
    </Grid>
  );
}

function DeleteSupplier(){
  return(
    <Grid>
      <Grid item>
      <TextField
          name="deleteId"
          variant="outlined"
          required
          id="deleteId"
          type="Id"
          label="Supplier Id"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={deleteSupplier}
      >
          Delete Supplier
      </Button>
      </Grid>
    </Grid>
  );
}

function addSupplier(e){
  let name = document.getElementById('Name').value;
  let date = document.getElementById('Date').value;
  let add = document.getElementById('Address').value;
  let rating = document.getElementById('Rating').value;
  let Suppliers = JSON.parse(localStorage.getItem('Suppliers'));
  let supplierMaxId = JSON.parse(localStorage.getItem('supplierMaxId'));
  if(Suppliers===null)
    Suppliers = [];
  if(supplierMaxId===null)
    supplierMaxId = 0;
  supplierMaxId += 1;
  let id = supplierMaxId;
  let row = {id, date, name, add, rating};
  Suppliers.push(row);
  localStorage.setItem('Suppliers', JSON.stringify(Suppliers));
  localStorage.setItem('supplierMaxId', JSON.stringify(supplierMaxId));
  localStorage.setItem('Tab', JSON.stringify("Suppliers"));
  window.location.reload();
  e.preventDefault();
}

function updateSupplier(e){
  let id = document.getElementById('updateId').value;
  let name = document.getElementById('updateName').value;
  let date = document.getElementById('updateDate').value;
  let add = document.getElementById('updateAddress').value;
  let rating = document.getElementById('updateRating').value;
  let row = {id, date, name, add, rating};
  let Suppliers = JSON.parse(localStorage.getItem('Suppliers'));
  console.log(row);
  let done = false;
  if(Suppliers===null)
    Suppliers = [];
  for(let i=0; i<Suppliers.length; i++){
    if(Suppliers[i].id==id){
      Suppliers.splice(i,1,row);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Supplier Id');
    return;
  }
  localStorage.setItem('Suppliers', JSON.stringify(Suppliers));
  localStorage.setItem('Tab', JSON.stringify("Suppliers"));
  window.location.reload();
  e.preventDefault();
}

function deleteSupplier(e){
  let id = document.getElementById('deleteId').value;
  let Suppliers = JSON.parse(localStorage.getItem('Suppliers'));
  let done = false;
  if(Suppliers===null)
    Suppliers = [];
  for(let i=0; i<Suppliers.length; i++){
    if(Suppliers[i].id==id){
      Suppliers.splice(i,1);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Supplier Id');
    return;
  }
  localStorage.setItem('Suppliers', JSON.stringify(Suppliers));
  localStorage.setItem('Tab', JSON.stringify("Suppliers"));
  window.location.reload();
  e.preventDefault();
}