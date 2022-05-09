import { createSlice } from "@reduxjs/toolkit"

// the state object for our error handler
// this could talk to the messenger system to convert codes to colors
// and pass the message over

//slice
const slice = createSlice( {
    name: 'message',
    initialState: {
            show: false,
            text: "",
            color: "",
            icon: ""
    },
    reducers : {
        showMessage: (state, action) => {
            state.show = true
            state.text = action.payload.text
            state.color = action.payload.color
            state.icon = action.payload.icon
        },
        cancelMessage: (state) => {
            state.show = false
            state.text = ""
            state.color = ""
            state.icon = ""
        }

    }
} )

// actions
const { showMessage, cancelMessage } = slice.actions

// exports
export { showMessage, cancelMessage } 
export default slice.reducer