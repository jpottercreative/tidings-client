import React from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import './refresh_rotate.css'

// yep it's as silly as a single icon with a classname - but we are using a separate css file
// kinda janky - but in the time constraints, not bad
function RefreshRotater() {
  return (
    <><CachedIcon color="lightblue" className="rotateMe"/></>
  )
}

export default RefreshRotater