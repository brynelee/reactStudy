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
};

export const ThemedContext = React.createContext(themes);

export const textToDisplay = {
    content1: 'DisplayHello',
    content2: 'DisplayWorld'
};

export const TextContext = React.createContext(textToDisplay);