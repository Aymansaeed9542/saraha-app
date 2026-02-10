import express from 'express'
import {port}  from '../config/env.service.js';
import { connectDB } from './database/connection.js';

export const bootstrap = async ()=>{
const app = express();
await connectDB() // use await with any work with database
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('{*dummy}',(req,res)=>{
    res.status(404).json('invalid route')}) //check if the route is valid or not


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

}