import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ImageTextBlock from './blockRenderers/ImageTextBlock';
import ImageBlock from './blockRenderers/ImageBlock';
import TextBlock from './blockRenderers/TextBlock';

function BlockCard( { block } ) {
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
        console.log(block_type)

    const blockImgStyle = {
        width: "100%"
    }

    //create block card that can be either full or boxed - start full?
    // start with getting text and image, then settings

    function BlockRender() {
            switch (block_type) {
              case "image":
                return <ImageBlock key={block.id} block={block}/>
                break;
              case "text":
                return <TextBlock key={block.id} block={block}/>
                break;
              case "imageText":
                return <ImageTextBlock key={block.id} block={block} />
                break;
              default: 
                return "thanks"
            }
    }
  return (
    <Box key={block.id} sx={{width: "100%"}}>
            <BlockRender key={block.id}/>
    </Box>
  )
}

export default BlockCard