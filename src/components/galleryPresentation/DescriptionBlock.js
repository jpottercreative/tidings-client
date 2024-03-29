import React from 'react'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// pretty basic - takes in the gallery description
// presents it in a block

function DescriptionBlock( { description } ) {
    // console.log(description)

    const descriptionTextStyle = {
      padding: "15px",
      backgroundColor: "rgba(200,200,200,.7)"
    }

  return (
    <Grid
    container
    direction="row"
    justifyContent="center"
    alignItems="center"
    >
        <Grid  item xs={6}>
          <Paper elevation={8} sx={{padding: "0em", margin: "1em" }}>
            <Typography variant="body1" style={descriptionTextStyle}>{description}</Typography>
          </Paper>
        </Grid>
    </Grid>
    
  )
}

export default DescriptionBlock