import React from 'react'
import BubbleUser from '../components/Bubble/BubbleUser'
import BubbleAI from '../components/Bubble/BubbleAI'

const Conversation = ({messages}) => {
    
  return (
    <div style={{padding: '8px',}}>
    { messages.map((message, index) => (
        message.sender === 'me' ? ( <BubbleUser key={index} message = { message.message }/> )
        :
        ( <BubbleAI  key={ index } message={ message.message }/> )
    ))}
  </div>
  )
}

export default Conversation