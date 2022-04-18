import React, { useState } from 'react'
import GalleryListCard from './GalleryListCard'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';



function GalleryListing( { galleryList, onGalleryPlay } ) {
  // console.log(galleryList[0].blocks)
  const now = new Date().toUTCString()
  const publishedGalleries = galleryList.filter(gallery => gallery.published_on < now)
  const galleryCount = publishedGalleries.length
  const recentFiveText = publishedGalleries.length >= 5 ? "- here are your 5 most recent" : ""
  const title = publishedGalleries.length > 0 ? `Your Galleries, lifetime total: ${galleryCount} ${recentFiveText}` : "You don't have any galleries yet, click the plus above and make one!"
  const coda = publishedGalleries.length > 5 ? <Typography variant="overline" component="p">Looking for the rest of your galleries? Alas our whims are but that...</Typography> : null
  
  const cards = publishedGalleries.map(gallery => {
    return <Grid key={gallery.id} item xs={12}  ><GalleryListCard  gallery={gallery} onGalleryPlay={onGalleryPlay}/></Grid>
  } )
// console.log(galleryList)
  return (
    <Box sx={{padding: "1em"}}>
      <Typography variant="overline" component="h1" >{title}</Typography>
        <Grid container gap={2} spacing={2} >

          {cards.slice(-5).reverse()}

        </Grid>
        {coda}
    </Box>
  )
}

export default GalleryListing