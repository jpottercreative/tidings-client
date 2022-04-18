import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import GalleryShow from './GalleryShow';
import GalleryListing from './GalleryListing';
import { showSpinner } from '../../reducers/spinnerSlice'
import { setError } from "../../reducers/errorSlice"
import { setCurrentUser } from '../../reducers/userSlice';
import LogOut from '../LogOut'


function GalleryPresentation() {
  const [open, setOpen] = useState(false);
  const [galleryList, setGalleryList] = useState([])
  const [galleryToShow, setGalleryToShow] = useState([{}])
  const [blocksToShow, setBlocksToShow] = useState([])
  const isSpinnerShowing = useSelector(state => state.spinner.isSpinnerShowing)
  const dispatch = useDispatch()
  let navigate = useNavigate()

  

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleGalleryPlay = (e) => {

    handleToggle()
    // console.log(e.target.name)
    // take the id of the targeted gallery
    // set just that gallery in state
    // send that whole gallery to the GalleryShow
    const galToShow = galleryList.filter(gallery => gallery.id == e.target.name)
    // console.log(galToShow)
    fetchBlocksToShow(e)
    setGalleryToShow(galToShow)
  }

  const currentToken = localStorage.getItem("token")
  useEffect(() => {
    dispatch(showSpinner());

    fetch('http://localhost:3000/user-galleries', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${currentToken}`
      }
    })
    .then((response) => {
      // console.log(response)
      if (response.ok) {
        return response.json()
    }
      return Promise.reject(response)
    })
    .then((galleries) => {
      // console.log(galleries)
      setGalleryList(galleries)
      dispatch(showSpinner())
    })
    .catch((error) => {
      // console.log(error)
      revoke()
    })
  }, [])

  function revoke(){
    // console.log("revoking token and redirecting")
    localStorage.removeItem("token")
    dispatch(setCurrentUser({
      email: "",
      token: "",
      loggedIn: false
    }))
    navigate("/", {replace: true})
    setTimeout(() => {dispatch(showSpinner())}, 900)
    dispatch(setError({
      text: "Please Login",
      occurred: true, 
      code: 401
    }))
  }

  function fetchBlocksToShow(e){
    // console.log(e.target.name)
    dispatch(showSpinner());
    const gallery_id = e.target.name
    fetch(`http://localhost:3000/gallery/${gallery_id}/blocks`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${currentToken}`
      }
    })
    .then((response) => {
      let json = response.json()
      if (response.status >= 200 && response.status < 300) {
        return json;
      }
      return json.then(Promise.reject.bind(Promise))
      // return Promise.reject(response)
  })
  .then((blocks) => {
    setBlocksToShow(blocks)
    dispatch(showSpinner());

  })
  .catch((error) => {
    // console.log(error)
    renderUserError(error)
    
  })
  }
  function renderUserError(error) {
    // console.log(error.error.statusText)
    // console.log(error.error.status)
    const newError = {
      text: error.statusText || error.error.statusText,
      occurred: true, 
      code: error.error.status || error.status
    }

    dispatch(setError(newError))
  }

  return (
    
    <div>

      <GalleryListing galleryList={galleryList} onGalleryPlay={handleGalleryPlay}/>
      <GalleryShow open={open} setOpen={setOpen} blocksToShow={blocksToShow} galleryToShow={galleryToShow}/>
    </div>
  )
}

export default GalleryPresentation