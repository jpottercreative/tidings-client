import React from "react"
import { useDispatch } from "react-redux"
import { decrement, increment, toggleRunning, incrementBy } from "./counterSlice.js"

// so tempted to put this in as an easter egg
function CounterControls() {
    const dispatch = useDispatch()
    console.log(dispatch)

    function handleMinusClick() {
        dispatch(decrement())
    }
    
    function handleAddClick() {
        dispatch(increment())
    }

    function handleToggleRunning(){
        dispatch(toggleRunning())
    }
    return (
        <div>
            <button id="minus" name="decrement" onClick={handleMinusClick}>-</button>
            <button id="plus" name="increment" onClick={handleAddClick}>+</button>
            <button id="play" name="toggleRunning" onClick={handleToggleRunning}>⏸</button>
        </div>
    )
}

export default CounterControls