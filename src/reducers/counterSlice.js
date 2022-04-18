import { createSlice } from "@reduxjs/toolkit";

// slice
const slice = createSlice({
    name: 'counter',
    initialState: {
        count: 10,
        running: true
    },
    reducers: {
        increment: state => {
            state.count += 1
        },
        decrement: state => {
            state.count -= 1
        },
        toggleRunning: state => {
            state.running = !state.running
        },
        incrementBy: (state, action) => {
            state.count += action.payload
        }
    }
})

// actions
const { increment, decrement, toggleRunning, incrementBy } = slice.actions

// exports
export { increment, decrement, toggleRunning, incrementBy }
export default slice.reducer