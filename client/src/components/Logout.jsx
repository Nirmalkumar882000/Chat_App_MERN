import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {BiPowerOff} from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate =useNavigate();
    const handleClick =()=>{
        localStorage.clear();
        navigate("/login");
    }

  return (
    <Button onClick={handleClick}>
        <BiPowerOff/>
    </Button>
  )
}


const Button=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #9a86f3;
    border: none;
    cursor: pointer;
`

export default Logout
