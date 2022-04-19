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

    const handleSignUpClick = () => {
        disableWelcome()
        setIsSignUpShowing(true)
    }
    const handleLoginClick = () => {
        disableWelcome()
        setIsSignUpShowing(false)
    }
  return (
    <Grid item >
        <Grid container
        justifyContent="center"
        >
            <Grid item xs={4}>
                <Fade in={isWelcomeShowing}>
                <ImageList cols={2}gap={0}>
                    <ImageListItem >
                        <img
                            src={homeImages[0].img}
                            loading="lazy"
                        />
                        <ImageListItemBar onClick={handleLoginClick} 
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
                    <ImageListItem >
                        <img src={homeImages[3].img} loading="lazy" />
                        <ImageListItemBar onClick={handleSignUpClick} 
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
        img: "https://previews.dropbox.com/p/thumb/ABhYcYqAAMXPJTCypszz78L-Z2m4bnXflTgbkBKzJeDovfZA7CG81wG0dVh2qSr9tLuRcRDrc05OBW7VGwhyoweTAZKXIs5uzkEIfJIhYZdu9MU76yCTLuBAsHMgX_Cd8XrV7wYkHlCVijcsayDlB0Ud5ZLxGSK3TByiVBjx2IfDb62ByvyvfRlntXbuCB9ZctzHkclqz8ZCv3cI03HATVAVFJay6Ac4TK72wvwdahlAf4UYyp0N8Zb9C76-irW_CZcIQhSSc90HRbf9npMSR5QoBtRnn-fBDq1DoX-v2Wa8VuLaQWV9ZSR3xI9MFIdhGq5g7N9Oj9eZ_sQoTusFbyj5n2dM6IO-HHrSW8Doz6Nj3ILwKk_cOGJge9ZpPc9kCsg/p.jpeg",
        title: "Image 1",
        text: "Login",
    },
    {
        img: "https://previews.dropbox.com/p/thumb/ABixB-uedlDYwhlGhXC8ipPO_kppFxqP6Fq37wrg3Jf_1BwDylK23YKzz3JKD7mLMuszvJ9LJ7S9YUYFHZEJCvV_6rGHhoUqLyCyGVhnYFbVm2cmEo0EhKqWlh39sgQCU-dTtF6UQWON7q2i-LgGR7LCpgff2YZMDPs8RZdBFpl1iKft37sTyF2Xb5ySQfoUm9dhl3NIWezlZdaN7TVdH6ZZkOJqKJ01cVjZYj5Zw_vDpUwB_tPqW7XwNHTTih0Ids2Xkgyg-FJPUalr_9NrETg8oGW6yyhG-ObbcGpGNVq97RoipvC_fOjLuAXoDSuYi8INfrtid2Q9q9oeNTwL092LwotF4L_N24AS1mA08YO-guBhepX03SDatPqObzA-D6w/p.jpeg",
        title: "Image 2",
        text: "",
    },
    {
        img: "https://previews.dropbox.com/p/thumb/ABgJxdjRPBPwnyvbQpD0qV1LfwJMAi0uYvycyMjWonvhWPnxSjFPO5JW-zKakmZxq9I0hGqMCu_-RlkL-PovL001vVrF2fDkrgEB6J_q1CdNyhvlMU9eJB16T6VKPzRXJ4pV-i1SkUp7ySKAAorDcmo2CSiN1jm-nboJgZsvOlVyTWYW9viLAxo64oX8HfCVWNl1-QVLcrzzv3oI0k-ymRouffZOFfkZCLwNdNQYh-6cUx9RgJSJncc2ehZsxr45SchG4SlK1pbRZopVrNlZMWvlK7cE3tvAppUd4goQeHj9wT8q-zDovUEB1Ga_ZE3q6V3fNOszG4KKnsDx0z6NkrZBuT-G4qWTbcBGV1-YbD9UQJo5OxhsB69yfu8m4wnwTt0/p.jpeg",
        title: "Image 3",
        text: "login"
    },
    {
        img: "https://previews.dropbox.com/p/thumb/ABh8OwNgkSZWoEMoyWEUj_p21cZ_q6P4hi38LRABmCHK99VvE8_DQfnj-W0skcCaS_ofOIsALzwTh9MI0BygA-vvnOl1KjfwbwDkj4SYrT0ntxyOAm-L83hj06tY-uLTlj8AL9iB5iSCnxbekocVd7uE4pD7fqx0se6_6OVO_RMZyiT1uH59-4qeFQHD1-4D2baLhOehmpjSQwWPqL0g-to21hSnndLctoplEVCvzbnYGCLMolp-JkK-5h-YCddybkb_jjA2eMmnVkXA_fvLnh6rsLPDZCIuwXz6omVE0zD9beIwqqM_EzzumRwD0-th2b20dtsTtBHmJeHj79zODfLcLdVQQgr3vXxATd_Fp2ybTM0SEXlnMMT21suEWHCRlrs/p.jpeg",
        title: "Image 4",
        text: "Sign-up"
    }
]

export default HomeLandingWelcome