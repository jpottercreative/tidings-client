import React from 'react'
import {  useSelector } from "react-redux"

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import CameraRollOutlinedIcon from '@mui/icons-material/CameraRollOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

function StepIndicator() {

  const step = useSelector( state => state.gallery.step )

  const active = {
    color:"#fec0ca"
  }
  const inactive = {
    color:"#cccccc"
  }

  // const colorSwitch = () => {
  //   const active = {text: "#fec0ca", icon: "pink"}
  //   const inactive = {text: "#fec0ca", icon: "pink"}
  //   switch (step) {
  //     case "start":
  //       return colors
  //       break;
  // }
    return (
        <Grid container
        direction="column"
        justifyContent="flex-end"
        alignItems="stretch"
        gap={2}
        // border="solid"
        >
    
          <Grid item xs={12} >
            <Grid container 
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              >
                <Grid item xs={8}>
                  <Typography color={step === "start" ? "#fec0ca" : "#cccccc"} variant="overline">start</Typography>
                </Grid>
                <Grid item xs={2}>
                  <CameraRollOutlinedIcon color={step === "start" ? "pink" : "grey"}/>
                </Grid>
              </Grid>
          </Grid>
    
    
          <Grid item xs={12} >
            <Grid container 
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center">
              <Grid item xs={8}>
                <Typography variant="overline" color={step === "fill" ? "#fec0ca" : "#cccccc"}>first block</Typography>
              </Grid>
              <Grid item xs={2}>
                <AutoAwesomeOutlinedIcon color={step === "fill" ? "pink" : "grey"}/>
              </Grid>
            </Grid>
          </Grid>
    
          <Grid item xs={12} >
            <Grid container 
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center">
                <Grid item xs={8}>
                  <Typography color={step === "manage" ? "#fec0ca" : "#cccccc"} variant="overline" >add to it</Typography>
                </Grid>
                <Grid item xs={2}>
                  <AddPhotoAlternateOutlinedIcon color={step === "manage" ? "pink" : "grey"}/>
                </Grid>
            </Grid>
          </Grid>
    
          <Grid  item xs={12} >
            <Grid container 
              direction="row"
              justifyContent="flex-end"
              alignItems="center">
                <Grid item xs={8}>
                  <Typography color={step === "finish" ? "#fec0ca" : "#cccccc"} variant="overline" >finish</Typography>
                </Grid>
                <Grid item xs={2}>
                  <SaveOutlinedIcon color={step === "finish" ? "pink" : "grey"}/>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        
      )
    }

export default StepIndicator