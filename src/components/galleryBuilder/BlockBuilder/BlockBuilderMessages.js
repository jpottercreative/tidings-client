import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setShowMessage } from '../../../reducers/blockMessageSlice'
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';

// this was added as a convenience, and sanity signal for the user
// should really be plugged into a global message system

function BlockBuilderMessages(  ) {
    const dispatch = useDispatch()
    // even though this plugs into its own global state it would be better
    // to wrap these items into a global message state

    const blockMessage = useSelector(state => state.blockMessage)

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(setShowMessage({message: "close", show: false} ))
        
      } 
    //   console.log(blockMessage)
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6}
         ref={ref} variant="filled" 
         {...props} 
         icon={<QueueOutlinedIcon  />} 
         color="pink"
         severity={"success"}/>;
      });
      const messageStyle = {
        backgroundColor: "#403033",
        fontSize: "1.5em",
        padding: "1rem",
        borderRadius: "3px",
        color:'lightgreen'
      }


  return (
    <>
        <Snackbar
        open={blockMessage.show}
        autoHideDuration={2000}
        onClose={handleClose}  
        >

                    <Alert >
                        {blockMessage.message}
                    </Alert>

        </Snackbar>
    </>
  )
}

export default BlockBuilderMessages