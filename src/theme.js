import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary:    { main: '#3B4CCA' },
    secondary:  { main: '#FFDE00' },
    error:      { main: '#CC0000' },
    background: { default: '#FFDE00' },
  },
  typography: {
    fontFamily: "'Press Start 2P', cursive",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Press Start 2P', cursive",
          textTransform: 'none',
          borderRadius: 6,
          border: '4px solid #111',
          boxShadow: '4px 4px 0 #111',
          '&:active': {
            transform: 'translate(3px, 3px)',
            boxShadow: '1px 1px 0 #111',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.65rem',
          background: '#fff',
          border: '4px solid #111',
          borderRadius: 6,
          boxShadow: '4px 4px 0 #111',
        },
      },
    },
  },
})

export default theme
