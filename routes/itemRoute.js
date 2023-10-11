const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
  
} = require("./../controllers/itemController");

const router = express.Router();

//routes

//get method
router.get("/get-item", getItemController);

//post method

router.post("/add-item", addItemController);

//put method

router.put("/edit-item", editItemController);

//delete item

router.post("/delete-item", deleteItemController);

module.exports = router;
