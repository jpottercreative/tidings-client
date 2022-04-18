import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { setShowMessage } from '../../../reducers/blockMessageSlice'
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';


function BlockBuilderMessages(  ) {
    const dispatch = useDispatch()
    const blockMessage = useSelector(state => state.blockMessage)

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        dispatch(setShowMessage({message: "close", show: false} ))
        // console.log("thanks")
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