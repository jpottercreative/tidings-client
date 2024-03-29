import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux"


// shows our featured image at the top of the template
// nothing special here - just takes a bunch of props and renders a big image


function HeroBlock( { galleryDetails } ) {
    const { title, published_on, featured_image_url, other_props } = galleryDetails
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user)
    // console.log(featured_image)

    //this would be much nicer if it was a styled component, don't you think?
const heroImgStyle = {
    width: "100%",
    padding: 0,
    margin: 0,
    display: "block",
    textAlign: "center"
,}
const dividerStyle ={
  position: "relative",
  backgroundColor: "#444",
  color: "#fff",
  padding: 0,
  margin: 0

}

  return (
    <Box>
        <Box style={heroImgStyle}>
          <img className="hero-image" style={heroImgStyle} src={featured_image_url}/>
          <Typography variant="overline" sx={{fontSize: "2em"}}>{title}</Typography>
        </Box>
    </Box>
  )
}

export default HeroBlock