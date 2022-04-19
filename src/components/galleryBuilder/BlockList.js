import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlockListCard from './BlockBuilder/BlockListCard';
import Stack from '@mui/material/Stack';
import BlockBuilder from './BlockBuilder/BlockBuilder';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { useDispatch, useSelector } from "react-redux"
import CachedIcon from '@mui/icons-material/Cached';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Collapse from '@mui/material/Collapse';
import CollectionsIcon from '@mui/icons-material/Collections';
import './refreshRotater/refresh_rotate.css'
import { v4 as uuidv4 } from 'uuid';


// this component renders our list of blocks during the gallery build
// also writes the updated blocks to the DB
// each block is added separately so our whole gallery is always in sync

function BlockList( {  } ) {
  const [blockListInEdit, setBlockListInEdit] = useState([])
  const [blockBuilderShowing, setBlockBuilderShowing] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const gallery = useSelector(state => state.gallery)
  const step = useSelector(state => state.step)

 // we run useEffect to get blocks from server and set in state on refresh
 // uses auth token in local storage, this fetch doesn't kick the user out
 // if our token is no good, because we are already inside the gallery 
 // builder - which requires a good token.  But, the coda and publish
 // function require token auth
  useEffect(() => {
    fetch(`http://localhost:3000/gallery/${gallery.id}/blocks`,{
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${currentUser.token}`
        }
    })
    .then((r) => r.json())
    .then((d) => {
      // console.log(`fetch r:`, d)
      setBlockListInEdit(d)
    }) 
  }, [])

  // this was mostly for dev, now its redudant - but might be useful
  // mostly it does a cute spinning animation

  function handleRefresh(){
    setRefreshing(true)
    fetch(`http://localhost:3000/gallery/${gallery.id}/blocks`,{
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${currentUser.token}`
        }
    })
    .then((r) => r.json())
    .then((d) => {
      // console.log(`fetch r:`, d)
      // debugger
      setBlockListInEdit(d)
      refreshTimer()
    }) 
  }

 function handleExpandNewBlock() {
    setBlockBuilderShowing(true)
 }
 function handleCloseBlockBuilder() {
   setBlockBuilderShowing(false)
 }
function handleResetList(){
  handleRefresh()

}

 const blockListStyle = {
  padding: "15px",
  width: "100%",
  minWidth: "250px"
 }

//  Put our cute little bb in a basket (or box i guess)
// reason for this is that we have a hide/close button
 const BlockBuilderInset = () => {
   return (
        <Box >
          <Button onClick={handleCloseBlockBuilder} color="lightblue" ><CancelPresentationOutlinedIcon /></Button>
          <BlockBuilder handleCloseBlockBuilder={handleCloseBlockBuilder} handleResetList={handleResetList} />
        </Box>
 )}

function refreshTimer(){
  setTimeout(() => {setRefreshing(false)}, 1000)
}
 const rotaterStyle = refreshing ? "rotateMe" : ""

// prevent the map from erroring out - only map over the array if there is something in it!
 const blockListCards = gallery.id === 0 ? null : blockListInEdit.map(block => <BlockListCard key={uuidv4()} block={block} /> )
  return (
    <Stack 
    spacing={2} 
    style={blockListStyle}
    direction="column"
    justifyContent="center"
    alignItems="center"
  >
      <Button id="refresh" onClick={handleRefresh}><CachedIcon className={rotaterStyle} color="lightblue" /> <CollectionsIcon color="pink" /></Button>
        {blockListCards}
        <Button color="pink" onClick={handleExpandNewBlock}><AddPhotoAlternateIcon /></Button>
        <Collapse in={blockBuilderShowing} > <BlockBuilderInset /> </Collapse>
        {/* {blockBuilderShowing ? <BlockBuilderInset /> : null } */}
    </Stack>

  )
}

export default BlockList