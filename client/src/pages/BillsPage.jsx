import React, { useEffect, useState, useRef } from "react";
import DefaultLayout from "../components/DefaultKayout";
import axios from "axios";
import "../styles/BillsStyle.css";
import { Table, Modal, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useReactToPrint } from 'react-to-print';
const BillsPage = () => {
  const [billsData, setBillsData] = useState([]);
  const [itemModal, setItemModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const componentRef = useRef();
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
    {
      title: "Sub Total",
      dataIndex: "subTotal",
    },
    {
      title: "GST",
      dataIndex: "tax",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="">
          <EyeOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedBill(record);
              setItemModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Invoice List</h1>
      </div>
      <Table columns={columns} dataSource={billsData} bordered />
      {itemModal && (
        <Modal
          title="Invoice Details"
          open={itemModal}
          onCancel={() => {
            setItemModal(false);
          }}
          footer={false}
        >
          <div id="invoice-POS" ref={componentRef} >
            <center id="top">
              <div className="logo" />
              <div className="info">
                <h2>Muhammad Usama</h2>
                <p>Contact : 0346-1234567 | Hafizabad</p>
              </div>
              {/*xEnd Infox*/}
            </center>
            {/*End InvoiceTop*/}
            <div id="mid">
              <div className="mt-2">
                <p>
                  Customer Name : <b>{selectedBill.customerName}</b>
                  <br />
                  Phone No : <b>{selectedBill.customerNumber}</b>
                  <br />
                  Date : <b>{selectedBill.date.toString().substring(0, 10)}</b>
                  <br />
                </p>
                <hr style={{ margin: "5px", borderWidth: 1 }} />
              </div>
            </div>

            <div id="bot">
              <div id="table">
                <table>
                  <tbody>
                    <tr className="tabletitle">
                      <td className="item">
                        <h2>Item</h2>
                      </td>
                      <td className="Hours">
                        <h2>Qty</h2>
                      </td>
                      <td className="Rate">
                        <h2>Price</h2>
                      </td>
                      <td className="Rate">
                        <h2>Total</h2>
                      </td>
                    </tr>
                    {selectedBill.cartItems.map((item) => (
                      <>
                        <tr className="service">
                          <td className="tableitem">
                            <p className="itemtext">{item.name}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.quantity}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">{item.price}</p>
                          </td>
                          <td className="tableitem">
                            <p className="itemtext">-</p>
                          </td>
                        </tr>
                      </>
                    ))}

                    <tr className="tabletitle">
                      <td></td>
                      <td></td>
                      <td className="Rate">
                        <h2>tax</h2>
                      </td>
                      <td className="payment"></td>
                    </tr>
                    <tr className="tabletitle">
                      <td></td>
                      <td></td>
                      <td className="Rate">
                        <h2>Grand Total</h2>
                      </td>
                      <td className="payment">
                        <h2>
                          <b>${selectedBill.totalAmount}</b>
                        </h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="legalcopy">
                <p className="legal">
                  <strong>Thank you for your order!</strong> 10% GST application
                  on total amount. Please note that this is a non-refundable
                  amount. For any assistance, please write an email to{" "}
                  <b>help@amydomain.com</b>.
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button type="primary" onClick={handlePrint}>Print</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default BillsPage;
