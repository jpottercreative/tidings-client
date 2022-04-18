import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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