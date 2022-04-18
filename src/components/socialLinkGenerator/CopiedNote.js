import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import Grid from '@mui/material/Grid';
import MuiAlert from '@mui/material/Alert';


function CopiedNote( { copied, setCopied } ) {


    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setCopied(false)
        // console.log("thanks")
      } 
    //   console.log(blockMessage)
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6}
         ref={ref} variant="filled" 
         {...props} 
         icon={<PeopleOutlineIcon  />} 
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
        open={copied}
        autoHideDuration={2000}
        onClose={handleClose}  
        >

                    <Alert >
                        copied, go share
                    </Alert>

        </Snackbar>
    </>
  )
}

export default CopiedNote