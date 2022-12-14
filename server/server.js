import express from 'express';
import connect from './database/mongodb.js'
import cors from 'cors';
import bodyParser from 'body-parser';
import TransactionsApi from "./routes/TransactionsApi.js";

const PORT = 4000
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("hello world");
});

app.use("/transaction", TransactionsApi);

await connect();

app.listen(PORT, ()=>{
    console.log("Server is running at http://localhost:4000");
});