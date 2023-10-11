const express = require("express");
const {
 
  addBillsController,
  getBillsController,
  
  
} = require("./../controllers/billsController");

const router = express.Router();

//routes

//post method

router.post("/add-bills", addBillsController);

//get method

router.get("/get-bills", getBillsController);


module.exports = router;
