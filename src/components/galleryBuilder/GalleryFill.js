import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';

import { useDispatch, useSelector } from "react-redux"
import { setStep, setGalleryInEdit } from '../../reducers/gallerySlice'
import BlockBuilder from './BlockBuilder/BlockBuilder';
function GalleryFill( ) {

  const dispatch = useDispatch()

  function handleBack(e){
    e.preventDefault()
    dispatch(setStep("start"))
  }
  function handleManage(e){
    e.preventDefault()
    dispatch(setStep("manage"))
  }

  return (

      <Box sx={{flexGrow: 1}}>
        <Grid container
        gap={2}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch">
          <Grid item xs={12}>
            <Tooltip title="careful, no going back">
              <Typography variant="overline" component="p">add your first block</Typography>
            </Tooltip>
          <BlockBuilder  />
        </Grid>
      </Grid>
    </Box>
  )
}

export default GalleryFill