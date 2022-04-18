import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import FeaturedImageUpload from './FeaturedImageUpload';
import Typography from '@mui/material/Typography';
import { setCurrentUser } from '../../reducers/userSlice';
import { setError } from '../../reducers/errorSlice';
import { useDispatch, useSelector } from "react-redux"
import { setStep, setGalleryInEdit } from '../../reducers/gallerySlice'
import { showSpinner } from '../../reducers/spinnerSlice'

function GalleryStart( { userError, setUserError  } ) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user)
    const gallery = useSelector(state => state.gallery)
    const isSpinnerShowing = useSelector(state => state.spinner.isSpinnerShowing)
    //this is the gallery we'll start and send to the db
    const [newGalleryEstablish, setNewGalleryEstablish] = useState({
      title: "new gallery", 
      description: "description",
    })
    const [featuredImage, setFeaturedImage] = useState()
    const [formError, setFormError] = useState(false)
  
      // handle the text and file inputs
    function handleGalleryStartChange(e) {
        if (e instanceof File) {
          setFeaturedImage( e )
        } else {
          const name = e.target.name;
          let value = e.target.value;
          setNewGalleryEstablish({...newGalleryEstablish, [name]: value})
        }
      }

      const handleValidate = e => {
        featuredImage ? handleSubmit(e) : setFormError(true)
        
      }


  // create new record in db 
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(showSpinner());
    // console.log("clicked submit new gal to db")
    const formData = new FormData()
    //critical to have the conditional check for featured image, if send 'undefined' it errs on backend
    if (featuredImage) formData.append("featured_image", featuredImage)
    formData.append("title", newGalleryEstablish.title)
    formData.append("description", newGalleryEstablish.description)
    formData.append("published", false)
    fetch(`http://localhost:3000/new-gallery/`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${currentUser.token}`
        },
      body: formData
    })
    .then((response) => {
      if (response.ok) { 
       return response.json();
      }
      return Promise.reject(response); 
    })
      // if resp.ok then we proceed - logs for dev and sanity checks
      .then((data) => { 
        console.log("new gal came back as ", data); 
        // console.log("desc: ", data.description)
        // console.log("title: ", data.title)
        // console.log("id: ", data.id)
        //take the new gallery and set it in the edit state
        dispatch(setGalleryInEdit({
          title: data.title,
          description: data.description,
          id: data.id,
          featured_image_url: data.featured_image_url,
          published: false
        }))
        //push the editor to the fill step
        dispatch(setStep("fill"))
        //hide spinner
        dispatch(showSpinner());
      })
      // if there is an error then send the error info to a handler
      .catch((error) => {
        console.log(error)
        renderUserError(error)
      });
    }
    //this sets our user error - currently inactive - then logs an error
    function renderUserError(error) {
      // console.log("error render", error)
      const newError = {
        text: error.statusText,
        occurred: true, 
        code: error.status
      }
      dispatch(setError(newError))
      setFormError(true)
    }
//this is reused AGAIN because JP is too lazy to figure out the custom hook
    function revoke(){
      console.log("revoking token and redirecting")
      localStorage.removeItem("token")
      dispatch(setCurrentUser({
        email: "",
        token: "",
        loggedIn: false
      }))
      dispatch(setError({
        text: "Please Login",
        occurred: true, 
        code: 401
      }))
    }


  return (
    <Box sx={{flexGrow: 1, padding: '2vh'}}>
        <Grid container
        gap={2}
        direction="column"
        justifyContent="space-around"
        alignItems="stretch">
          <Grid item xs={8}>
            <Typography variant="overline">new gallery</Typography>
          </Grid>
        <Grid item xs={8}>
                <TextField id="gallery-start-title" 
                value={newGalleryEstablish.title} 
                name="title"
                onChange={handleGalleryStartChange}
                variant="outlined"
                label="gallery title"
                color="pink"
                fullWidth
                />
          </Grid>
          <Grid item xs={8}>
                <TextField id="gallery-start-title" 
                fullWidth
                value={newGalleryEstablish.description} 
                name="description"
                onChange={handleGalleryStartChange}
                variant="outlined"
                label="give it a description"
                multiline
                maxRows={4}
                color="pink"
                />
          </Grid>
        </Grid> 
        <Grid item xs={12} >
                <FeaturedImageUpload formError={formError} setFormError={setFormError} onGalleryStartChange={handleGalleryStartChange} />
        </Grid>
        <Grid item xs={4}>
                <Button
                variant="outlined" 
                color="pink"
                component="label"
                disabled={formError}
                onClick={handleValidate}>
                    Start it
                </Button>
                
        </Grid>
    </Box>
  )
}

export default GalleryStart