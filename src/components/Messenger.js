// i take in a color, an icon choice, and a string, and kick it off as an alert snackbar

import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux"
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { cancelMessage } from '../reducers/messageSlice'
import { cancelError } from '../reducers/errorSlice'
import NearbyErrorIcon from '@mui/icons-material/NearbyError';

function Messenger( ) {
  // the component is always mounted - is this bad?
  // listens for any changes to the message object and then displays them
  const currentUser = useSelector(state => state.user)
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)
  const dispatch = useDispatch()

  const handleClose = (e, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      message.show ? dispatch(cancelMessage()) : dispatch(cancelError())
    } 

    //use Alert for this because of the forwarding refs

  const MessageAlert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6}
     ref={ref} variant="filled" 
     {...props} 
     color={error.occurred ? "error" : "pink"}
     icon={message.show ? <AutoAwesomeOutlinedIcon/> : <NearbyErrorIcon/>} 
     
     />;
  });
console.log(error)
console.log(message)
  return (
    <>
        <Snackbar
                open={message.show || error.occurred}
                autoHideDuration={2000}
                onClose={handleClose}
                >
                  <MessageAlert>{message.text || error.text}</MessageAlert>
                  
        </Snackbar>
    </>
  )
}

export default Messenger