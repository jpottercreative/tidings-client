import React from 'react'
import BlockList from './BlockList'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import Tooltip from '@mui/material/Tooltip';
import { setStep } from '../../reducers/gallerySlice'
import { useDispatch } from "react-redux"

// renders the gallery that is being worked on
// also renders the block builder inset so you can add blocks
// main gallery build page i guess?

function GalleryManage( ) {
  const dispatch = useDispatch()
  function handleFinish(){
    dispatch(setStep("finish"))
  }

  return (
      <Box sx={{flexGrow: 1}}>
        <Grid container
        gap={2}
        direction="column"
        justifyContent="center"
        alignItems="stretch">
          <Grid item sm={12}>
              <BlockList />
          </Grid>
          <Grid item sm={12} >
            <Tooltip title="ensure your positive, in life no turning back">
                <Button color="lightblue" onClick={handleFinish}>Add Coda and Finish <LibraryAddCheckOutlinedIcon /></Button>
            </Tooltip>
          </Grid>
        </Grid>
    </Box>
  )
}

export default GalleryManage