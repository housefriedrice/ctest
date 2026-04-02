import { Box } from '@mui/material'

export default function LogoBanner() {
  return (
    <Box sx={{ mb: 4, textAlign: 'center' }}>
      <img src="/images/pokemon_logo.svg" alt="Pokemon" style={{ width: 280 }} />
    </Box>
  )
}
