import React, { useState } from 'react'
import { purple } from '@material-ui/core/colors';

export const ThemeContext = React.createContext()

export const ThemeProvider = props => {
    const themeObject = {
        palette: {
            primary: { main: '#4a148c' },
            secondary: { main: '#1de9b6' },
            type: 'light',
        },
        themeName: 'Debug Docket',
    }
    
    const useDarkMode = () => {
        const [ theme, setTheme ] = useState(themeObject)
    
        const { palette: { type }} = theme
        const toggleDarkMode = () => {
            const updatedTheme = {
                ...theme,
                palette: {
                    ...theme.palette,
                    type: type === 'light' ? 'dark' : 'light'
                }
            }
            setTheme(updatedTheme)
        }
        return [ theme, toggleDarkMode ]
    }


    return (
        <ThemeContext.Provider value={{ useDarkMode, themeObject }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
