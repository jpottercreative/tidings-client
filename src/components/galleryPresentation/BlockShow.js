import React from 'react'
import BlockCard from './BlockCard';

// maps over all the blocks in a gallery
// and renders a block card for each block

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