import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSelector } from "react-redux"
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';

import UserDetails from './UserDetails';
import UserAvatarUpload from './UserAvatarUpload';
import GalleryPresentation from '../galleryPresentation/GalleryPresentation'

import Link from '@mui/material/Link';

// our main user profile container
// holds the sidebar: deetz/avatar and image uploader
// holds the main container of the gallery list
// check that sweet conditional conditional render - can someone give me tips on a three-condition inline render?

function UserProfile() {
  const [uploaderShowing, setUploaderShowing] = useState(false)
    const currentUser = useSelector(state => state.user)

    const mainContainerStyle = {

     }

     function handleToggleUploader(){
       setUploaderShowing((uploaderShowing) => uploaderShowing = !uploaderShowing)
     }

     useEffect(() => {
       currentUser.avatar ? setUploaderShowing(false) : setUploaderShowing(true)
     }, [])

     
  return (
    <Box sx={{flexGrow: 1}}>
        <Grid 
        container spacing={2} 
        style={mainContainerStyle}
        direction="row-reverse"
        justifyContent="center"
        
        >
          
          <Grid item xs={10} sm={10} md={4}>
            <Grid container 
            direction="row"
            justifyContent="center"
            gap={2}
            >
              <Grid item xs={12} >
                <Paper elevation={0}>
                  <UserDetails/>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{padding: "1em", color: "pink"}} elevation={0}>
                  {/* has avatar: hide upload boxes, show link to expand upload button to patch*/}
                  {/* no avatar: show upload boxes */}
                  {currentUser.avatar ? <Link color="secondary" underline="hover" onClick={handleToggleUploader}>{uploaderShowing ?  "collapse..." : "upload new image?"}</Link> : "Upload a profile photo"}
                  <Collapse in={uploaderShowing} >
                    <UserAvatarUpload/>
                  </Collapse>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={10} sm={10} md={8} >
            <Paper elevation={0}>
              <GalleryPresentation />
            </Paper>
          </Grid>
        </Grid>
    </Box>
  )
}

export default UserProfile