import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';


function HomePage() {
const [isSignUpShowing, setIsSignUpShowing] = useState(false)

function toggleSignUpClick(){
    setIsSignUpShowing((isSignUpShowing) => isSignUpShowing = !isSignUpShowing)
  }

  const VarTextAlreadyLoggedIn = () => {
     return "You're already logged in! - log out first"
  }
  const VarTextLoginPlz = () => {
    return "You need to login"
  }
  
  const FadingLoginPlzText = () => {
    return (
    <Fade in={!isSignUpShowing}>
      <Box>
        <VarTextLoginPlz />
      </Box>
    </Fade>
    )
  }

  const FadingAlreadyLoggedInText = () => {
    return (
    <Fade in={isSignUpShowing}>
      <Box>
        <VarTextAlreadyLoggedIn />
      </Box>
    </Fade>
  )
  }
const homeComponents = {
  padding: "1em",
  // backgroundColor: "pink"
}


const homeElevation = 0
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid container
      gap={3}
      direction="row"
      justifyContent="center">
        <Grid item xs={12}>
          <Paper style={homeComponents} elevation={homeElevation}>
            <Typography variant="overline" component="h1">welcome to tidings</Typography>
            </Paper>
        </Grid>
        <Paper style={homeComponents} elevation={homeElevation}>
        <Grid container
          spacing={1}
          gap={1}
          direction="column"
          justifyContent="space-around"
          alignItems="center">
            <Grid item xs={12}>
                {isSignUpShowing ? <SignUp/> : <Login/> }
            </Grid>
            <Grid item xs={12} sx={{color: "white"}} >
              <Button fullWidth variant="contained" onClick={toggleSignUpClick} id="sign_up_toggle" color={isSignUpShowing ? "lightblue" : "pink"}> {isSignUpShowing ? "Log in instead" : "Sign up instead"}</Button>
            </Grid>
          
        </Grid>
          </Paper>
      </Grid>
    </Box>
  )
}

export default HomePage