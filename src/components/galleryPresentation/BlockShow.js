import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BlockCard from './BlockCard';

function BlockShow( { blocks } ) {
    console.log(blocks)
    const blockCards = blocks.map(block => <BlockCard block={block}/>)
    blocks.map(block => console.log(block))
  return (
    <>
        {blockCards}
    </>
  )
}

export default BlockShow