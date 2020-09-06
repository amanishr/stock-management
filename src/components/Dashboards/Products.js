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
export default function Products() {
  return (
    <React.Fragment>
      <Title>Product Details</Title>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Manufacture Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Made in</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadRows()}
        </TableBody>
      </Table>
      <Divider></Divider>
      {addProduct()}
      <Divider></Divider>
      {updateProduct()}
      <Divider></Divider>
      {deleteProduct()}
    </React.Fragment>
  );
}

function loadRows(){
  let rows = JSON.parse(localStorage.getItem('Products'));
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

function addProduct(){
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
          label="Made in"
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
          onClick={addItem}
      >
          Add Item
      </Button>
      </Grid>
    </Grid>
  );
}

function updateProduct(){
  return(
    <Grid container sm>
      <Grid item>
      <TextField
          name="Id"
          variant="outlined"
          required
          id="updateId"
          type="Id"
          label="Product Id"
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
          onClick={updateItem}
      >
          Update Item
      </Button>
      </Grid>
    </Grid>
  );
}

function deleteProduct(){
  return(
    <Grid>
      <Grid item>
      <TextField
          name="deleteId"
          variant="outlined"
          required
          id="deleteId"
          type="Id"
          label="Product Id"
      />
      </Grid>
      <Grid item>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          center="true"
          onClick={deleteItem}
      >
          Delete Item
      </Button>
      </Grid>
    </Grid>
  );
}

function addItem(e){
  let name = document.getElementById('Name').value;
  let date = document.getElementById('Date').value;
  let add = document.getElementById('Address').value;
  let price = document.getElementById('Price').value;
  let Products = JSON.parse(localStorage.getItem('Products'));
  let productMaxId = JSON.parse(localStorage.getItem('productMaxId'));
  if(Products===null)
    Products = [];
  if(productMaxId===null)
    productMaxId = 0;
  productMaxId += 1;
  let id = productMaxId;
  let row = {id, date, name, add, price};
  Products.push(row);
  localStorage.setItem('Products', JSON.stringify(Products));
  localStorage.setItem('productMaxId', JSON.stringify(productMaxId));
  localStorage.setItem('Tab', JSON.stringify("Products"));
  window.location.reload();
  e.preventDefault();
}

function updateItem(e){
  let id = document.getElementById('updateId').value;
  let name = document.getElementById('updateName').value;
  let date = document.getElementById('updateDate').value;
  let add = document.getElementById('updateAddress').value;
  let price = document.getElementById('updatePrice').value;
  let row = {id, date, name, add, price};
  let Products = JSON.parse(localStorage.getItem('Products'));
  console.log(row);
  let done = false;
  if(Products===null)
    Products = [];
  for(let i=0; i<Products.length; i++){
    if(Products[i].id==id){
      Products.splice(i,1,row);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Product Id');
    return;
  }
  localStorage.setItem('Products', JSON.stringify(Products));
  localStorage.setItem('Tab', JSON.stringify("Products"));
  window.location.reload();
  e.preventDefault();
}

function deleteItem(e){
  let id = document.getElementById('deleteId').value;
  let Products = JSON.parse(localStorage.getItem('Products'));
  let done = false;
  if(Products===null)
    Products = [];
  for(let i=0; i<Products.length; i++){
    if(Products[i].id==id){
      Products.splice(i,1);
      done = true;
    }
  }
  if(!done){
    alert('Wrong Product Id');
    return;
  }
  localStorage.setItem('Products', JSON.stringify(Products));
  localStorage.setItem('Tab', JSON.stringify("Products"));
  window.location.reload();
  e.preventDefault();
}