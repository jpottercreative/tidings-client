import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


function TextBlock( { block } ) {
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

    const textItemStyle = {
        padding: "15px",
        backgroundColor: "rgba(200,200,200,.7)"
    }
    const textTextStyle = {
        
    }

    let randomColor = Math.floor(Math.random()*16777215).toString(16)
    // console.log(randomColor)
    const imageTextBlockStyle = {
        height: "70vh",
        textAlign: "center",
        position: "relative",
        backgroundColor: `#${randomColor}`,
    }
  return (
    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    style={imageTextBlockStyle}
    >
        <Grid  item xs={6}>
            <Paper elevation={4}>
                <Typography variant="overline" style={textItemStyle}>{text}</Typography>
            </Paper>
        </Grid>
    </Grid>
    
  )
}

export default TextBlock