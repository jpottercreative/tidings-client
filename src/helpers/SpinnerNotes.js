// Paste these into any component that needs to call the loading spinner.  
// to call the spinner in code use dispatch(showSpinner())

import { useSelector, useDispatch } from "react-redux"
import { showSpinner } from '../../reducers/spinnerSlice'

const dispatch = useDispatch()
const isSpinnerShowing = useSelector(state => state.spinner.isSpinnerShowing)
const handleSpinnerToggle = () => {
    dispatch(showSpinner())
}