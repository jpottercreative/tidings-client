import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


function BlockListCard( { block } ) {
    // console.log(block)
    // text col needs to be renamed or the block type needs to be renamed
    const {
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
        block_type,
        width } = block
        // console.log(block_type)

    const blockImgStyle = {
        width: "100%",
     
    }

    const placeholderImage = "https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png"

    //create block card that can be either full or boxed - start full?
    // start with getting text and image, then settings

    const notApplicableStyle = {color: block_type === "text" ? "black" : "grey"}

    function BlockRender() {
        //make a basic card rendering each field
        return (
        <Card sx={{ display: 'flex' }}>
            <Grid container sx={{padding: "5px", outline: "solid black 4px"}} spacing={2} columns={2}>
                <Grid item xs={2}>
                    <Typography variant="body2"><strong>Type:</strong> {block_type}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="body2"><strong>id:</strong> {id}</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography style={notApplicableStyle} variant="body2"><strong>Text:</strong> {block_type === "text" ? text : null}</Typography>
                </Grid>
            </Grid>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={image_url ? image_url : placeholderImage}
          alt={text}
        />
      </Card>
      )
    }
  return (
    <Box  sx={{width: "100%"}}>
            <BlockRender/>
    </Box>
  )
}

export default BlockListCard