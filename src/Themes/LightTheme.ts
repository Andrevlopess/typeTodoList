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
        txtColor: '#D9D9D9'
    }

})


