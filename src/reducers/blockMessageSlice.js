import { createSlice } from "@reduxjs/toolkit"

//slice
const slice = createSlice( {
    name: 'blockMessage',
    initialState: {
            show: false,
            message: ""
    },
    reducers : {

        setShowMessage: (state, action) => {
            state.show = action.payload.show
            state.message = action.payload.message
        }
        
    }
} )

// actions
const { setShowMessage } = slice.actions

// exports
export { setShowMessage } 
export default slice.reducer
