import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux"



function ImageUploadButton( { onImageChange } ) {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const [uploadImage, setUploadImage] = useState()

  
function handleImageChange(e){
    // console.log(e.target.files[0].name)
    setUploadImage(e.target.files[0])
    onImageChange(e.target.files[0])
}

  // plz refactor the uploader to be a drag and drop based on this: https://codepen.io/beljems/pen/LYNZYNy

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

// const previewStyle = {
//   width: auto,
//   display: none
// }
function PreviewBox(){
  if (uploadImage) {
    const previewUrl = URL.createObjectURL(uploadImage)
    console.log(previewUrl)
    return <img  style={{width: "100%", display: "block"}} src={previewUrl} /> 
  } else {
    return null
  }
}

  return (
    <Box sx={{flexGrow: 1}}>
    <Grid container
    gap={2}
    direction="row"
    justifyContent="flex-start"
    alignItems="flex-end">
        <Grid item xs={12}>
            <Typography variant="overline">upload image</Typography>
            <form id='upload'>
                <Button
                label="upload image"
                variant="outlined"
                component="label"
                color="secondary">
                    <FileNameDisplay/>
                    <input
                    type="file"
                    hidden
                    accept="image/*" multiple={false} onChange={handleImageChange} />
                </Button>
          </form>
        </Grid>
        <Grid item xs={4}>
          <PreviewBox />
        </Grid>
    </Grid>
    </Box>
  )
}

export default ImageUploadButton