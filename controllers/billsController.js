const BillsModel = require("../models/BillsModel");

const addBillsController = async (req, res) => {
  try {
    const newBill = new BillsModel(req.body);
    await newBill.save();
    res.status(201).send(`New Bill Generated Successfully`);
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

const getBillsController = async (req, res) => {
  try {
    const bills = await BillsModel.find();
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addBillsController,
  getBillsController,
};
