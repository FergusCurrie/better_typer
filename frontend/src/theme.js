// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const styles = {
  global: (props) => ({
    body: {
      bg: mode('black','green')(props),
    }
  })
}

// 3. extend the theme
const theme = extendTheme({ config , styles })

export default theme