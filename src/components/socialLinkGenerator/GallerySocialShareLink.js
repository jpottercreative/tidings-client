import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import Typography from '@mui/material/Typography';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Chance from 'chance'
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';

import CopiedNote from './CopiedNote';

// this is the main holder for the social share stuff
// this component does a few things:
// - holds state for all the cute animations
// - generates a random string on load
// - if gallery already has a share URL set, just shows that
// - if gallery does not have share URL set, it sets it to the random string
// - give the user the share URL
// - also lets you copy the whole URL (only displays the stub)
// - after copy it gives you a message telling you 
// LOTS of conditional logic in the copy text here - many paths to trace
// would love to refactor this component - globalize and re-use?
 
function GallerySocialShareLink( { share_url, gallery_id } ) {
  const chance = new Chance()
  const [showLoading, setShowLoading] = useState(false)
  const [newShareLink, setNewShareLink] = useState("")
  const [isShareable, setIsShareable] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [copied, setCopied] = useState(false)
  
  //initialize our state
  useEffect(() => {
    setNewShareLink(share_url || `http://localhost:3006/share/${makeRandomStr()}`)
    setIsShareable((isShareable) => share_url ? true : false)
  },[])
 
  function handleShowShare(){
    setShowShare((showShare) => !showShare)
  }
  function handleGenerateClick(e){
    // click on button and it creates a string with random string generator
    // write the string to the DB as the "share_url" with URL prefixed already
    // when OK comes back from DB, use confirmed received URL as that displayed 
    // have the card show either "Generate Link" or the link to copy if no link
    // exists in the DB
    setShowLoading(true)
    setTimeout(() => {setShowLoading(false)}, 2000)

    updateGallery(gallery_id)
  }

  const currentToken = localStorage.getItem("token")

  // combine all the stuff above and patch the gallery with the new link
  function updateGallery(gallery_id) {
    
    const update = {
      share_url: newShareLink
    }
    console.log("newsharelink to server", newShareLink)
    fetch(`http://127.0.0.1:3000/gallery/${gallery_id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${currentToken}`
        },
        body: JSON.stringify(update),
        })
        .then(r => r.json())
        .then(d => {
          setIsShareable(true)
          setTimeout(() => {setShowLoading(false)}, 1500)
        })
  }
  // copy that sharelink - this works because the DB holds the full URL as a field
  function handleCopy(){
    console.log("Copied")
    navigator.clipboard.writeText(newShareLink)
    setCopied(true)
  }
// this presents our actual string plus icon, and is clickable for copy
  function ShareableReturn(){
    const copyIcon = <FileCopyIcon color={copied ? "lightgreen" : "black"} fontSize="small"/>
    const linkToRender = `...${newShareLink.substring(27)}`
    return (
      <><Typography onClick={handleCopy} variant="caption">{copyIcon}{linkToRender}</Typography> </>
    )
  }
  function GetLinkReturn(){
    return (
      <><Button color="secondary" onClick={handleGenerateClick}>Get Sharable Link</Button></>
    )
  }

  function LinkOrGenerateButton(){
    return isShareable ? <ShareableReturn /> : <GetLinkReturn />
  }

  function LoadingOrLinkGen(){
    return <Box >{showLoading ? <Loading/> : <LinkOrGenerateButton /> } </Box>
  }


  // pasting the generate code in here because I'm too lazy to crete a custom constructor hook
  const generators = [chance.syllable(),chance.animal(),chance.city(),chance.coin(),chance.word(),chance.cc_type(),chance.weekday(),chance.company(),chance.suffix()]
    function makeRandomStr(){
        const randomGenerator = () => { return Math.floor(Math.random() * generators.length)}
        // hold our randomness in this array
        const randomStrArr = []
        for (let i = 0; i < 4; i++  ){
            randomStrArr[i] = generators[randomGenerator()]
        }
        // smash strings together, remove characters and spaces, limit to btwn 6-27, and return it
        const randomStringMinLength = Math.floor(Math.random() * (6 - 1) + 1)
        const randomStringMaxLength = Math.floor(Math.random() * (27 - 20) + 20)
        const string = randomStrArr.join("").replace(/\s/g, '').replace(/[^a-z0-9]/gi, '').substring(randomStringMinLength, randomStringMaxLength);
        return string
    }

    const shareIconStyle = {
      color: 'pink',
      
    }

    // dev note left in for posterity and clarity:
  // three states to switch beteen: 
  // showing url || showing generate button || or temporarily showing loading...  
  // default is either: share_url (if in record) OR the generate link button
  // if share_url is visible state is "sharable"
  // click on generate button puts in 2 second state of:
  // loading...
  // after click on generate button set state to "shareable"
  // and render the random link string and copy icon 

  return (
  <Box sx={{flexGrow: 1}}>
        <Grid container
        gap={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="center">
          <Grid item >
            <Collapse in={showShare} >
              <LoadingOrLinkGen /> 
            </Collapse>
          </Grid>
          <Grid item >
            <Button onClick={handleShowShare}><ShareIcon className="shareIcon" style={shareIconStyle} fontSize='small'/></Button>
          </Grid>
    </Grid>
    <CopiedNote copied={copied} setCopied={setCopied}/>
  </Box>
  )
}

export default GallerySocialShareLink