import { createSlice } from "@reduxjs/toolkit"

// just global darkmode state - makes it suuuper simple

// slice
const slice = createSlice({
    name: 'themeToggle',
    initialState: {
        isDarkMode: true
    },
    reducers: {
        toggleDarkMode: state => {
            state.isDarkMode = !state.isDarkMode
        }
    }
})

// actions
const { toggleDarkMode } = slice.actions

// exports
export { toggleDarkMode }
export default slice.reducer