import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { showMessage } from '../../reducers/messageSlice';
import Box from '@mui/material/Box';
import { useFetch } from '../useFetch';


// this was/is going to be the homepage features section - didn't quite get there

function HomeFeatures() {
  const [messageText, setMessageText] = useState("")
    const message = useSelector(state => state.message)
    const dispatch = useDispatch()

    const { response, loading, errorObj } = useFetch({
      method: 'get',
      url: '/posts',
    });
    const [data, setData] = useState([]);

    useEffect(() => {
        if (response !== null) {
            setData(response);
        }
    }, [response]);


      function openMessage(e){
        dispatch(showMessage( {
          text: messageText,
          color: "success",
          icon: ""
        }))
      }
      console.log(messageText)
      console.log(message)
    return (
    <Box>
        <h1> hello frogs </h1>
        <input onChange={(e) => setMessageText(e.target.value)} value={messageText} type="text" name="messageText"/>
        <button onClick={openMessage}>Click to show</button>
    </Box>
  )
}

export default HomeFeatures