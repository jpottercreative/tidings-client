import React from 'react'
import Box from '@mui/material/Box';
import GalleryCombinator from './GalleryCombinator';


// this is our super basic proof of concept gallery show component
// it is really just a scrollable overlay on the highest z-index
// you can click it away, which is convenient
// the three render blocks feels like a good methodology to continue with

function GalleryShow( { open, setOpen, galleryToShow, blocksToShow } ) {
    
    const handleClose = () => {
        setOpen(false);
    };

    //this is the holder for the actual gallery show elements
    // these are combined with the gallery combinator component based on block type
    // elements will be:
    // 1) hero block - featured image, title, author?
    // 2) blocks (three render templates - text, image, image-text)
    // 3) coda 

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

  return (
    <>
        {open ? <RenderGalleries /> : null } 

      {/* <Button onClick={handleToggle}>Show backdrop</Button> */}
    </>
  )
}

export default GalleryShow

