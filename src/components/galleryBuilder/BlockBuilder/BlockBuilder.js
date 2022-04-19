import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import ImageUploadButton from '../../ImageUploadButton';
import { setShowMessage  } from '../../../reducers/blockMessageSlice';
import { setStep } from '../../../reducers/gallerySlice'
import { useDispatch, useSelector } from "react-redux"
import Collapse from '@mui/material/Collapse';
import { showSpinner } from '../../../reducers/spinnerSlice'

// this componen holds the bits to create new blocks
// needs to be broken up desparately
// lots of conditional rendering in here, plus need to move the 
// the fetch to a global custom useFetch hook - also this 
// component has it's own messaging system, need to plug this
// into a global messaging system so we can more easily 
// give the correct message and color

function BlockBuilder( { handleCloseBlockBuilder, handleResetList } ) {
  const [blockImage, setBlockImage] = useState("")
  const [compactMode, setCompactMode] = useState(true)
  const [formError, setFormError] = useState(false)

  // this is our block, note DOES NOT contain the image link, because that is a separate
  // piece that is tacked on during the fetch - I did this just b/c it was easier
  const [newBlock, setNewBlock] = useState ({
    
    text: "Enter block text",
    bgColor: "none",
    fontColor: "#ffffff",
    width: "full",
    textAlign: "right",
    font: "default",
    type: "image"
  })

  // this is the meat of how it works:
  // get our user, and the gallery we are working on
  // then we know who and which gallery to associate the block with
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const id = useSelector(state => state.gallery.id)

  
  function handleFormChange(e){
    // debugger
    const name = e.target.name;
    let value = e.target.value;
    // validations for a good time
    //use a regex 
    const regex = new RegExp('[^0-9A-Za-z\@\._ ]')
    //make a new array to hold matches from the regex  
    const foundBaddy = value.match(regex)
    //if the array exists then set error to true, else false
    foundBaddy ? setFormError(true) : setFormError(false)
    // console.log(foundBaddy)
    setNewBlock({...newBlock, [name]: value})
  }


  function handleImageAdd(file){
    setBlockImage(file)
  }

  function handleSubmitFake(e) {
    dispatch(setStep("manage"))
  }


  // construct a formData object from our newBlock obj and the image file
  // proceed that new formData object to the server as one - render image conditionally tho
  const handleSubmit = e => {
    dispatch(showSpinner())
    // console.log('hello')
    e.preventDefault();
    // console.log("clicked add block")
    const formData = new FormData()
    formData.append("gallery_id", id)
    //make sure image is written conditionally - if we send "undefined" it errs on backend - thanks javascript...
    if (blockImage) formData.append("image", blockImage)
    formData.append("text", newBlock.text)
    formData.append("bg_color", newBlock.bgColor)
    formData.append("font_color", newBlock.fontColor)
    formData.append("width", newBlock.width)
    formData.append("text_align", newBlock.textAlign)
    formData.append("font", newBlock.font)
    formData.append("block_type", newBlock.type)
    fetch(`http://localhost:3000/new-block/`, {
      method: 'POST',
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
        // console.log("block came back as ", data); 
        dispatch(setStep("manage"))
        dispatch(setShowMessage({
          show: true, 
          message: `added block ${data.id} to gallery ${id}`}))
        resetForm()
        dispatch(showSpinner())
      })
      // if there is an error then send the error info to a handler
      .catch((error) => {
        // console.log(error)
        renderUserError(error)
        dispatch(showSpinner())
      });
    }
    //this sets our user error - currently inactive - then logs an error
    function renderUserError(error){
      // setUserError(true)
      console.log('Oops... ', error.statusText)
    }
    function resetForm(){
      setBlockImage("")
      handleCloseBlockBuilder()
      handleResetList()

    }
    function handleCompactModeToggle(e){
      e.preventDefault()
      setCompactMode((compactMode) => compactMode = !compactMode)
    }

    //this is our function to signal fields to disable based on block type
    const isItText = () => {
      if (newBlock.type === "text") {
        return true
      } 
      return false
    }
    const compactComponent = {
      // display: compactMode ? 'none' : 'block'
    }


  return (
  

<Box sx={{flexGrow: 1, padding: "1em"}}>
      <Grid container
        gap={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center">
          <Grid item xs={12}>
            <Grid   container
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              gap={2}>
                <Grid  item sm={12}  >
                    {/* <TextField id="new-block-type" 
                      label="block type"
                      helperText="image, text"
                      required
                      value={newBlock.type} 
                      name="type"
                      onChange={handleFormChange}
                      variant="outlined"
                      color="pink"
                      error={formError}
                    /> */}
                          <FormHelperText sx={{marginLeft: "2px"}}>block type*</FormHelperText>
                          <Select
                            labelId="block-type-select"
                            id="block-type-select"
                            value={newBlock.type}
                            onChange={handleFormChange}
                            name="type"
                            variant="outlined"
                            color="pink"
                            error={formError}
                          >
                            <MenuItem value="image">image</MenuItem>
                            <MenuItem value="text">text</MenuItem>
                          </Select>



                </Grid>
                <Grid item sm={12} >
                    <TextField id="new-block-text" 
                      helperText="optional"
                      label="block text"
                      value={newBlock.text} 
                      name="text"
                      onChange={handleFormChange}
                      variant="outlined"
                      color="pink"
                      multiline
                      error={formError}
                      disabled={!isItText()}
                    />
                  </Grid>
                </Grid> 
            </Grid>
        <Collapse in={!compactMode}>
          <Grid item>
            <Grid container>
              <Grid style={compactComponent} item xs={6} >
                    <TextField id="new-block-bgcolor" 
                      helperText="hex code plz"
                      label="bgColor"
                      value={newBlock.bgColor} 
                      name="bgColor"
                      onChange={handleFormChange}
                      variant="standard"
                      disabled
                    />
              </Grid>
              <Grid style={compactComponent} item xs={6}>
                    <TextField id="new-block-fontcolor" 
                      label="fontColor"
                      helperText="hex code plz"
                      value={newBlock.fontColor} 
                      name="fontColor"
                      onChange={handleFormChange}
                      variant="standard"
                      disabled
                    />
              </Grid>
              <Grid style={compactComponent} item xs={6}>
                    <TextField id="new-block-width" 
                      label="block width"
                      helperText="sm md full"
                      value={newBlock.width} 
                      name="width"
                      onChange={handleFormChange}
                      variant="standard"
                      disabled
                    />
              </Grid>
              <Grid style={compactComponent} item xs={6}>
                    <TextField id="new-block-textalign" 
                      label="text align"
                      helperText="left right center"
                      value={newBlock.textAlign} 
                      name="textAlign"
                      onChange={handleFormChange}
                      variant="standard"
                      disabled
                    />
                </Grid>
            </Grid>
            </Grid >
        </Collapse>
        <Grid item xs={12}>
          
          <Link 
          onClick={handleCompactModeToggle} 
          underline="hover"
          color="secondary">{compactMode ? "pro opts..." : "coming soon..."}</Link>  
        </Grid>


        <Grid container
        gap={2}
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start">
          <Grid item xs={6}>
            <ImageUploadButton isItText={isItText} onImageChange={handleImageAdd} />
          </Grid>
          <Grid item xs={6}>
            <Button disabled={formError} variant="outlined" color="pink" onClick={handleSubmit}>Add Block to Gallery</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  
  )
}

export default BlockBuilder