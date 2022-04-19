import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// pretty simple - like the description block, but uses the coda field
// could probably re-work this and the descripton into a 
// plain-text or some type of 'call out' component
// to keep it dryer than this wet mess

// should also be renamed away from card - that isn't really what this is
// should be called CodaRender probs

function CodaCard( { galleryDetails } ) {
    const { coda, otherProps } = galleryDetails


  const descriptionTextStyle = {
    padding: "15px",
    backgroundColor: "rgba(200,200,200,.7)"
  }

  //remember, our grid proceeds alllll the way down here
return (
  <Grid
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
  >
      <Grid  item xs={6}>
        <Paper elevation={8} sx={{padding: "0em", margin: "1em" }}>
          <Typography variant="body1" style={descriptionTextStyle}>
            {coda}
            </Typography>
        </Paper>
      </Grid>
  </Grid>
    
  )
}

export default CodaCard