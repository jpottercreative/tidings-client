import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux"



function FeaturedImageUpload( { formError, setFormError, onGalleryStartChange } ) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [userError, setUserError] = useState(false)
  const [uploadImage, setUploadImage] = useState()


  
function handleImageChange(e){
    setFormError(false)
    setUploadImage(e.target.files[0])
    onGalleryStartChange(e.target.files[0])
}

const handleSubmit = () =>{}


// const handleSubmit = e => {
//   e.preventDefault();
//   const formData = new FormData()
//   formData.append("featuredImage", uploadImage)
//   fetch(`http://localhost:3000/new-photo/${currentUser.id}`, {
//     method: 'POST',
//     headers: {
//       "Authorization": `Bearer ${currentUser.token}`
//       },
//     body: formData
//   })
//     // .then(res => res.json())
//   .then((response) => {
//     if (response.ok) { 
//      return response.json();
//     }
//     return Promise.reject(response); 
//   })
//     // if resp.ok then we proceed to set onLogin
//     // reset the field text, and setUserError to false
//     .then((data) => { 
//       console.log("featured image came back as ", data); 
//       // console.log(data.user)
//       // console.log(data.avatar)

//     })
//     // if there is an error then send the error info to a handler
//     .catch((error) => {
//       console.log(error)
//       renderUserError(error)
//     });
//   }
//   //this sets our user error - currently inactive - then logs an error
//   function renderUserError(error){
//     setUserError(true)
//     console.log('Oops... ', error.statusText)
//   }

  // plz refactor the uploader to be a drag and drop, maybe based on this: https://codepen.io/beljems/pen/LYNZYNy

function FileNameDisplay() {
    if (uploadImage) {
        let displayText = uploadImage.name
        if (displayText.length > 13) {
            const str = displayText.substring(0,13)
            return str + "..."
        } else if (uploadImage) {
            return displayText
        }
    } else {
        return "Choose File"
    }
}


const featuredImageBoxStyle = {
  border: "1px #cbcbcb solid",
  padding: ".5em .7em .7em .7em",
  borderRadius: "3px",
  margin: "10px 0 5px 0"
}
  return (
    <Box style={featuredImageBoxStyle}>
        <Typography variant="overline">featured image <span className="overline">*</span></Typography>
        <form onSubmit={handleSubmit} id='upload'>
            <Button
            variant="outlined"
            color={formError ? "error" : "lightblue"}
            component="label">
                <FileNameDisplay/>
                <input
                type="file"
                hidden
                accept="image/*" multiple={false} onChange={handleImageChange} />
            </Button>
        </form>
    </Box>
  )
}

export default FeaturedImageUpload