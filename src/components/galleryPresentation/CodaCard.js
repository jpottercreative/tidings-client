import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';


function CodaCard( { galleryDetails } ) {
    const { coda, otherProps } = galleryDetails

  const descriptionItemStyle = {
      padding: "15px",
  }
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
          <Typography variant="body1" style={descriptionTextStyle}>
            {/* <Typography variant="overline">Final thoughts:</Typography><br/> */}
            {coda}
            </Typography>
        </Paper>
      </Grid>
  </Grid>
    
  )
}

export default CodaCard