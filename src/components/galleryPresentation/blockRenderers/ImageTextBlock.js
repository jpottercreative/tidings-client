import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function ImageTextBlock( {block} ) {
    console.log(block)
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
// console.log(image_src)

const imageTextBlockStyle = {
    width: "auto",
    height: "90vh",
    display: "block",
    textAlign: "center",
    position: "relative",
    backgroundImage: `url(${image_url})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
}

const imageStyle = {
    width: "100%"
}
const textStyle= {
    width: "80%",
    position: "relative",
    top: "20px",
    margin: "0 auto"
}

  return (
    <Box style={imageTextBlockStyle}>
        <Typography mt={0} style={textStyle} variant="body1">{text}</Typography>
        {/* <img style={imageStyle} src={image_src}/> */}
    </Box>
  )
}

export default ImageTextBlock