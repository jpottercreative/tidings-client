import React, { useState } from 'react'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from "react-redux"

// this is the most complete of the image uploaders on the site
// even still, it should be refactored for drag/drop
// preview image is generated automatically 
// the isItText prop disables the upload button if we are on a text block

function ImageUploadButton( { onImageChange, isItText } ) {
  const [uploadImage, setUploadImage] = useState()

  // this version sets a local image state for the preview image via setUpLoadImage
  // then sets the file in the block builer newBlock object via onImageChange
  
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


// maybe refactor this to use image as background ?
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
                color="secondary"
                disabled={isItText()}
                >
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