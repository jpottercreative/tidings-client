import React from 'react'
import Box from '@mui/material/Box';
import ImageTextBlock from './blockRenderers/ImageTextBlock';
import ImageBlock from './blockRenderers/ImageBlock';
import TextBlock from './blockRenderers/TextBlock';

// this is how we sort through and pick a block renderer based on block type


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

    // currently only image and text are the blocks in use
    // when I get around to programatically using all the other 
    // settings possible in the DB then the ImageTextBlock can render

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