const mongoose = require("mongoose");
require("colors");


//connect db

const connectdb = async () => {
try {
    const mongoConnection = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology:true,
        
    });
    console.log(`MongoDB COnnected to ${mongoConnection.connection.host}`.bgYellow)
} catch (error) {
    console.log(`Error : ${error.message}`.bgRed);
    process.exit(1);
}
}

module.exports = connectdb
