import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlockListCard from './BlockBuilder/BlockListCard';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BlockBuilder from './BlockBuilder/BlockBuilder';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import { useDispatch, useSelector } from "react-redux"
import CachedIcon from '@mui/icons-material/Cached';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { setStep, setGalleryInEdit } from '../../reducers/gallerySlice'
import Collapse from '@mui/material/Collapse';
import CollectionsIcon from '@mui/icons-material/Collections';
import './refreshRotater/refresh_rotate.css'
import { v4 as uuidv4 } from 'uuid';

//fake dataset for dev
import dummyDataBlocks from './dummyDataBlocks.json'

function BlockList( {  } ) {
  const [blockListInEdit, setBlockListInEdit] = useState([])
  const [blockBuilderShowing, setBlockBuilderShowing] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const gallery = useSelector(state => state.gallery)
  const step = useSelector(state => state.step)
  // console.log(gallery)

 //
  
  useEffect(() => {
    // debugger
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
    }) 
  }, [])

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
  //  console.log("click")
    setBlockBuilderShowing(true)
 }
 function handleCloseBlockBuilder() {
  //  console.log("closebb")
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

//  Put our cute little bb in a basket
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