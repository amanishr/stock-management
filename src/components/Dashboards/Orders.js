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
export default function Orders() {
  return (
    <React.Fragment>
      <Title>Purchase Details</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Purchase ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell align="right">Sale Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadRows()}
        </TableBody>
      </Table>
      <Divider></Divider>
      {addPurchase()}
      <Divider></Divider>
      {updatePurchase()}
      <Divider></Divider>
      {deletePurchase()}
    </React.Fragment>
  );
}

function loadRows(){
  let rows = JSON.parse(localStorage.getItem('Purchases'));
  if(rows===null)
    return;
  const r = rows.map((row) => (
  <TableRow key={row.id}>
    <TableCell>{row.id}</TableCell>
    <TableCell>{row.date}</TableCell>
    <TableCell>{row.name}</TableCell>
    <TableCell>{row.add}</TableCell>
    <TableCell align="right">{row.price}</TableCell>
  </TableRow>
  ));
  return r;
}

function addPurchase(){
  return(
    <Grid container lg>
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
          name="Price"
          variant="outlined"
          required
          id="Price"
          label="Price"
          type="Price"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={addOrder}
      >
          Add Order
      </Button>
      </Grid>
    </Grid>
  );
}

function updatePurchase(){
  return(
    <Grid container sm>
      <Grid item>
      <TextField
          name="Id"
          variant="outlined"
          required
          id="updateId"
          type="Id"
          label="Purchase Id"
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
          name="Price"
          variant="outlined"
          required
          id="updatePrice"
          label="Price"
          type="Price"
      />
      </Grid>
      <Grid item xs="12">
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={updateOrder}
      >
          Update Order
      </Button>
      </Grid>
    </Grid>
  );
}

function deletePurchase(){
  return(
    <Grid>
      <Grid item>
      <TextField
          name="deleteId"
          variant="outlined"
          required
          id="deleteId"
          type="Id"
          label="Purchase Id"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={deleteOrder}
      >
          Delete Order
      </Button>
      </Grid>
    </Grid>
  );
}

function addOrder(e){
  let name = document.getElementById('Name').value;
  let date = document.getElementById('Date').value;
  let add = document.getElementById('Address').value;
  let price = document.getElementById('Price').value;
  let purchases = JSON.parse(localStorage.getItem('Purchases'));
  let orderMaxId = JSON.parse(localStorage.getItem('orderMaxId'));
  if(purchases===null)
    purchases = [];
  if(orderMaxId===null)
    orderMaxId = 0;
  orderMaxId += 1;
  let id = orderMaxId;
  let row = {id, date, name, add, price};
  purchases.push(row);
  localStorage.setItem('Purchases', JSON.stringify(purchases));
  localStorage.setItem('orderMaxId', JSON.stringify(orderMaxId));
  localStorage.setItem('Tab', JSON.stringify("Orders"));
  window.location.reload();
  e.preventDefault();
}

function updateOrder(e){
  let id = document.getElementById('updateId').value;
  let name = document.getElementById('updateName').value;
  let date = document.getElementById('updateDate').value;
  let add = document.getElementById('updateAddress').value;
  let price = document.getElementById('updatePrice').value;
  let row = {id, date, name, add, price};
  let purchases = JSON.parse(localStorage.getItem('Purchases'));
  console.log(row);
  let done = false;
  if(purchases===null)
    purchases = [];
  for(let i=0; i<purchases.length; i++){
    if(purchases[i].id==id){
      purchases.splice(i,1,row);
      done = true;
    }
  }
  if(!done){
    alert('Wrong purchase Id');
    return;
  }
  localStorage.setItem('Purchases', JSON.stringify(purchases));
  localStorage.setItem('Tab', JSON.stringify("Orders"));
  window.location.reload();
  e.preventDefault();
}

function deleteOrder(e){
  let id = document.getElementById('deleteId').value;
  let purchases = JSON.parse(localStorage.getItem('Purchases'));
  let done = false;
  if(purchases===null)
    purchases = [];
  for(let i=0; i<purchases.length; i++){
    console.log(purchases[i].id);
    console.log(id);
    if(purchases[i].id==id){
      console.log('done');
      purchases.splice(i,1);
      done = true;
    }
  }
  if(!done){
    alert('Wrong purchase Id');
    return;
  }
  localStorage.setItem('Purchases', JSON.stringify(purchases));
  localStorage.setItem('Tab', JSON.stringify("Orders"));
  window.location.reload();
  e.preventDefault();
}