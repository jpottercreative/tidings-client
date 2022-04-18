import { createSlice } from "@reduxjs/toolkit"

// slice
const slice = createSlice({
    name: 'spinner',
    initialState: {
        isSpinnerShowing: false
    },
    reducers: {
        showSpinner: state => {
            state.isSpinnerShowing = !state.isSpinnerShowing
        }
    }
})

// actions
const { showSpinner } = slice.actions

// exports
export { showSpinner }
export default slice.reducer