import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import GallerySocialShareLink from '../socialLinkGenerator/GallerySocialShareLink';
import Link from '@mui/material/Link';
import { grey } from '@mui/material/colors';

function GalleryListCard( { gallery, onGalleryPlay } ) {
    const { description, title, id, featured_image_url, share_url  } = gallery
    const handlePlayClick = (e) => {
        onGalleryPlay(e)
    }
    const cardBgColor = grey[500]
    const placeholderImage = "https://blog.greendot.org/wp-content/uploads/sites/13/2021/09/placeholder-image.png"
  
    const cardImage = {
      padding: ".7em",
      margin: "0 auto",
      backgroundImage: `url(${featured_image_url ? featured_image_url : placeholderImage})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "darken",
      filter: "grayscale(40%)",
      borderRadius: "3px"

    }
  
    return (
    
  <Card elevation={0}  >
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      alignItems="stretch"
      gap={1}
      spacing={0}
      backgroundColor={cardBgColor}
    >



        <Grid  item xs={12} >
          <Grid container spacing={1}>
            <Grid  item xs={12} sm={8}>
              <Grid 
                container
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                paddingX=".8rem"
                paddingY=".4rem"
                
                >
                  <Grid item xs={12}>
                    <Typography textAlign="right" color="#FEC0CA" component="h4" variant="h5">
                      {title}
                    </Typography>
                  </Grid>
                <Grid item xs={12} sm={12} >
                  <Typography  variant="subtitle1" textAlign="right" color="text.secondary" component="div">
                    {description}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Link underline="hover" variant="overline" color="secondary" name={gallery.id} id={`play_${gallery.id}`} onClick={handlePlayClick} >
                        View Gallery 
                    </Link>
                </Grid>
                <Grid item xs={12} sm={12}>
                      <GallerySocialShareLink share_url={share_url} gallery_id={id} />
                </Grid>
              </Grid>
            </Grid>
            <Grid style={cardImage} item xs={12} sm={4} >
                
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>


  )
}

export default GalleryListCard