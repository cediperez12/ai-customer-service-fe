import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import BubbleUser from '../components/Bubble/BubbleUser';
import BubbleAI from '../components/Bubble/BubbleAI';
import FormControl from '@mui/material/FormControl';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
  
  export default function Chat(props) {
    const sampleMessage = `Step 1: Select the store.
    Step 2: Scan or search the item.
    Step 3: Review the details of your order before placing your order then click the "Check-out" button
    Step 4: Select mode of payment then click the "Place Order" button
    Note: For online payment: Wait for the SMS notification to complete the transaction by clicking the "Pay Now" button`;
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
              <Typography variant="h6" component="div">
                Chat Support
              </Typography>
            </Toolbar>
          </AppBar>
        {/* Conversation */}
           <BubbleUser message={'How do I place an order in Puregold Mobile App?'}/>
           <BubbleAI message={sampleMessage}/>
           <BubbleAI message={sampleMessage}/>
          
          </Box>
          <FormControl fullWidth sx={{ m: 1 }}>
          <TextField  sx={{ margin: 1, color:'#ffffff'}} 
                    className  = 'textField' 
                    label      = 'Chat here' 
                    // onChange   = {(e) => {}}
                    InputProps = {{
                      endAdornment:(
                        <InputAdornment position = 'end'>
                        <IconButton edge = 'start'>
                          { <SendIcon /> }
                        </IconButton>
                      </InputAdornment>
                                )
         }}/>
          </FormControl>

          </Box>
      
      </React.Fragment>
    );
  }