import React, { useEffect } from 'react'
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
   const  handleSubmit = async (value) => {
    try {
        dispatch({
          type: "show_loading",
        });
        const res = await axios.post("/api/users/login", value);
        localStorage.setItem('auth', JSON.stringify(res.data))
        message.success("User Login Successfully");
        navigate('/')
        dispatch({
          type: "hide_loading",
        });
      } catch (error) {
        message.error("Error In Login User");
        console.log(error);
      }
  
   }

   useEffect(() => {
    if(localStorage.getItem('auth')){
      localStorage.getItem('auth');
      navigate('/');
    }
   },[navigate])

   
  return (
    <>
    <div className="register">
     <div className='register-form'>
     <h1>POS APP</h1>
      <h3>Login Page</h3>
       
      <Form
            layout="vertical"
            onFinish={handleSubmit}
          >
        
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item type="password" name="password" label="Password">
              <Input />
            </Form.Item>
        

            <div className="d-flex justify-content-between">
              <p>
                Don't Have An Account? 
                 <Link to='/register' >   Register </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>

     </div>
    </div>
    
    
    </>
  )
}

export default LoginPage
