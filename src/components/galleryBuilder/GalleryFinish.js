import React, { useState }  from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

import { showSpinner } from "../../reducers/spinnerSlice"
import Loading from '../socialLinkGenerator/Loading';
import '../socialLinkGenerator/loading.css'

function GalleryFinish() {
  const [coda, setCoda] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.user)
  const gallery = useSelector(state => state.gallery)


  function handleAbsurdFinishClick(){
    setLoading(true)
    setTimeout(() => {setLoading(false)}, 981)
    setTimeout(() => {handleFinishClick()}, 1032)
  }
  function handleFinishClick(){
    dispatch(showSpinner())
    const publishData = {
      published: true,
      published_on: new Date().toUTCString(),
      coda: coda
    }
    // console.log("clickfini")
    // console.log(publishData)
    fetch(`http://127.0.0.1:3000/gallery/${gallery.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(publishData),
        })
        .then(r => r.json())
        // .then(d => console.log("finished gal back as: ", d))
        dispatch(showSpinner())
        moveMe()
      }
      function moveMe(){
        navigate("/profile", {replace: true})
      }

  function handleCodaChange(e){
    setCoda(e.target.value)
  }

  function LoadingAbsurdity() {
    return loading ? <Loading /> : ""
  }

  
  return (
    <Box>
        <Paper style={{margin: "0 auto", textAlign: "center"}} >
          <Grid container
                gap={2}
                spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="center">
            <Grid item>
              <TextField color="pink" helperText="share some final words" label="add a coda" required multiline onChange={handleCodaChange} variant="standard" name="coda"/>
            </Grid>
            <Grid item>
              <Button disabled={coda ? false : true} onClick={handleAbsurdFinishClick} color="pink"><LoadingAbsurdity /><SaveOutlinedIcon/></Button>
            </Grid>
          </Grid>
        </Paper>
    </Box>
  )
}

export default GalleryFinish