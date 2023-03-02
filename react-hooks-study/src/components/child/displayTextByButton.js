import React, { useContext } from "react";
import { TextContext  } from "../context";



function DisplayTextByButton({value}) {

    const dispatch = useContext(TextContext)
    return (
        <>
            <p>{value}</p>
            <button onClick = {() => dispatch({type: 'DisplayContent1'})}>Display Hello!</button>
            <button onClick = {() => dispatch({type: 'DisplayContent2'})}>Display World!</button>
        </>
    )
}

export default DisplayTextByButton