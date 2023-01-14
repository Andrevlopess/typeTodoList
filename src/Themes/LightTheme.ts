import { theme } from '@chakra-ui/react';
// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values

export const LightTheme  = extendTheme({

    colors: {
        layoutBg: '#292929',
        desktopBg: '#1A1A1A',
        descColor: '#B2B2B2',
        compBg: '#242424',
        txtColor: '#FFFFFF', 
        txtY: '#FFB802', 
    

        cardRed: '#D2001A',
        cardPurple: '#3D1766',
        cardLightBlue: '#0081B4',
        cardDarkBlue: '#0A2647',
        cardYellow: '#ff8c00b9',
        cardGreen: '#1A4D2E',
        cardPink: '#9D3C72'

    },
    fonts:{
        inter: "'Inter', sans-serif"
    },

})


