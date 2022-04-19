import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { FormControl } from '@mui/material';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setCurrentUser } from "../reducers/userSlice"
import { showSpinner } from "../reducers/spinnerSlice"
import { useNavigate } from 'react-router-dom'
import { setError } from "../reducers/errorSlice"

// signup component that does small amount of validation on front end
// text entry validation simply confirms it looks like an email
// submit validation confirms that its formed like an email - but not that its a real one
// db doesn't currently do any more validation beyond this either - user can signup with 
// something that is not real like i@jo.ui

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.user)
    const [formError, setFormError] = useState(false)
    const [signUpFormData, setSignUpFormData] = useState({
        email: "",
        password: ""
    })
    function handlesignUpFormChange(e){
        e.preventDefault()
        //set form data
        const name = e.target.name
        let value = e.target.value
        // validations for a good time
        //use a regex 
        const regex = new RegExp('[^0-9A-Za-z\@\.]')
        //make a new array to hold matches from the regex  
        const foundBaddy = value.match(regex)
        //if the array exists then set error to true, else false
        foundBaddy ? setFormError(true) : setFormError(false)
        // console.log(foundBaddy)
        setSignUpFormData({
            ...signUpFormData, 
            [name]: value})
    }

    // console.log("curUser in state: ", currentUser)

    function handleSubmitValidation(){
        // const regex = new RegExp('[^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$]')
        const regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        const emailOk = signUpFormData.email.toLowerCase().match(regex)
        !emailOk ? setFormError(true) : setFormError(false)
        setTimeout(() => {setFormError(false)}, 1500)
        if (emailOk) signMeUp()
    }

    async function signMeUp(){
        dispatch(showSpinner());

        const userToSignUp = {
            user: {
                email: signUpFormData.email,
                password: signUpFormData.password
            }
        }
        // console.log("sending this to server", JSON.stringify(userToSignUp))
        await fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userToSignUp)
        })
        // track the response code and handle the jsonification if its ok
        .then((response) => {
            let json = response.json()
            if (response.status >= 200 && response.status < 300) {
              return json;
            }
            return json.then(Promise.reject.bind(Promise))
            // return Promise.reject(response)
        })
        // this sets the newly created user in state and proceeds them to the app/profile
          .then((authUser) => {
              console.log(authUser)
            dispatch(setCurrentUser({
                email: authUser.user.email,
                password: signUpFormData.password,
                token: authUser.token,
                loggedIn: true
            }))
            localStorage.setItem("token", authUser.token)
            moveMe()
            dispatch(showSpinner());
          })
          .catch((error) => {
            //   console.log(error)
            renderUserError(error)
            // dispatch(showSpinner())
            resetForm()
          })
    //    dispatch(showSpinner());
    }

    function renderUserError(error) {
        console.log(error.error.statusText)
        console.log(error.error.status)
        const newError = {
          text: error.statusText || error.error.statusText,
          occurred: true, 
          code: error.error.status || error.status
        }

        dispatch(setError(newError))
      }

    function moveMe(){
        navigate("/profile", {replace: true})
    }
    
    function resetForm(){
        setSignUpFormData({
            ...signUpFormData, 
            email: "",
            password: ""
            })
    }


  return (
    <Box>
        <FormControl>
            <Stack spacing={1}>
                <TextField id="signup-email" 
                placeholder="email" 
                value={signUpFormData.email} 
                name="email"
                onChange={handlesignUpFormChange}
                error={formError}
                color="lightblue"
                variant="outlined"
                />
                <TextField id="signup-password" 
                type="password" 
                placeholder="password" 
                value={signUpFormData.password} 
                name="password"
                onChange={handlesignUpFormChange}
                variant="outlined"
                color="lightblue"
                />
                <Button id="signup-submit" 
                type="submit" 
                name="submit"
                variant="outlined"
                color="secondary"
                disabled={formError}
                onClick={handleSubmitValidation}>Sign Up</Button>
            </Stack>
        </FormControl>
    </Box>
  )
}

export default SignUp