import React from 'react'
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { toggleDarkMode } from "../reducers/themeToggleSlice"
import LightIcon from '@mui/icons-material/Light';
import LightOutlinedIcon from '@mui/icons-material/LightOutlined';

function ModeSwitch( { onModeChange } ) {
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