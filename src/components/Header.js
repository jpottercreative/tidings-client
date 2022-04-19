import React, { useState } from 'react'
import { Box } from '@mui/material'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LogOut from '../components/LogOut';
import { useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import ModeSwitch from '../components/ModeSwitch';
import { NavLink, Navigate } from "react-router-dom";
import NavButtons from './NavButtons';

// just a header - holds our nav bar mostly
// has three things related to nav:
// navButtons, logout, modeswitch (for dark/lightmode changeover)
// make this as minimal as possible - but maybe this would be a good place
// to do our login/token auth as this is rendered on every page
// or is that annoying to do an auth call on EVERY render/load? - ask around

function Header() {
  const isDarkMode = useSelector(state => state.themeToggle.isDarkMode)
  const currentUser = useSelector(state => state.user)
  const [isSignUpShowing, setIsSignUpShowing] = useState(false)  

  const headerStyle = {
    backgroundColor: isDarkMode ? "#666" : "#222",
    borderRadius: "3px 3px 0px 0px",
  }


    return (
      <Stack 
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      className="header" 
      sx={headerStyle}>
        <NavButtons/>
        <LogOut/>
        <ModeSwitch />

        
    
    </Stack>  
  )
}

export default Header