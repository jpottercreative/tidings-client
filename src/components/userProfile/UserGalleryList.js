import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from "react-redux"

// was going to be a gallery list component in the user profile
// using the GalleryPresentation component instead - not exactly right, but wfn (works for now)

function UserGalleryList() {
    const currentUser = useSelector(state => state.user)

  return (
    <div>UserGalleryList</div>
  )
}

export default UserGalleryList