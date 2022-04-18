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

function Header() {
  const isDarkMode = useSelector(state => state.themeToggle.isDarkMode)
  const currentUser = useSelector(state => state.user)
  const [isSignUpShowing, setIsSignUpShowing] = useState(false)  


    
  const headerStyle = {
    backgroundColor: isDarkMode ? "#666" : "#222",

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