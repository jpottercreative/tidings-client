import React from "react"
import {useSelector} from "react-redux"

// I learned to use redux with this
function Counter() {
    const count = useSelector(state => state.count)

    return (
        <h1 id="count">Count: {count}</h1>
    )
}

export default Counter