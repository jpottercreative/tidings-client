import { createSlice } from "@reduxjs/toolkit"

// this is the message state for our block builder
// maybe the start of a core for a global messenger state i think

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
