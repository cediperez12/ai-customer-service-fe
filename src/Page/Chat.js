import * as React from 'react'
import {
  Box,
  CssBaseline,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material'
import {
  SupportAgent as SupportAgentIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send'
import Conversation from './Conversation'

import axios from 'axios'
import loadingGif from '../assets/loading.gif'

export default function Chat() {
  // * Sample Data * ----------------
  const [messages, setMessages] = React.useState([])
  const [newMessage, setNewMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSendMessage = () => {
    getChimResponse()
    setNewMessage('')
  }

  // * Enter key bind  * ----------------
  const handleEnterKey = (event) => {
    if (event.keyCode === 13 && newMessage.length > 0) {
      handleSendMessage()
    }
  }

  // * Auto scroll * ----------------
  const windowRef = React.useRef()
  React.useEffect(() => {
    if (!windowRef.current) return
    windowRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getChimResponse = async (text) => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `https://dcb5-2001-4451-70f-2600-b045-e289-ff25-367.ngrok-free.app/askchim?query=` +
          newMessage,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      console.log('response', response.data)
      setMessages([...messages, response.data])
      setIsLoading(false)
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  // React.useEffect(() => {
  //   console.log(messages);
  // },[messages])

  return (
    <React.Fragment>
      <CssBaseline />
      <IconButton
        onClick={() => {
          setIsOpen((current) => !current)
        }}
        size="large"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: '#014F41',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#014F41',
          },
        }}
      >
        {isOpen ? <ExpandMoreIcon /> : <SupportAgentIcon />}
      </IconButton>
      {isOpen && (
        <Box
          sx={{
            position: 'fixed',
            mb: 10,
            bottom: 0,
            right: 16,
            transition: 'all 0.3s ease-in-out',
            transform: `translateY(${isOpen ? 0 : '100%'})`,
            display: 'flex',
            height: 500,
            backgroundColor: '#f9f9f5',
            width: 350,
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor: '#014F41',
              }}
            >
              <Box sx={{ mr: 2 }}>
                <SupportAgentIcon fontSize={'large'} />
              </Box>
              <Typography variant="h6">Chat Support</Typography>
            </Toolbar>
          </AppBar>

          {/* ---------------- *  Conversation  * ---------------- */}
          <Box
            sx={{
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 700,
              overflow: 'hidden',
              overflowY: 'scroll',
            }}
          >
            <Conversation messages={messages} />
            <div ref={windowRef} />
          </Box>

          <TextField
            sx={{ color: '#ffffff', mt: '1px', py: 1, px: 1 }}
            className="textField"
            disabled={isLoading ? true : false}
            value={newMessage}
            onKeyDown={handleEnterKey}
            label="Chat here"
            fullWidth
            onChange={(e) => {
              setNewMessage(e.target.value)
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="start"
                    onClick={handleSendMessage}
                    disabled={newMessage ? false : true}
                  >
                    {isLoading ? (
                      <img
                        src={loadingGif}
                        style={{ width: 50, height: 50 }}
                        alt="loading"
                      />
                    ) : (
                      <SendIcon
                        style={{ color: newMessage ? '#014F41' : '#828F8D' }}
                      />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </React.Fragment>
  )
}
