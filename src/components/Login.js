import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FormControl } from '@mui/material';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../reducers/userSlice"
import { showSpinner } from "../reducers/spinnerSlice"
import { setError } from '../reducers/errorSlice'

function Login(e) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [formError, setFormError] = useState(false)


    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })
    function handleLoginFormChange(e){
        e.preventDefault()
        //set form data
        const name = e.target.name
        let value = e.target.value

         // validations for a good time
        //use a regex 
        const regex = new RegExp('[^0-9A-Za-z@.]')
        //make a new array to hold matches from the regex  
        const foundBaddy = value.match(regex)
        //if the array exists then set error to true, else false
        foundBaddy ? setFormError(true) : setFormError(false)

        setLoginFormData({
        ...loginFormData, 
        [name]: value})
    }

    function login2(){
        dispatch(showSpinner())
        const userToLogIn = {
            user: {
                email: loginFormData.email,
                password: loginFormData.password
            }
        }
        fetch('http://localhost:3000/users/sign_in', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(userToLogIn),
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            return Promise.reject(response)})
        .then((authUser) => {
            dispatch(setCurrentUser({
                email: loginFormData.email,
                token: authUser.token,
                loggedIn: true,
                id: authUser.id,
                avatar: authUser.avatar
            }))
            dispatch(showSpinner())
            localStorage.setItem("token", authUser.token)
            resetForm()
            moveMe()
        })
        .catch((error) => {
            console.log(error)
            renderUserError(error)
            dispatch(showSpinner())
        })
    }
 

    function moveMe(){
        navigate("/profile", {replace: true})
    }

    
    function resetForm(){
        setLoginFormData({
            ...loginFormData, 
            email: "",
            password: ""
            })
    }

    function renderUserError(error) {
        console.log("error render", error)
        const newError = {
          text: error.statusText,
          occurred: true, 
          code: error.status
        }
        dispatch(setError(newError))
      }



  return (
    <Box>
        <FormControl id="login-form">
            <Stack gap={1}>
                <TextField id="login-email" 
                placeholder="email" 
                value={loginFormData.email} 
                name="email"
                onChange={handleLoginFormChange}
                error={formError}
                color="pink"
                variant="outlined"
                />
                <TextField id="login-password" 
                type="password" 
                placeholder="password" 
                value={loginFormData.password} 
                name="password"
                onChange={handleLoginFormChange}
                variant="outlined"
                color="pink"
                />
                <Button id="login-submit" 
                type="submit" 
                name="submit"
                color="pink"
                variant="outlined"
                disabled={formError}
                onClick={login2}>Log In</Button>
            </Stack>
        </FormControl>
    </Box>
  )
}

export default Login