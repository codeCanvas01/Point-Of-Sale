import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/DefaultKayout";
import axios from "axios";
import { Button, Table, Modal, Form, Input, Select, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

const ItemPage = () => {
  const [itemData, setItemData] = useState([]);
  const [itemModal, setItemModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const dispatch = useDispatch();
  const getAllItems = async () => {
    try {
      dispatch({
        type: "show_loading",
      });
      const { data } = await axios.get("/api/items/get-item");
      setItemData(data);
      dispatch({
        type: "hide_loading",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      title: "Actions",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="d-flex gap-4">
          <EditOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              setEditItem(record);
              setItemModal(true);
            }}
          />
          <DeleteOutlined
            style={{ cursor: "pointer" }}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  const handleSubmit = async (value) => {
    if (editItem === null) {
      try {
        dispatch({
          type: "show_loading",
        });
        await axios.post("/api/items/add-item", value);
        message.success("Item Added Successfully");
        getAllItems();
        setItemModal(false);
        dispatch({
          type: "hide_loading",
        });
      } catch (error) {
        message.error("Error In Adding Item");
        console.log(error);
      }
    } else {
      try {
        dispatch({
          type: "show_loading",
        });
        await axios.put("/api/items/edit-item", {
          ...value,
          itemId: editItem._id,
        });
        message.success("Item Updated Successfully");
        getAllItems();
        setItemModal(false);
        dispatch({
          type: "hide_loading",
        });
      } catch (error) {
        message.error("Error In Updating Item");
        console.log(error);
      }
    }
  };

  const handleDelete = async (record) => {
    try {
      dispatch({
        type: "show_loading",
      });
      await axios.post("/api/items/delete-item", { itemId: record._id });
      message.success("Item Deleted Successfully");
      getAllItems();
      setItemModal(false);
      dispatch({
        type: "hide_loading",
      });
    } catch (error) {
      message.error("Error In Deleting Item");
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setItemModal(true)}>
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered />
      {itemModal && (
        <Modal
          title={`${editItem !== null ? "Edit Item" : "Add New Item"}`}
          open={itemModal}
          onCancel={() => {
            setItemModal(false);
            setEditItem(null);
          }}
          footer={false}
        >
          <Form
            layout="vertical"
            initialValues={editItem}
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Price">
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image Url">
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="rice">Rice</Select.Option>
                <Select.Option value="noodels">Noodels</Select.Option>
              </Select>
            </Form.Item>

            <div className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      )}
    </DefaultLayout>
  );
};

export default ItemPage;
