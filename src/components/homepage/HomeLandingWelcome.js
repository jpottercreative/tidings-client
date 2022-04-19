import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Fade from '@mui/material/Fade';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import FingerprintOutlinedIcon from '@mui/icons-material/FingerprintOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

function HomeLandingWelcome( { isWelcomeShowing, disableWelcome, setIsSignUpShowing } ) {

    const [imageZoom, setImageZoom] = useState("100%")

    const handleSignUpClick = () => {
        disableWelcome()
        setIsSignUpShowing(true)
    }
    const handleLoginClick = () => {
        disableWelcome()
        setIsSignUpShowing(false)
    }
    const enterHover = () => {
        console.log("enter")
        setImageZoom("102%")
    }
    const leaveHover = () => {
        console.log("leave")
        setImageZoom("100%")
    }
    const imageButton = {
        cursor: "pointer",
    }
    const imageInButton = {

    }
    
  return (
    <Grid item >
        <Grid container
        justifyContent="center"
        
        >
            <Grid  item xs={4}>
                <Fade in={isWelcomeShowing}>
                    <ImageList style={welcomeImagesStyle} cols={2}gap={0}>
                        <ImageListItem 
                        style={imageButton}
                        onClick={handleLoginClick}
                        >
                            <img src={homeImages[0].img} loading="lazy" style={imageInButton}/>
                            <ImageListItemBar  
                            style={loginItemText} position="top" 
                            title={homeImages[0].text} 
                            actionIcon={<FingerprintOutlinedIcon />}/>
                        </ImageListItem>

                        <ImageListItem >
                            <img src={homeImages[1].img} loading="lazy" />
                        </ImageListItem>
                        <ImageListItem >
                            <img src={homeImages[2].img} loading="lazy" />
                        </ImageListItem>
                        <ImageListItem 
                        onClick={handleSignUpClick}
                        style={imageButton}
                        >
                            <img src={homeImages[3].img}  loading="lazy" />
                            <ImageListItemBar  
                            style={signUpItemText} 
                            position="bottom" 
                            title={homeImages[3].text} 
                            actionIcon={<AccountBoxOutlinedIcon />} />
                        </ImageListItem>
                    </ImageList>
                </Fade>
            </Grid>
        </Grid>
    </Grid>
  )
}


const welcomeImagesStyle = {
    borderRadius: "3px"
}

const loginItemText = {
    textAlign:"left",
    backgroundColor: "rgba(254, 192, 202, .7)",
    color: "white",
    paddingRight: "5px"
}

const signUpItemText = {
    textAlign: "left",
    backgroundColor: "rgba(174, 216, 230, .7)",
    color: "white",
    paddingRight: "5px"

}

const homeImages = [
    {
        img: "https://mrjpfiles.s3.us-west-2.amazonaws.com/tidings/home1.jpg",
        title: "Image 1",
        text: "Login",
    },
    {
        img: "https://mrjpfiles.s3.us-west-2.amazonaws.com/tidings/home2.jpg",
        title: "Image 2",
        text: "",
    },
    {
        img: "https://mrjpfiles.s3.us-west-2.amazonaws.com/tidings/home3.jpg",
        title: "Image 3",
        text: "login"
    },
    {
        img: "https://mrjpfiles.s3.us-west-2.amazonaws.com/tidings/home4.jpg",
        title: "Image 4",
        text: "Sign-up"
    }
]

export default HomeLandingWelcome