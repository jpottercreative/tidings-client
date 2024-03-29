import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux"
import { setUserAvatar } from "../../reducers/userSlice"
import { showSpinner } from "../../reducers/spinnerSlice"


//this was my very first upload component
// i didn't refactor it mostly as a learning tool to come back to
// works fine - does what it needs
// refactor this to match the other two *facepalm*
// actually make a global upload component please

function UserAvatarUpload() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [avatarImageUpload, setAvatarImageUpload] = useState()
  const [userError, setUserError] = useState(false)

  
function handleImageChange(e){
  setAvatarImageUpload(e.target.files[0]);
}

// console.log(currentUser)
// console.log(currentUser.avatar)
// console.log(avatarImageUpload)

const handleSubmit = e => {
  dispatch(showSpinner());
  e.preventDefault();
  const formData = new FormData()
  formData.append("avatar", avatarImageUpload)
  fetch(`https://tidings-server.herokuapp.com/profile-photo/${currentUser.id}`, {
    method: 'PATCH',
    headers: {
      "Authorization": `Bearer ${currentUser.token}`
      },
    body: formData
  })
    // .then(res => res.json())
  .then((response) => {
    if (response.ok) { 
     return response.json();
    }
    return Promise.reject(response); 
  })
    // if resp.ok then we proceed to set onLogin
    // reset the field text, and setUserError to false
    .then((data) => { 
      // console.log("came back as ", data); 
      // console.log(data.user)
      // console.log(data.avatar)
      dispatch(setUserAvatar({
        avatar: data.avatar
    }))
    dispatch(showSpinner());

    })
    // if there is an error then send the error info to a handler
    .catch((error) => {
      console.log(error)
      renderUserError(error)
    });
  }
  // this is to set errors - but it's not currently plugged into the global
  // error handler, initially built just to handle form errors locally - which doesn't do anything any more
  
  function renderUserError(error){
    setUserError(true)
    console.log('Oops... ', error.statusText)
    dispatch(showSpinner());

  }

  function FileNameDisplay() {
    if (avatarImageUpload) {
        let displayText = avatarImageUpload.name
        if (avatarImageUpload.length > 13) {
            const str = displayText.substring(0,13)
            return str + "..."
        } else if (avatarImageUpload) {
            return displayText
        }
    } else {
        return "Choose File"
    }
}
  // plz refactor the uploader to be a drag and drop based on this: https://codepen.io/beljems/pen/LYNZYNy

const Input = styled('input')({
    textAlign: "center"
  });
  return (
    <Box sx={{padding: '.7em'}}>
      <Grid container
        direction="column"
        justifyContent="center">
        <Grid item>
          <Typography variant="overline" component="h4">Add profile photo</Typography>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmit} id='upload'>
            <Button
              variant="outlined"
              component="label"
              color="lightblue"
            >
            <FileNameDisplay/>
            <input
              type="file"
              hidden
              accept="image/*" multiple={false} onChange={handleImageChange} 
            />
          </Button>
            <Button
              variant="outlined"
              component="label"
              color="lightblue"
            >
            Uploadify it
            <input
              type="submit"
              value="Submit"
              hidden
            />
          </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}

export default UserAvatarUpload