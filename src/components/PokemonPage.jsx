import { useState } from 'react'
import { Box, Button, FormControl, Select, MenuItem } from '@mui/material'
import PokemonCard from './PokemonCard'
import POKEMON from '../data/pokemon'

export default function PokemonPage() {
  const [selectedId, setSelectedId]   = useState(1)
  const [displayedId, setDisplayedId] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setDisplayedId(selectedId)
  }

  const displayedName = displayedId ? POKEMON[displayedId - 1] : null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      <PokemonCard pokemonId={displayedId} pokemonName={displayedName}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
          <FormControl fullWidth>
            <Select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              variant="outlined"
              sx={{
                fontFamily: "'Press Start 2P', cursive",
                fontSize: '0.65rem',
                bgcolor: '#fff',
                border: '4px solid #111',
                borderRadius: '6px',
                boxShadow: '4px 4px 0 #111',
                '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              }}
            >
              {POKEMON.map((_, i) => (
                <MenuItem
                  key={i + 1}
                  value={i + 1}
                  sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' }}
                >
                  #{String(i + 1).padStart(3, '0')} — {POKEMON[i]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{
              fontFamily: "'Press Start 2P', cursive",
              fontSize: '0.65rem',
              bgcolor: '#CC0000',
              color: '#FFDE00',
              border: '4px solid #111',
              borderRadius: '6px',
              boxShadow: '4px 4px 0 #111',
              py: 1.5,
              gap: 1.25,
              '&:hover': { bgcolor: '#FF1111' },
              '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
            }}
          >
            <img src="/images/pokeball.png" alt="" style={{ width: 20, imageRendering: 'pixelated' }} />
            WHO'S THAT POKEMON?
          </Button>
        </Box>
      </PokemonCard>

    </Box>
  )
}
