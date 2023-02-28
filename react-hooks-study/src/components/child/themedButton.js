import React, {useContext} from 'react'
import { ThemedContext } from '../context'

function ThemedButton () {
    const value = useContext(ThemedContext)
    console.log(value)
    return (
        <button style={value} >hello world</button>
    )
}

export default ThemedButton