import React from 'react'
import {themes, ThemedContext} from './context'
import Toolbar from './child/toolbar'

function Coffee() {
    return (
        <ThemedContext.Provider value={themes.light}>
            <Toolbar />
        </ThemedContext.Provider>
    )
}

export default Coffee