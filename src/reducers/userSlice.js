import { createSlice } from "@reduxjs/toolkit"

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
