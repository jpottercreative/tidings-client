import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import GalleryShow from './galleryPresentation/GalleryShow';
import Loading from '../components/socialLinkGenerator/Loading'
import Typography from '@mui/material/Typography';
import GradientOutlinedIcon from '@mui/icons-material/GradientOutlined';
import { setError } from '../reducers/errorSlice'
import { useDispatch } from "react-redux"
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom'


import Modal from '@mui/material/Modal';



function ShareViewer() {
    const [open, setOpen] = useState(false)
    const [blocksToShow, setBlocksToShow] = useState([])
    const [galleryToShow, setGalleryToShow] = useState([])
    const [showLoading, setShowLoading] = useState(false)
    const [isModalShowing, setIsModalShowing] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    // console.log(params)

    function showGallery(){
        console.log(params)
        goFetch()
    }

    //fetch based on params
    function goFetch(){
        fetch(`http://localhost:3000/share/${params.id}/`)
        .then((response) => {
            if (response.ok) { 
             return response.json();
            }
            return Promise.reject(response); 
        })
            // if resp.ok then we proceed to set onLogin
            // reset the field text, and setUserError to false
        .then((data) => { 
          console.log("came back as ", data); 
          setGalleryToShow([data])
          setBlocksToShow(data.blocks)
          comicalLoading()

        })
            // if there is an error then send the error info to a handler
        .catch((error) => {
          console.log(error)
          renderUserError(error)
        });
      }
          //this sets our user error
      function renderUserError(error) {
        console.log("error render", error)
        const newError = {
          text: error.statusText,
          occurred: true, 
          code: error.status
        }
        dispatch(setError(newError))
      }

      function comicalLoading() {
        setShowLoading(true)
        setTimeout(() => {
          setShowLoading(false)
          setOpen(true)
        }, 1900)
      }

      function showAboutModal(){
        console.log("hello")
        setIsModalShowing(true)
      }

      const handleModalClose = () => setIsModalShowing(false);
        
      function handleSignUpClick(){
        console.log("boo")
          navigate("/")
      }

      console.log(galleryToShow)

      const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'rgba(80,80,80,.5)',
        border: '2px solid pink',
        boxShadow: 10,
        p: 4,
        color: "white",
        borderRadius: "3px"
      };

  return (
    <Grid  container
    direction="column"
    justifyContent="center"
    alignItems="center"
    height="40vh"
    >
      <Grid item xs={4}>
        <Fade in={!showLoading}><Button color="pink" onClick={showGallery}>View your gallery <GradientOutlinedIcon /></Button></Fade>
      </Grid>
      <Grid item xs={4}>
        {showLoading ? <Typography variant="body1" color="#FEC0CA"><Loading /></Typography> : null}
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          <Grid item xs={12}>
            <Button onClick={showAboutModal} color="pink">new here?  learn about tidings</Button>
          </Grid>
        </Grid>
      </Grid>
        <GalleryShow open={open} setOpen={setOpen} blocksToShow={blocksToShow} galleryToShow={galleryToShow}/>
          <Modal
          open={isModalShowing}
          onClose={handleModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              tidings are something you share
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              give someone something to smile about, share a tiding.  
            </Typography>
            <Button color="pink" onClick={handleSignUpClick}>sign up</Button>
          </Box>
        </Modal>
    </Grid>
  )
}

export default ShareViewer