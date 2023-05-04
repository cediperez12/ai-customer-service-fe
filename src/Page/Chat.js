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
import axios from 'axios';
import loadingGif from '../assets/loading.gif'  
  export default function Chat() {

    // * Sample Data * ----------------
    const  [messages, setMessages] = React.useState([]);

    const [newMessage, setNewMessage] =  React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
   
    const handleSendMessage = () => {
      getChimResponse();
      setNewMessage('');
    }

    // * Enter key bind  * ----------------
    const handleEnterKey = (event) => {
      if(event.keyCode === 13 && newMessage.length > 0){
        handleSendMessage()
      }
    }

    // * Auto scroll * ----------------
    const windowRef = React.useRef(null);
    React.useEffect(() => {
      windowRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

  const getChimResponse = async (text) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://dcb5-2001-4451-70f-2600-b045-e289-ff25-367.ngrok-free.app/askchim?query=` + newMessage,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      console.log('response', response.data)
      setMessages([...messages, response.data]);
      setIsLoading(false);
     
    } catch (error) {
      console.log('error', error)
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  // React.useEffect(() => {
  //   console.log(messages);
  // },[messages])

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

          {/* ---------------- *  Conversation  * ---------------- */}
           <Conversation messages = { messages }/>
           <div ref={windowRef}/>
         {/* <Box sx={{display: "flex", justifySelf:'flex-end', right: 'auto', left:'auto', width: 380, bottom: 0, position:'fixed',}}> */}
         <TextField  sx={{  color:'#ffffff'}} 
                  className  = 'textField'
                  disabled = { isLoading ?  true : false }
                  value      = { newMessage }
                  onKeyDown  = { handleEnterKey }
                  label      = 'Chat here'
                  fullWidth
                  onChange   = { (e) => { setNewMessage(e.target.value) }}
                  InputProps = {{
                    endAdornment:(
                      <InputAdornment position = 'end'>
                      <IconButton edge = 'start'   onClick ={ handleSendMessage } disabled = { newMessage ?  false : true }>
                        {isLoading ? <img src={loadingGif} style={{width: 50, height: 50}} alt='loading'/>  : <SendIcon style={{ color: newMessage ? '#014F41' : '#828F8D'}} /> }
                      </IconButton>
                    </InputAdornment>
                              ) 
              }}/>
         {/* </Box> */}
          
          </Box>
         
        
          </Box>
      </React.Fragment>
    );
  }