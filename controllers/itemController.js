const itemModel = require("../models/itemModel");

//get item controller
const getItemController = async (req, res) => {
  try {
    const items = await itemModel.find();
    res.status(200).send(items);
  } catch (error) {
    console.log(error);
  }
};
//add item controller
const addItemController = async (req, res) => {
  try {
    const addItem = new itemModel(req.body);
    await addItem.save();
    res.status(201).send(`Item Added Successfully`);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//update item controller

const editItemController = async (req, res) => {
  try {
    await itemModel.findOneAndUpdate({ _id: req.body.itemId }, req.body);
    res.status(201).send(`Item Updated Successfully`);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//delete item controller

const deleteItemController = async (req, res) => {
  try {
    const {itemId} = req.body
    await itemModel.findOneAndDelete({ _id: itemId });
    res.status(200).send(`Item Deleted Successfully`);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

module.exports = {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
};
