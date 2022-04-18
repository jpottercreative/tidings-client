import React from "react"
import { useDispatch } from "react-redux"
import { decrement, increment, toggleRunning, incrementBy } from "./counterSlice.js"

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