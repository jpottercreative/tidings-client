import React from "react"
import {useSelector} from "react-redux"

function Counter() {
    const count = useSelector(state => state.count)

    return (
        <h1 id="count">Count: {count}</h1>
    )
}

export default Counter