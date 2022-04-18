import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from "react-redux"

function UserGalleryList() {
    const currentUser = useSelector(state => state.user)

  return (
    <div>UserGalleryList</div>
  )
}

export default UserGalleryList