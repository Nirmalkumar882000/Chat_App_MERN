import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../utils/apiRoutes";

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: '',
    password: "",
    confirmPassword: '',

  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   if( handleValidation()){
    const {password,username,email} = values;
    const {data} = await axios.post(registerRoute,{
      username,
      email,
      password,
    });
    if(data.status === false){
      toast.error(data.msg, toastOptions);
    } else {
      console.log(data.user)
      localStorage.setItem('chat-app-user',JSON.stringify(data.user));
      navigate("/");
    }
   };
  };

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  },[] );

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () =>{
    const {password, confirmPassword, username, email} = values;
    if(password!==confirmPassword){
      toast.error("Enter correct Confirm Password!", toastOptions);
      return false;
    } else if(username.length < 3){
      toast.error("Username must be atleast 3 characters.", toastOptions);
      return false;
    } else if(password.length < 4){
      toast.error("Password must be atleast 4 characters.", toastOptions);
      return false;
    } else  if(email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
    }


  return (
    <>
      <FormContainer className="">
        <form onSubmit={(e)=>handleSubmit(e)} className="">
          <div className="brand">
            <img src={logo} alt="logo" />
            <h1>LChat</h1>
          </div>
          <input type="text" className="" placeholder="username" name="username" onChange={(e)=>handleChange(e)} />
          <input type="email" className="" placeholder="email" name="email" onChange={(e)=>handleChange(e)} />
          <input type="password" className="" placeholder="password" name="password" onChange={(e)=>handleChange(e)} />
          <input type="password" className="" placeholder="confirm password" name="confirmPassword" onChange={(e)=>handleChange(e)} />
          <button type="submit">Create User</button>
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color:  #e3f0f3;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      margin: 5px;
    }
    h1 {
      color: #fff;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    background-color: #A1D6E2;
    border-radius: 2rem;
    padding: 5rem 6rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.2rem solid #1995AD;
    border-radius: 0.4rem;
    color: #ffffff;
    width: 100%;
    font-size: 1.3rem;
    margin-top:1rem;
    &:focus {
      border: 0.1rem solid #212729;
      outline: none;
    }
  }
  button {
    background-color: #1995AD;
    color: white;
    margin-top:1rem;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #3d12b3;
    }
  }
  span {
    margin-top: 1.5rem;
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register;
