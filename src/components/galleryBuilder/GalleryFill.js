import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import BlockBuilder from './BlockBuilder/BlockBuilder';

// this file  serves the first block builder step before moving to the manage screen
// renders the block builder to add first block

function GalleryFill( ) {

  return (

      <Box sx={{flexGrow: 1}}>
        <Grid container
        gap={2}
        direction="row"
        justifyContent="space-around"
        alignItems="stretch">
          <Grid item xs={12}>
            <Tooltip title="careful, no going back">
              <Typography variant="overline" component="p">add your first block</Typography>
            </Tooltip>
          <BlockBuilder  />
        </Grid>
      </Grid>
    </Box>
  )
}

export default GalleryFill