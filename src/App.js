import './App.css';
import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from "react-redux"
import Header from './components/Header'
import HomePage from './HomePage';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import UserProfile from './components/userProfile/UserProfile';
import { setCurrentUser } from "./reducers/userSlice"
import Paper from '@mui/material/Paper';
import Spinner from './components/Spinner';
import GalleryBuilder from './components/galleryBuilder/GalleryBuilder'
import GalleryPresentation from './components/galleryPresentation/GalleryPresentation'
import { showSpinner, hideSpinner } from './reducers/spinnerSlice'
import { setError } from './reducers/errorSlice'
// import GalleryShow from './components/galleryPresentation/GalleryShow';
import ShareViewer from './components/ShareViewer';
import NotFound from './components/NotFound';
import HomeFeatures from './components/homepage/HomeFeatures';
import Messenger from './components/Messenger';

// our main holder for...damn near everything

function App( ) {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(state => state.themeToggle.isDarkMode)

  useEffect(()=>{
    dispatch(showSpinner());

    //if we are logged in there should be a token in local storage
    const currentToken = localStorage.getItem("token")
    //we use this to check that we are logged in
    // in the future this move to global useFetch hook and global messaging

    fetch('https://tidings-server.herokuapp.com/member-data', {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentToken}`
            }
        })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response)})
        .then((data) => {
          dispatch(setCurrentUser({
            email: data.user.email,
            loggedIn: true,
            id: data.user.id,
            avatar: data.avatar ? data.avatar : '',
            token: currentToken
          }))
          dispatch(hideSpinner());
        })
        .catch((error) => {
          console.log(error)
          // renderUserError(error)
          revoke()
          dispatch(hideSpinner())
        })
  }, [])

  //if we don't have a token, we need to log in again and clear the current user out
  // again, plz move to global handlers
  function revoke(){
    // console.log("revoking token and redirecting")
    localStorage.removeItem("token")
    dispatch(setCurrentUser({
      email: "",
      token: "",
      loggedIn: false
    }))
    dispatch(setError({
      text: "Please Login",
      occurred: true, 
      code: 401
    }))
  }

// please make a separate file for this jon, seriously
const appMode = createTheme({
      palette: {
        mode: isDarkMode ? 'light' : 'dark',
        grey: {
          main: '#666',
        },
        secondary: {
          main: '#B3D7FC',
        },
        lightblue: {
          main: '#B3D7FC',
        },
        grey: {
          main: '#cccccc',
        },
        pink: {
          main: '#FEC0CA',
        },
        lightgreen: {
          main: '#90ee90',
        },
        info: {
          main: '#FEC0CA'
        }
      },
    });
    

//I know these inline styles are twice as slow as using styled components
// but I like them for fast prototyping, will transition to a unified 
// styled component system in next iteration
const wrapperStyle = {
  background: isDarkMode ? "linear-gradient(25deg, #2A2B2B 0%, #C28686 290%)" : "linear-gradient(25deg, #2A2B2B 70%, #C28686 290%)",
  minWidth: "100%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
}
const appPaper = {
  padding: "2em",
}
const appStyle = {
  margin: "6em"
}
//note on the layout:
// the main grid starts here in app and should go all the way down
// everything is built with grid in mind
  return (
    <div id="app">
      <Container style={wrapperStyle} id="app-wrapper">
        <BrowserRouter>
          <CssBaseline />
          <ThemeProvider theme={appMode} >
              <Grid container 
              justifyContent="center"
              alignContent="center">
                <Grid item xs={12}>
                  <Paper style={appStyle}  elevation={0} >
                      <Spinner/>
                        <Grid item xs={12}>
                          <Header/>
                        </Grid>
                        <Grid item xs={12}>
                          <Paper style={appPaper}>
                            <Routes>
                              <Route path="/" element={<HomePage/>}/>
                              <Route path="/homey" element={<HomeFeatures/>}/>
                              <Route path="/share/:id" element={<ShareViewer />}/>
                              <Route path="/profile" element={<UserProfile/>} />
                              <Route path="/gallery-builder" element={<GalleryBuilder/>} />
                              <Route path="/gallery-presentation" element={<GalleryPresentation/>} />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </Paper>
                      </Grid>
                  </Paper>
                  {/* made with love footer */}
                  <Box sx={{position: "absolute", right: "25px", bottom: "25px", size: "80%"}}>
                    <Typography variant="overline">Made with <a target="_blank" rel="noreferrer" style={{color: "pink", textDecoration: "none"}} href="http://mrjonathanpotter.com/">♥</a> in Oregon</Typography>
                  </Box>
                  </Grid>
              </Grid>
            <Messenger/>
            </ThemeProvider>
        </BrowserRouter>
      </Container>
    </div>
  )
  
}

export default App;
