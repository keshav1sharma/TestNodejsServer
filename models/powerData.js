import mongoose from "mongoose";

const data = new mongoose.Schema(
    {
        powerConsumed: {
            type: String,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
    }
)

const powerData = mongoose.model("powerData",data);

export default powerData;