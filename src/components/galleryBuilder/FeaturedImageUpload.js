import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// this is the image uploader for gallery featured images ONLY
// it is a rehash of the same uploader in the block-builder
// needs to be refactored for drag and drop - see note below
// worth noting: there is no preview image 

// plz refactor the uploader to be a drag and drop, maybe based on this: https://codepen.io/beljems/pen/LYNZYNy

function FeaturedImageUpload( { formError, setFormError, onGalleryStartChange } ) {
  const [uploadImage, setUploadImage] = useState()


  
function handleImageChange(e){
    setFormError(false)
    setUploadImage(e.target.files[0])
    onGalleryStartChange(e.target.files[0])
}

const handleSubmit = () =>{}


// this sets the text on the button to our file name if it exists for user sanity
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