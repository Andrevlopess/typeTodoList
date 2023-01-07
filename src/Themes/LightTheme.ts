import { theme } from '@chakra-ui/react';
// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values

export const LightTheme  = extendTheme({

    colors: {
        layoutBg: '#292929',
        desktopBg: '#1A1A1A',
        mainBg: '#F8F4EA',
        compBg: '#ECE8DD',
        fontColor: '#579BB1'
    }

})


