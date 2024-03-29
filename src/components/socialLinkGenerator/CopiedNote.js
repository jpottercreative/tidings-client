import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'
import MuiAlert from '@mui/material/Alert';

// this just generates a messsage with a snackbar that confirms
// you copied your text - not needed, just a nice user-sanity check
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