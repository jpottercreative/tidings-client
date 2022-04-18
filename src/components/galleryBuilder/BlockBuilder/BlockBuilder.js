import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import ImageUploadButton from '../../ImageUploadButton';
import { setShowMessage  } from '../../../reducers/blockMessageSlice';
import { setStep } from '../../../reducers/gallerySlice'
import { useDispatch, useSelector } from "react-redux"
import Collapse from '@mui/material/Collapse';
import { showSpinner } from '../../../reducers/spinnerSlice'

function BlockBuilder( { userError, setUserError, setRefresh, handleCloseBlockBuilder, handleResetList } ) {
  const [blockImage, setBlockImage] = useState("")
  const [compactMode, setCompactMode] = useState(true)
  const [formError, setFormError] = useState(false)

  const [newBlock, setNewBlock] = useState ({
    // does this need gallery id or image?
    text: "Enter block text",
    bgColor: "none",
    fontColor: "#ffffff",
    width: "full",
    textAlign: "right",
    font: "default",
    type: "image"
  })

  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const id = useSelector(state => state.gallery.id)

  // useEffect(() => {
  //   console.log(Object.entries(newBlock))
  // }, [newBlock])
  
  function handleFormChange(e){
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

  const handleSubmit = e => {
    dispatch(showSpinner())
    // console.log('hello')
    e.preventDefault();
    // console.log("clicked add block")
    const formData = new FormData()
    formData.append("gallery_id", id)
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
        dispatch(showSpinner())
        dispatch(setShowMessage({
          show: true, 
          message: `added block ${data.id} to gallery ${id}`}))
        resetForm()
      })
      // if there is an error then send the error info to a handler
      .catch((error) => {
        // console.log(error)
        renderUserError(error)
        
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
                    <TextField id="new-block-type" 
                      label="block type"
                      helperText="image, text"
                      required
                      value={newBlock.type} 
                      name="type"
                      onChange={handleFormChange}
                      variant="outlined"
                      color="pink"
                      error={formError}
                    />
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
            <ImageUploadButton onImageChange={handleImageAdd} />
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