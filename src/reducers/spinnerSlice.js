import { createSlice } from "@reduxjs/toolkit"

// global toggle state for the spinner - 
// i'm not totally sure this is the best way to handle this...

// slice
const slice = createSlice({
    name: 'spinner',
    initialState: {
        isSpinnerShowing: false
    },
    reducers: {
        showSpinner: state => {
            state.isSpinnerShowing = !state.isSpinnerShowing
        },
        hideSpinner: state => {
            state.isSpinnerShowing = false
        }
    }
})

// actions
const { showSpinner, hideSpinner } = slice.actions

// exports
export { showSpinner, hideSpinner }
export default slice.reducer