// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const LightTheme = extendTheme({
    semanticTokens: {
        colors: {
            layoutBg: '#E1D7C6',
            mainBg: '#F8F4EA',
            compBg:'#ECE8DD',
            fontColor: '#579BB1'
        }
    }

})


