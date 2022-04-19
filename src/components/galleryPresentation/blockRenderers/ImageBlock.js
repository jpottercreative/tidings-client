import React from 'react'
import Box from '@mui/material/Box';

// renders the images in the gallery show
// takes in the block, and then spits out a full width div
// with the image as the background - currently VH is not 100%
// but the image still presents pretty well
// this obvo needs work, esp once extra layout options
// become available (are activated by me)

function ImageBlock( {block} ) {
    // console.log(block)
    const {
      block_type,
      bg_color,
      block_id,
      font,
      font_color,
      gallery_id,
      id,
      imageHeight,
      imageWidth,
      image_url,
      text,
      text_align,
      type,
      width } = block
// console.log(block)

// this defines our image style - uses that old background image trick to make it responsive
const imageTextBlockStyle = {
    width: "auto",
    minHeight: "90vh",
    display: "block",
    textAlign: "center",
    position: "relative",
    backgroundImage: `url(${image_url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
}


  return (
    <Box style={imageTextBlockStyle}>

    </Box>
  )
}

export default ImageBlock