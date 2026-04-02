import { useState, useEffect } from 'react'
import { Box, Button, FormControl, Select, MenuItem, Typography, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import POKEMON from '../data/pokemon'

const TEAM_SIZE = 6

function SlotCard({ slot, pokemonId, onChange, onClear }) {
  const isEmpty = pokemonId === null

  return (
    <Box
      sx={{
        bgcolor: isEmpty ? '#2a3694' : '#3B4CCA',
        border: '5px solid #111',
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        boxShadow: '5px 5px 0 #111',
        minHeight: 220,
        position: 'relative',
      }}
    >
      {/* Slot number */}
      <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#FFDE00', opacity: 0.6 }}>
        SLOT {slot}
      </Typography>

      {/* Pokemon image or empty silhouette */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {pokemonId ? (
          <>
            <IconButton
              onClick={() => onClear(slot - 1)}
              size="small"
              sx={{
                position: 'absolute', top: 6, right: 6,
                color: '#FFDE00', bgcolor: '#CC0000',
                border: '2px solid #111',
                width: 22, height: 22,
                '&:hover': { bgcolor: '#FF1111' },
              }}
            >
              <CloseRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
              alt={POKEMON[pokemonId - 1]}
              style={{ width: 90, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.3))' }}
            />
          </>
        ) : (
          <img
            src="/images/pokeball.png"
            alt="Empty"
            style={{ width: 48, opacity: 0.3, imageRendering: 'pixelated' }}
          />
        )}
      </Box>

      {/* Name */}
      <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem', color: '#FFDE00', minHeight: 16 }}>
        {pokemonId ? POKEMON[pokemonId - 1] : '---'}
      </Typography>

      {/* Dropdown */}
      <FormControl fullWidth size="small">
        <Select
          value={pokemonId ?? ''}
          onChange={(e) => onChange(slot - 1, e.target.value || null)}
          displayEmpty
          variant="outlined"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.5rem',
            bgcolor: '#fff',
            border: '3px solid #111',
            borderRadius: '6px',
            boxShadow: '3px 3px 0 #111',
            '.MuiOutlinedInput-notchedOutline': { border: 'none' },
          }}
        >
          <MenuItem value="" sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>
            — Select —
          </MenuItem>
          {POKEMON.map((name, i) => (
            <MenuItem key={i + 1} value={i + 1} sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem' }}>
              #{String(i + 1).padStart(3, '0')} {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default function MyTeam() {
  const [team, setTeam] = useState(() => {
    try {
      const saved = localStorage.getItem('pokemon-team')
      return saved ? JSON.parse(saved) : Array(TEAM_SIZE).fill(null)
    } catch {
      return Array(TEAM_SIZE).fill(null)
    }
  })

  useEffect(() => {
    localStorage.setItem('pokemon-team', JSON.stringify(team))
  }, [team])

  function handleChange(index, value) {
    setTeam(prev => prev.map((v, i) => (i === index ? value : v)))
  }

  function handleClear(index) {
    setTeam(prev => prev.map((v, i) => (i === index ? null : v)))
  }

  function clearAll() {
    setTeam(Array(TEAM_SIZE).fill(null))
  }

  const filled = team.filter(Boolean).length

  return (
    <Box sx={{ width: '100%', maxWidth: 680 }}>

      {/* Header */}
      <Box
        sx={{
          bgcolor: '#3B4CCA',
          border: '5px solid #111',
          borderRadius: 2,
          px: 3, py: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '5px 5px 0 #111',
        }}
      >
        <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.7rem', color: '#FFDE00' }}>
          MY TEAM ({filled}/{TEAM_SIZE})
        </Typography>
        <Button
          onClick={clearAll}
          variant="outlined"
          size="small"
          sx={{
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.45rem',
            color: '#FFDE00',
            borderColor: '#FFDE00',
            border: '3px solid #FFDE00',
            borderRadius: '6px',
            '&:hover': { bgcolor: 'rgba(255,222,0,0.1)' },
          }}
        >
          CLEAR ALL
        </Button>
      </Box>

      {/* Team grid */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {team.map((pokemonId, i) => (
          <SlotCard
            key={i}
            slot={i + 1}
            pokemonId={pokemonId}
            onChange={handleChange}
            onClear={handleClear}
          />
        ))}
      </Box>

      {/* Saved notice */}
      <Typography
        sx={{
          mt: 2.5,
          textAlign: 'center',
          fontFamily: "'Press Start 2P', cursive",
          fontSize: '0.4rem',
          color: '#3B4CCA',
          opacity: 0.7,
        }}
      >
        ● Team saved automatically ●
      </Typography>
    </Box>
  )
}
