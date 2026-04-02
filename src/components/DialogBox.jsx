import { Box, Typography } from '@mui/material'

export default function DialogBox({ pokemonId, pokemonName }) {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '5px solid #111',
        borderRadius: 2,
        p: '18px 22px',
        mb: 3,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: -14,
          left: 30,
          width: 0,
          height: 0,
          borderLeft: '12px solid transparent',
          borderRight: '12px solid transparent',
          borderTop: '14px solid #111',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -9,
          left: 33,
          width: 0,
          height: 0,
          borderLeft: '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop: '10px solid #fff',
        },
      }}
    >
      {pokemonId ? (
        <>
          <Typography sx={{ fontSize: '0.55rem', color: '#888', mb: 1 }}>
            #{String(pokemonId).padStart(3, '0')}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: '#111', lineHeight: 1.8 }}>
            {pokemonName}
          </Typography>
        </>
      ) : (
        <Typography sx={{ fontSize: '0.85rem', color: '#111', lineHeight: 1.8 }}>
          Choose a Pokemon!
        </Typography>
      )}
    </Box>
  )
}
