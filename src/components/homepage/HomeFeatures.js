import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { showSpinner } from '../../reducers/spinnerSlice'
import Box from '@mui/material/Box';

import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import Spinner from '../../components/Spinner';

// this was/is going to be the homepage features section - didn't quite get there

function HomeFeatures() {
    const dispatch = useDispatch()
    const isSpinnerShowing = useSelector(state => state.spinner.isSpinnerShowing)
    const handleSpinnerToggle = () => {
        dispatch(showSpinner())
    }
    console.log(isSpinnerShowing)
    return (
    <Box>
        
    </Box>
  )
}

export default HomeFeatures