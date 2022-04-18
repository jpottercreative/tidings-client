import { createSlice } from "@reduxjs/toolkit"

//slice
const slice = createSlice( {
    name: 'gallery',
    initialState: {
            id: 0,
            title: "",
            description: "",
            step: "start",
            blocks: [],
            featured_image_url: "",
            published: false,
            published_on: "",
            showMessage: false,
            message: ""
    },
    reducers : {

        setStep: (state, action) => {
            state.step = action.payload
        },
        setGalleryInEdit: (state, action) => {
            state.title = action.payload.title
            state.description = action.payload.description
            state.id = action.payload.id
            state.blocks = action.payload.blocks
            state.featured_image_url = action.payload.featured_image_url
            state.published = action.payload.published
            state.published_on = action.payload.published_on
        }
        
    }
} )

// actions
const { setStep, setGalleryInEdit } = slice.actions

// exports
export { setStep, setGalleryInEdit } 
export default slice.reducer
