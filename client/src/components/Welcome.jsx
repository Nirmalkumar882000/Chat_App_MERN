import React from 'react'
import styled from 'styled-components'
import robot from "../assets/robot.gif"

const Welcome = ({currentUser}) => {
  return (
   <Container>
        <img src={robot} alt='image'/>
        <h1>Welcome ,<span>{currentUser.username}</span></h1>
        <h3>Please select to charting from the Messaging</h3>
   </Container>
  )
}

const Container =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    img{
        height: 20rem;
    }
    span{
    color: #4e00ff;
    text-transform: capitalize;
    }

`

export default Welcome

