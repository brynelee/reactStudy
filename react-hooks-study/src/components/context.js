import React from 'react'

export const themes = {
    light: {
        color: 'red',
        background: '#ffcc33'
    },
    dark: {
        color: 'blue',
        background: '#222222'
    }
}

export const ThemedContext = React.createContext(themes);
