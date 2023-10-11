const express = require("express");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {bgMagenta} = require("colors");
const path = require("path");
require("colors");
const connectdb = require("./config/config")
dotenv.config()
connectdb();


//rest Object


const app = express()

app.use(cors())
app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extented:false}))
app.use(morgan("dev"))


// STATIC FOLDER
app.use(express.static(path.join(__dirname, "./client/build")));

// STATIC ROUTES
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});




//routes

app.use("/api/items", require("./routes/itemRoute"))
app.use("/api/users", require("./routes/userRoute"))
app.use("/api/bills", require("./routes/billsRoute"))

//PORT

const PORT = process.env.PORT || 8080;


//listen port

app.listen(PORT, () =>{
    console.log(`Server is running on the posrt ${PORT}`.bgMagenta.white)
})