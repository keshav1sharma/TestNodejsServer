import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import powerData from "./models/powerData.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log(`Database connected`)})
.catch((err)=>{console.log(`Database connecting error ${err}`)});

app.get('/', (req,res)=>{
    res.send(`Server is Running`);
})

app.post('/data', async(req,res)=>{
    const data = req.body;
    console.log(data);
    const currPowerData = powerData(data);
    await currPowerData.save();
    res.json(data);
})

app.get('/getData', async(req,res)=>{
    const data = await powerData.find({});
    res.json(data);
})


app.listen(port , ()=>{
    console.log(`Server Running on port ${port}`);
})