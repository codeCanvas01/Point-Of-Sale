import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultKayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
const CartPage = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [openBill, setOpenBill] = useState(false)
  const { cartItems } = useSelector((state) => state.rootReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIncrement = (record) => {
    
      dispatch({
        type: "change",
        payload: { ...record, quantity: record.quantity + 1 },
      });
    
    
  };
  const handleDecrement = (record) => {
    if(record.quantity !== 1){
      dispatch({
        type: "change",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
    
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} height="60" width="60" />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (_id, record) => (
        <div>
          <PlusCircleOutlined
            className="mx-3"
            style={{ cursor: "pointer" }}
            onClick={() => handleIncrement(record)}
          />
          <b>{record.quantity}</b>
          <MinusCircleOutlined className="mx-3" style={{ cursor: "pointer" }}
          onClick={() => handleDecrement(record)} 
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => <DeleteOutlined style={{ cursor: "pointer" }}
      onClick={() => dispatch({
        type:'delete',
        payload:record
      })} />,
    },
  ];

  useEffect(() => {
    let temp= 0;
    cartItems.forEach((item) => temp = temp + (item.price * item.quantity))
    setSubTotal(temp)
  },[cartItems])

  const handleSubmit = async (value) => {
    try {
      const newObject = {
        ...value,
        cartItems,
        subTotal,
        tax: Number(((subTotal/100) * 10).toFixed(2)),
        totalAmount: Number(Number(subTotal) + Number(((subTotal/100) * 5).toFixed(2))),
        userId: JSON.parse(localStorage.getItem('auth'))
       }
       await axios.post('./api/bills/add-bills', newObject)
       message.success('Bill Generated Successfully')
       navigate('/bills')
    } catch (error) {
      console.log(error)
      message.error('Something went wrong')
    }
    
  }

  return (
    <DefaultLayout>
      <Table columns={columns} dataSource={cartItems} bordered />
      <div className="d-flex align-item-end flex-column">
        <hr/>
        <h3>
          SUB TOTAL : $ <b>{subTotal}</b>
        </h3>
        <div className="d-flex justify-content-end">
        <Button type="primary" onClick={() => setOpenBill(true) }>Generate Bill</Button>
        </div>
       
      </div>
      <Modal title='Your Invoice' footer={false} open= {openBill} onCancel={() => setOpenBill(false)}>
      <Form
            layout="vertical"
           
            onFinish={handleSubmit}
          >
            <Form.Item name="customerName" label="Customer Name">
              <Input />
            </Form.Item>
            <Form.Item name="customerNumber" label="Customer Contact">
              <Input />
            </Form.Item>
           
            <Form.Item name="paymentMode" label="Payment Method">
              <Select>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="card">Card</Select.Option>
               
              </Select>
            </Form.Item>
            <div className="bill-total">
              <h5>
                SUB TOTAL : <b>{subTotal}</b>
              </h5>
              <h4>GST: <b>{((subTotal/100) * 10).toFixed(2)}</b></h4>
              <h3>
                GRAND TOTAL: <b>{Number((subTotal)) + Number(((subTotal/100) * 10).toFixed(2))}</b>
              </h3>
            </div>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit" >
                Generate Bill
              </Button>
            </div>
          </Form>
       

       </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
