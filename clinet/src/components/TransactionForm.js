import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import {useState} from "react";
import { create } from 'domain';

const InitialForm = {
  amount:0,
  description:'',
  date: new Date(),
};

export default function TransactionForm({fetchTransactions, editTransaction}) {
  const [form, setForm] = useState(InitialForm);

  React.useEffect(()=>{
    if(editTransaction !== {}){
      setForm(editTransaction);
    }
  }, [editTransaction]);
  
  function handleChange(e){
    setForm({ ... form, [e.target.name]:e.target.value})
  }

  function handleDate(newValue){
    setForm({...form, date:newValue})
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res = editTransaction === {} ? create(): update()
    }

    if(res.ok){
      setForm(InitialForm);
      fetchTransactions();
    }
  }

  async function create(){
    const res = await fetch('http://localhost:4000/transaction',{
      method: "POST",
      body: JSON.stringify(form),
      headers:{
        'content-type': "application/json",
      }
    });
    return res;
  }

  async function update(){
    const res = await fetch(`http://localhost:4000/transaction/${editTransaction._id}`,
    {
      method: "PATCH",
      body: JSON.stringify(form),
      headers:{
        'content-type': "application/json",
      }
    });
    return res;
  }

  return (
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>
      <Typography variant="h6">Add new transaction</Typography>
        
        <form onSubmit={handleSubmit}>
        <TextField 
        sx={{marginRight: 5}} 
        id="outlined-basic" 
        label="Amount" 
        size="small" 
        name="amount"
        variant="outlined" 
        value={form.amount} 
        onChange={handleChange}
        />
        <TextField 
        sx={{marginRight: 5}} 
        id="outlined-basic" 
        label="Description" 
        size="small" 
        name="description"
        variant="outlined" 
        value={form.description} 
        onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Transaction Date"
          inputFormat="MM/DD/YYYY"
          value={form.date}
          onChange={handleDate}
          renderInput={(params) => <TextField sx={{marginRight: 5}} size="small" {...params} />}
        />
         </LocalizationProvider>
         {editTransaction !== {} && (
          <Button type="submit" variant="secondary">Update</Button>
         )}
         {editTransaction === {} && (
          <Button type="submit" variant="contained">Submit</Button>
         )}
         
        </form>
        
      </CardContent>
    </Card>
  );
}