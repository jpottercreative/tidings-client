import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import { setCurrentUser, loggedIn } from "../reducers/userSlice"
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import { useNavigate } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip';


//   import { showSpinner } from '../../reducers/spinnerSlice'

function LogOut() {
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const isDarkMode = useSelector(state => state.themeToggle.isDarkMode)
    const loggedIn = useSelector(state => state.user.loggedIn)
    // console.log("logging out currentUser:", currentUser)
    function handleLogOut(e){
      e.preventDefault()
        // get token from state, send token to backend delete route
        // need to get currentUser into redux state
        dispatch(setCurrentUser({
            email: "",
            token: "",
            loggedIn: false
        }))
        revoke()
    }
    // needs to fetch to destroy token
    async function revoke(){
      // const token = `Bearer ${currentUser.token}`
    const currentToken = localStorage.getItem("token")
      fetch('http://localhost:3000/users/sign_out', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentToken}`
          }
      })
      .then(r => r.json())
      .then((data) => {
        // console.log("you should have been navvd")
        console.log("back from server", data)
        localStorage.removeItem("token")
        moveMe()
      })
    }

    function moveMe(){
      navigate("./", {replace: true})
    }
// if logged in: pink, if logged out: darkgrey, if loggedout/dark: light grey
    const lightDark = !isDarkMode ? "#656565" : "#4c4c4c"
    const loggedInColor = loggedIn ? "pink" : lightDark
    const logOutIconStyle = {
      color: loggedInColor
    }  

  return (
    <Box>
      <Tooltip title={"logout"}>
      <Button variant="outline" disabled={!loggedIn} onClick={handleLogOut} id="logout-button" name="logout"><ExitToAppOutlinedIcon style={logOutIconStyle} /></Button>
      </Tooltip>
    </Box>
  )
}

export default LogOut