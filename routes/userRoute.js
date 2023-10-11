const express = require("express");
const {
  registerController,
  loginController,
 
  
} = require("./../controllers/userController");

const router = express.Router();

//routes

//post method
router.post("/login", loginController);

//post method

router.post("/register", registerController);



module.exports = router;
