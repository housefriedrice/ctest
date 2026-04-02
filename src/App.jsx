import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import PokemonPage from './components/PokemonPage'

export default function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#FFDE00',
        backgroundImage: `
          radial-gradient(circle at 10% 90%, #CC0000 0px, #CC0000 60px, #111 60px, #111 66px, transparent 66px),
          radial-gradient(circle at 90% 10%, #CC0000 0px, #CC0000 60px, #111 60px, #111 66px, transparent 66px)
        `,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 5,
        px: 2,
      }}
    >
      <Routes>
        <Route path="/" element={<PokemonPage />} />
      </Routes>
    </Box>
  )
}
