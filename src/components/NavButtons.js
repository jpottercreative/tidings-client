import React from 'react'
import { NavLink } from "react-router-dom";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import BalconyOutlinedIcon from '@mui/icons-material/BalconyOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import { useDispatch, useSelector } from "react-redux"
import { setStep, setGalleryInEdit } from "../reducers/gallerySlice"
import Tooltip from '@mui/material/Tooltip';

function NavButtons() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  // console.log(currentUser.loggedIn)

  let activeStyle = {
    textDecoration: "none",
    backgroundColor: "primary.main",
    color: "lightblue",
    pointerEvents: currentUser.loggedIn ? "auto" : "none"
  };
  const inActiveStyle = {
    textDecoration: "none",
    color: "pink",
    pointerEvents: currentUser.loggedIn ? "auto" : "none"
  }
  let homeActiveStyle = {
    textDecoration: "none",
    backgroundColor: "primary.main",
    color: currentUser.loggedIn ? "lightgreen" : "orange",
    disabled: true
    // pointerEvents: currentUser.loggedIn ? "none" : "auto",
  };
  const homeInActiveStyle = {
    textDecoration: "none",
    color: currentUser.loggedIn ? "lightgreen" : "orange",
    disabled: true
    // pointerEvents: currentUser.loggedIn ? "none" : "auto"
  }
  const newGal = {
    
  }
  function handleNewGalClick(){
    dispatch(setGalleryInEdit(newGal))
    dispatch(setStep("start"))
  }



  return (
    <div>
      <Stack 
      direction="row"
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
      className="header" 
      id="navStack"
      >
        
      <Tooltip title={currentUser.loggedIn ? currentUser.email : "login plz"}>
      <NavLink to={currentUser.loggedIn ? "#" : "/"} 
        className="nav"
        style={({ isActive }) =>
              isActive ? homeActiveStyle : homeInActiveStyle
            } >
          <Button variant="outline">
              <FingerprintOutlinedIcon/>
          </Button>
      </NavLink>
      </Tooltip>
      <NavLink to="/profile" 
        className="nav"
        style={({ isActive }) =>
        isActive ? activeStyle : inActiveStyle
        } >
        <Button disabled={!currentUser.loggedIn} variant="outline">
            <AccountBoxOutlinedIcon/>
        </Button>
      </NavLink>
      <NavLink to={ "/gallery-builder" }
        className="nav"
        style={({ isActive }) =>
        isActive ? activeStyle : inActiveStyle
        } >
        <Button onClick={handleNewGalClick} disabled={!currentUser.loggedIn} variant="outline">
          <AddPhotoAlternateOutlinedIcon />
        </Button>
      </NavLink>
      {/* <NavLink to="/gallery-presentation" 
        className="nav"
        style={({ isActive }) =>
        isActive ? activeStyle : inActiveStyle
        } >
        <Button disabled={!currentUser.loggedIn} variant="outline">
          <PlayCircleFilledWhiteOutlinedIcon />
        </Button>
      </NavLink> */}
      </Stack>

    </div>
  )
}

export default NavButtons