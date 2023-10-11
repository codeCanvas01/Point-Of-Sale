import React, { useEffect } from 'react'
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const RegisterPage = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: "show_loading",
      });
      await axios.post("/api/users/register", value);
      message.success("User Register Successfully");
      navigate('/login')
      dispatch({
        type: "hide_loading",
      });
    } catch (error) {
      message.error("Error In Registering User");
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
      <h3>Register Page</h3>
       
      <Form
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item type="password" name="password" label="Password">
              <Input />
            </Form.Item>
        

            <div className="d-flex justify-content-between">
              <p>
                Already Have An Account? 
                 <Link to='/login' >   Login! </Link>
              </p>
              <Button type="primary" htmlType="submit">
                Signup
              </Button>
            </div>
          </Form>

     </div>
    </div>
    
    
    </>
  )
}

export default RegisterPage
