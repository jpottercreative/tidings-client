import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { toggleDarkMode } from "../reducers/themeToggleSlice"
import LightIcon from '@mui/icons-material/Light';
import LightOutlinedIcon from '@mui/icons-material/LightOutlined';

// i change the app from light to dark mode
// color mode is held in redux, so it just triggers the global state
// coolest thing here is that the icon switches from lights on to lights out when you change modes (:

function ModeSwitch( ) {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.themeToggle.isDarkMode)

  function handleDarkmodeToggle() {
    dispatch(toggleDarkMode())
  }
  // console.log(isDarkMode)
  

  
  return (
    <Box>
        <Button onClick={handleDarkmodeToggle} variant='outline'>
        {isDarkMode ? <LightIcon sx={{ color: "#FEC0CA" }}/> : <LightOutlinedIcon sx={{ color: "#FEC0CA" }}/>}
        </Button>
    </Box>
  )
}

export default ModeSwitch