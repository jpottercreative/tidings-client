import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// this just presents our text in a call-out block
// and fills the bg with a random color that cycles on reload
// add sizing, color, etc options when those are activated on the backend

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
        padding: "15px 0px 15px 0px",
        lineHeight: "3",
        // backgroundColor: "rgba(200,200,200,.7)",
        // marginTop: "15px"
        // backgroundColor: "lightgreen",
        // boxShadow: "10px 0 0 lightgreen, -10px 0 0 lightgreen",
        textAlign: "center"
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
    console.log(text)
  return (
    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    style={imageTextBlockStyle}
    >
        <Grid  item xs={6}>
            <Paper elevation={10}>
                <Typography variant="overline" style={textItemStyle}>{text}</Typography>
            </Paper>
        </Grid>
    </Grid>
    
  )
}

export default TextBlock