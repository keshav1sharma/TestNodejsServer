import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import powerData from "./models/powerData.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { url } from "inspector";

dotenv.config();

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log(`Database connected`) })
    .catch((err) => { console.log(`Database connecting error ${err}`) });

app.get('/', (req, res) => {
    res.send(`Server is Running`);
})

app.get('/chart', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/getChartData', async (req, res) => {
    try {
        const data = await powerData.find();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/data', async (req, res) => {
    const data = req.body;
    console.log(data);
    const currPowerData = powerData(data);
    await currPowerData.save();
    res.json(data);
})

app.get('/getData', async (req, res) => {
    const data = await powerData.find({});
    res.json(data);
})


app.listen(port, () => {
    console.log(`Server Running on port ${port}`);
})