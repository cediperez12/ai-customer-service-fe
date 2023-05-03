import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Conversation from './Conversation';
  
  export default function Chat() {

    // * Sample Data * ----------------
    const  [messages, setMessages] = React.useState([
      { message: "Hello! Puregold", sender: "me" },
      { message: "Hi there!", sender: "ai" },
      { message: "How are you doing today?", sender: "ai" },
      { message: "I'm doing great, thanks for asking!", sender: "me" },
      { message: "That's great to hear.", sender: "ai" },
      { message: "How do I place an order in Puregold Mobile App?", sender: "me" },
      { message: `Step 1: Select the store.
      Step 2: Scan or search the item.
      Step 3: Review the details of your order before placing your order then click the "Check-out" button
      Step 4: Select mode of payment then click the "Place Order" button
      Note: For online payment: Wait for the SMS notification to complete the transaction by clicking the "Pay Now" button`, sender: "ai" },
      { message: "Thank you!", sender: "me" },
    ]);
   

    const [newMessage, setNewMessage] =  React.useState('');
   
    const handleSendMessage = () => {
      const newMessages = [...messages, { message: newMessage, sender: 'me'}]
      setMessages(newMessages);
      setNewMessage('');
    }

    const handleEnterKey = (event, message) => {
      if(event.keyCode === 13){
        handleSendMessage()
      }
    }

    const windowRef = React.useRef(null);
    React.useEffect(() => {
      windowRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
      <React.Fragment>
        <CssBaseline />
        <Box sx={{
              position: 'absolute', 
              bottom: '0', 
              right: '0',
              marginRight: 2,
              display: "flex",
              height: 570,
              backgroundColor: '#F5F5F9',
              width: 380,
              flexDirection: "column",
        }}>
      
          <Box sx={{
              display: "flex",
              height: 'auto',
              width: 'auto',
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
              '&::-webkit-scrollbar': { display: 'none' },
              overflowY: "scroll",
        }}>
          <AppBar position='sticky' style={{marginBottom: '20px'}}>
            <Toolbar style={{backgroundColor: '#014F41'}}>
              <SupportAgentIcon/> <span> &nbsp; </span>
              <Typography variant="h6" component="div">
                Chat Support
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Conversation */}
           <Conversation messages = { messages }/>
           <div ref={windowRef}/>

          </Box>
         
          <TextField  sx={{ margin: 1, color:'#ffffff'}} 
                    className  = 'textField'
                    value      = { newMessage }
                    onKeyDown  = { handleEnterKey }
                    label      = 'Chat here' 
                    onChange   = { (e) => { setNewMessage(e.target.value) }}
                    InputProps = {{
                      endAdornment:(
                        <InputAdornment position = 'end'>
                        <IconButton edge = 'start'   onClick ={ handleSendMessage }>
                          { <SendIcon  /> }
                        </IconButton>
                      </InputAdornment>
                                ) 
                }}/>
          </Box>
      </React.Fragment>
    );
  }