import React, { useState } from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';

function TextInputBox( { bChange, bVal } ) {

// hi friend! I take two props:
// bChange and bVal - just like a regular textbox
// but I'm weird and scalable
// use bChange for the onChange handler
// use bVal for the value handlers on controlled forms

  return (
    <Box>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Empty"
        style={{ width: 200 }}
        onChange={bChange}
        value={bVal}
      />
    </Box>
  );
}

export default TextInputBox