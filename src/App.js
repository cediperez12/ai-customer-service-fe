import './App.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const App = () => {
  const [chats, setChats] = useState([])
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const input = useRef(null)

  useEffect(() => {
    input.current.focus()
  }, [isLoading])

  const sendMessage = (message, query) => {
    const newMessages = [
      {
        bubble: 'User',
        message: query,
      },
      {
        bubble: 'CHIM.AI',
        message: message,
      },
    ]

    setChats([...chats, ...newMessages])
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    console.log('submitted')
    console.log('text', text)

    getChimResponse(text)
  }

  const getChimResponse = async (text) => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `http://192.168.100.123:81/askchim?query=${text}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      )
      console.log('response', response)

      const { response: message, query } = response.data
      sendMessage(message, query)

      setText('')
    } catch (error) {
      console.log('error', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="title">
        <h1>CHIM.AI CUSTOMER SERVICE</h1>
      </div>
      <div className="chat-box">
        {chats.map((ch, index) => (
          <p key={index}>
            <b>{ch.bubble}: </b>
            {ch.message}
          </p>
        ))}
      </div>
      <div className="text-box">
        <form action="#" className="form" onSubmit={onSubmit}>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ask something to CHIM! Ex. How do I order?"
            value={text}
            ref={input}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  )
}

export default App
