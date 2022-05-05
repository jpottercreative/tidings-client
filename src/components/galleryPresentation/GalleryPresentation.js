import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import GalleryShow from './GalleryShow';
import GalleryListing from './GalleryListing';
import { showSpinner } from '../../reducers/spinnerSlice'
import { setError } from "../../reducers/errorSlice"
import { setCurrentUser } from '../../reducers/userSlice';

// this is our main container for the gallery presentation
// it renders a list, and holds the "show" component
// the list is the 5 most recent galleries, and the "show" is conditionally rendered

function GalleryPresentation() {
  const [open, setOpen] = useState(false);
  const [galleryList, setGalleryList] = useState([])
  const [galleryToShow, setGalleryToShow] = useState([{}])
  const [blocksToShow, setBlocksToShow] = useState([])
  const dispatch = useDispatch()
  let navigate = useNavigate()

  

  const handleToggle = () => {
    setOpen(!open);
  };

  // we use the gallery id from the clicked button in the list to call it
  // then toggle the "show" and pass it the gallery you just clicked on
  // currently it's sending in two phases - the whole gallery obj and the blocks
  // as a separate state - in future would be nice to send one or the other
  // maybe re-write serializers on backend

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

  // another master checkpoint for if the user is valid
  // if not valid token revoke and have user log back in
  // global custom useFetch hook plz
  const currentToken = localStorage.getItem("token")
  useEffect(() => {
    dispatch(showSpinner());

    fetch('https://tidings-server.herokuapp.com/user-galleries', {
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

  // please move to global manager
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

  // this fetches the blocks for the specific gallery - which is cool, but pretty redundant
  // went this route becuase it was easier to parse the blocks at top-level, rather than parsing
  // them out of the gallery object - but perhaps I should just re-write either the handling of the obj
  // above, or re-write the serializer to *not* send blocks with a gallery?
  // but I think single server call is better route.  
  function fetchBlocksToShow(e){
    // console.log(e.target.name)
    dispatch(showSpinner());
    const gallery_id = e.target.name
    fetch(`https://tidings-server.herokuapp.com/gallery/${gallery_id}/blocks`, {
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
  // send the error to the error handler/messenger
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

  // gallery show only opens/renders when the setOpen is true
  // setOpen is set to true when you click on ViewGallery
  return (
    
    <div>

      <GalleryListing galleryList={galleryList} onGalleryPlay={handleGalleryPlay}/>
      <GalleryShow open={open} setOpen={setOpen} blocksToShow={blocksToShow} galleryToShow={galleryToShow}/>
    </div>
  )
}

export default GalleryPresentation