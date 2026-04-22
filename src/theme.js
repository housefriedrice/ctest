import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary:    { main: '#1E3A5F', light: '#2D5491', dark: '#0F2040' },
    secondary:  { main: '#0EA5E9', light: '#38BDF8', dark: '#0284C7' },
    success:    { main: '#22C55E', light: '#4ADE80' },
    warning:    { main: '#F59E0B', light: '#FCD34D' },
    error:      { main: '#EF4444', light: '#FCA5A5' },
    background: { default: '#F1F5F9', paper: '#FFFFFF' },
    text:       { primary: '#0F172A', secondary: '#475569' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button: { textTransform: 'none', fontWeight: 600 },
    h5:     { fontWeight: 700 },
    h6:     { fontWeight: 700 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 20px',
          boxShadow: 'none',
          fontFamily: '"Inter", sans-serif',
          '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.15)' },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: { borderRadius: 8, fontFamily: '"Inter", sans-serif' },
      },
    },
  },
})

export default theme
