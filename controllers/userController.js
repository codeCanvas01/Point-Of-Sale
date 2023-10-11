const userModel = require("../models/userModel");

//get item controller
const loginController = async (req, res) => {
  try {
    const {userId , password} =req.body;
    const user = await userModel.findOne({userId,password, verified:true});
    if(user){
      res.status(200).send("Login Successfully")
    }else{
      res.json({
        message:"Login Failed",
        user,
      })
    }
    
  } catch (error) {
    console.log(error);
  }
};
//add item controller
const registerController = async (req, res) => {
  try {
    const newUser = new userModel({...req.body, verified:true });
    await newUser.save();
    res.status(201).send(`Register Successfully`);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports ={
    loginController,
    registerController
}