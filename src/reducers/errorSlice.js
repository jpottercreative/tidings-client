import { createSlice } from "@reduxjs/toolkit"

//slice
const slice = createSlice( {
    name: 'error',
    initialState: {
            occurred: false,
            text: "",
            code: ""
    },
    reducers : {

        setError: (state, action) => {
            state.occurred = action.payload.occurred
            state.text = action.payload.text
            state.code = action.payload.code
        },
        cancelError: (state) => {
            state.occurred = false
            state.text = ""
            state.code = ""
        }

    }
} )

// actions
const { setError, cancelError } = slice.actions

// exports
export { setError, cancelError } 
export default slice.reducer
