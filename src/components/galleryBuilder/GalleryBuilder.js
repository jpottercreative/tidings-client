import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import GalleryStart from './GalleryStart'
import GalleryFill from './GalleryFill'
import GalleryManage from './GalleryManage'

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import GalleryFinish from './GalleryFinish'
import StepIndicator from './StepIndicator'
import { setStep } from '../../reducers/gallerySlice'
import BlockBuilderMessages from './BlockBuilder/BlockBuilderMessages'

// notes for each step in relevant components

function GalleryBuilder() {

  const dispatch = useDispatch()
  const {id, title, featured_image_url} = useSelector(state => state.gallery)
  const [userError, setUserError] = useState(false)
  const step = useSelector( state => state.gallery.step )
  
//where are we in the gallery process
console.log("gallery build step: ", step)

function handleChangeStep(e){
  dispatch(setStep(e.target.name))
}

//this was originally for breadcrumbs, so I left it as crummy - not it holds stepsIndicator
function Crummy(){
  return (  
    <Grid 
    container
    direction="column"
    justifyContent="space-around"
    alignItems="center"
    spacing={2}
    className="header" 
    padding='1em'
    >
      {featured_image_url ? <Avatar alt="new gallery image" src={featured_image_url} /> : null}
      {id ? <Typography variant="overline">id: {id} {<br></br>} title: {title}</Typography> : null }
      <StepIndicator />
    </Grid>
  );
}
//return only the part of the gallery builder that we need - sync with gallery step in state
  function ToolBox() {
    switch (step) {
      case "start":
        return <GalleryStart userError={userError} setUserError={setUserError}/>
        break;
      case "fill":
        return <GalleryFill userError={userError} setUserError={setUserError}/>
        break;
      case "manage":
        return <GalleryManage userError={userError} setUserError={setUserError} />
        break;
      case "finish":
        return <GalleryFinish userError={userError} setUserError={setUserError} />
        break;
      default: 
        return <GalleryStart userError={userError} setUserError={setUserError}/>
    }
  }
  //single item in return that is swapped out based on what 'step' we are in in the process
  // this seems to work pretty well - not sure if it's best practice, but so far so good
  // the redux state for gallery in edit and where we are in the process is super helpful 
  // to making this structure  possible
  return (
    <Box>
      <Grid container
      gap={2}
      spacing={1}
      direction="row"
      justifyContent="flex-start"
      alignItems="center">
        <Grid item xs={3}>
          <Paper elevation={0}>
            <Crummy />
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={0}>
            <ToolBox />
          </Paper>
          </Grid>
      </Grid>
      <BlockBuilderMessages />
    </Box>
  )
}

export default GalleryBuilder