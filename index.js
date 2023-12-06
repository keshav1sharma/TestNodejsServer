import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send(`Server is Running`);
})

app.post('/data', (req,res)=>{
    const data = req.body;
    res.json(data);
})


app.listen(port , ()=>{
    console.log(`Server Running on port ${port}`);
})