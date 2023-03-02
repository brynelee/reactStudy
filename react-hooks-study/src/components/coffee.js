import React, { useReducer } from 'react'
import {themes, ThemedContext, textToDisplay, TextContext} from './context'
import Toolbar from './child/toolbar'
import DisplayTextByButton from './child/displayTextByButton'

function Coffee() {

    const [stateContentDisplay, dispatch] = useReducer(reducer, textToDisplay.content1, init);

    function reducer(state, action){
        switch (action.type) {
            case 'DisplayContent1':
                return {content: textToDisplay.content1};
            case 'DisplayContent2':
                return {content: textToDisplay.content2};
            default:
                throw new Error();
        }
    }

    function init(initText){
        return ({content: initText})
    }

    return (
        <>
            <p><h1>ThemedContext - using useContext</h1></p>
            <ThemedContext.Provider value={themes.light}>
                <Toolbar />
            </ThemedContext.Provider>
            <p><h1>ActionToDo - using useReducer & useContext</h1></p>
            <TextContext.Provider value={dispatch}>
                <DisplayTextByButton value={stateContentDisplay.content}/>
            </TextContext.Provider>
        </>

    )
}

export default Coffee