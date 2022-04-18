import React from 'react'
import HeroBlock from './HeroBlock'
import DescriptionBlock from './DescriptionBlock'
import BlockShow from './BlockShow'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CodaCard from './CodaCard';


function GalleryCombinator( { galleryToShow, blocksToShow } ) {
  console.log(galleryToShow)
  return (
    <Box sx={{width: "100%"}}>
        <Paper >
            <HeroBlock galleryDetails={galleryToShow} /> 
            <DescriptionBlock description={galleryToShow.description} /> 
            <BlockShow blocks={blocksToShow}/>
            <CodaCard galleryDetails={galleryToShow}/>
        </Paper>
    </Box>
  )
}

export default GalleryCombinator