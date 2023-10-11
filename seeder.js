const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectdb = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");
require("colors")
//config

dotenv.config();

//seeder function

const importData = async () =>{
    try {
        await connectdb();
        await itemModel.deleteMany();
        const itemData = await itemModel.insertMany(items);
        console.log(`All items added Successfully`.bgGreen);
        process.exit();
    } catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
}

importData();