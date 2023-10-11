import { Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultKayout';
const CustomerPage = () => {
  const [billsData, setBillsData] = useState([]);
  const dispatch = useDispatch();
  const getAllBills = async () => {
    try {
      dispatch({
        type: "show_loading",
      });
      const { data } = await axios.get("/api/bills/get-bills");
      setBillsData(data);
      dispatch({
        type: "hide_loading",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBills();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
    },
    {
      title: "Contact Number",
      dataIndex: "customerNumber",
    },
  
    
   
  ];
  return (
    <DefaultLayout>
        <Table columns={columns} dataSource={billsData} bordered />
    </DefaultLayout>
  )
}

export default CustomerPage
