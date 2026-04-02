import { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import PokemonCard from '../components/PokemonCard'
import POKEMON from '../data/pokemon'

function randomId() {
  return Math.ceil(Math.random() * 151)
}

export default function RandomPokemon() {
  const [pokemonId, setPokemonId] = useState(null)

  const pokemonName = pokemonId ? POKEMON[pokemonId - 1] : null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <PokemonCard pokemonId={pokemonId} pokemonName={pokemonName}>
        <Button
          onClick={() => setPokemonId(randomId())}
          variant="contained"
          fullWidth
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.65rem',
            bgcolor: '#CC0000',
            color: '#FFDE00',
            border: '4px solid #111',
            borderRadius: '6px',
            boxShadow: '4px 4px 0 #111',
            py: 1.5,
            mt: 1,
            gap: 1.5,
            '&:hover': { bgcolor: '#FF1111' },
            '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
          }}
        >
          <ShuffleRoundedIcon fontSize="small" />
          {pokemonId ? 'ANOTHER ONE!' : 'PICK RANDOM!'}
        </Button>

        {pokemonId && (
          <Typography
            sx={{
              mt: 2,
              textAlign: 'center',
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.45rem',
              color: '#FFDE00',
              opacity: 0.8,
            }}
          >
            #{String(pokemonId).padStart(3, '0')} of 151
          </Typography>
        )}
      </PokemonCard>
    </Box>
  )
}
