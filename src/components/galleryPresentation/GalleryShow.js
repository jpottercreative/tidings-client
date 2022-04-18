import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import HeroBlock from './HeroBlock';
import DescriptionBlock from './DescriptionBlock'
import Paper from '@mui/material/Paper';
import dummyDataBlocks from '../galleryBuilder/dummyDataBlocks.json'
import BlockShow from './BlockShow';
import GalleryCombinator from './GalleryCombinator';

function GalleryShow( { open, setOpen, galleryToShow, blocksToShow } ) {
    const [blocks, setBlocks] = useState([])
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    //this is the holder for the actual gallery show elements
    // elements will be:
    // 1) hero block - featured image, title, author
    // 2) blocks (we need 3 templates?  or maybe just styled by props)
    // 3) coda (is this just a secret block type that only we can select?)

const galleryBackdrop = {
    zIndex: (theme) => theme.zIndex.drawer + 1,
    overflow:"scroll",
    display: "flex",
    position: "fixed",
    top: "0",
    right: "0",
    bottom: "0",
    left: "0",
    backgroundColor: "rgba(0,0,0,0.7)"
}
function RenderGalleries(){
    return (
        <>
            <Box sx={galleryBackdrop}
            onClick={handleClose}
            >
                <GalleryCombinator blocksToShow={blocksToShow} galleryToShow={galleryToShow[0]} />
            </Box>          
        </>
    )
}

    // const galleryDetails = galleryToShow[0]
  return (
    <>
        {open ? <RenderGalleries /> : null } 

      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
    </>
  )
}

export default GalleryShow

