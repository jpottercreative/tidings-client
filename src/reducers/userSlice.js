import { createSlice } from "@reduxjs/toolkit"

// this is the whole reason for using redux in this project
// keeps our logged in user in state so we can reference them
// in any component - most importantly it lets us refer to the 
// token associated with this user - although looking at it now, 
// could probably remove the token from state, and rely fully on the 
// local storage version - or even better, can we store the token
// in cookies as an encryprted version?  Then we skip token in state completely

//slice
const slice = createSlice( {
    name: 'user',
    initialState: {
            id:"",
            email:"",
            token: "",
            avatar: "https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg",
            loggedIn: false
    },
    reducers : {

        setCurrentUser: (state, action) => {
            state.email = action.payload.email
            state.token = action.payload.token
            state.loggedIn = action.payload.loggedIn
            state.avatar = action.payload.avatar
            state.id = action.payload.id
        },
        setUserAvatar: (state, action) => {
            state.avatar = action.payload.avatar
        }
    }
} )

// actions
const { setCurrentUser, setUserAvatar } = slice.actions

// exports
export { setCurrentUser, setUserAvatar } 
export default slice.reducer
