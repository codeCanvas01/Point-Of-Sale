import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined ,
  UserOutlined,
  HomeOutlined ,
  FileTextOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const { Header, Sider, Content } = Layout;
const DefaultLayout = ({children}) => {
  const {cartItems,loading} = useSelector(state => state.rootReducer)
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() =>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  },[cartItems])
  return (
    <Layout>
      {loading &&  <Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className="text-center text-light font-weight-bold mt-4">POS</h2>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={window.location.pathname}>
          <Menu.Item key="/" icon=<HomeOutlined />>
            <Link to="/" style={{textDecoration:"none"}}>Home</Link>
          </Menu.Item>
          <Menu.Item key="/bills" icon=<FileTextOutlined />>
            <Link to="/bills" style={{textDecoration:"none"}}>Bills</Link>
          </Menu.Item>
          <Menu.Item key="/items" icon=<UnorderedListOutlined />>
            <Link to="/items" style={{textDecoration:"none"}}>Items</Link>
          </Menu.Item>
           <Menu.Item key="/customers" icon=<UserOutlined />>
           <Link to="/customers" style={{textDecoration:"none"}}>Customers</Link>
         </Menu.Item>
         <Menu.Item key="/logout" icon=<LogoutOutlined/> onClick={() => {
          
          if(localStorage.getItem('auth')){
            localStorage.removeItem('auth');
            navigate('/login')
          }
        
         }}>
         Logout
       </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            boxShadow: "0 0 3px #ccc",
            overflow:"auto"
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
            <div className="cart-item " onClick={() => navigate('/cart') }>
              <p>{cartItems.length}</p>
              <ShoppingCartOutlined  />
            </div>

        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
            background: colorBgContainer,
          }}
        >
         {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
