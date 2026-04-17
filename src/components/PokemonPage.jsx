import { useState, useRef, useEffect } from 'react'
import { Box, Button, TextField, Typography, FormControl, Select, MenuItem } from '@mui/material'
import StepCard from './StepCard'
import PokemonDisplay from './PokemonDisplay'
import POKEMON from '../data/pokemon'

const REGIONS = [
  { label: 'Pallet Area',   desc: '#001 – #050', range: [1,   50]  },
  { label: 'Cerulean Area', desc: '#051 – #100', range: [51,  100] },
  { label: 'Cinnabar Area', desc: '#101 – #151', range: [101, 151] },
]

const inputSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem',
    bgcolor: '#fff', borderRadius: '6px', border: '4px solid #111', boxShadow: '4px 4px 0 #111',
    '& fieldset': { border: 'none' },
  },
}

const redBtnSx = {
  fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem',
  bgcolor: '#CC0000', color: '#FFDE00',
  border: '4px solid #111', borderRadius: '6px', boxShadow: '4px 4px 0 #111', py: 1.5,
  '&:hover': { bgcolor: '#FF1111' },
  '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
}

const resultSx = {
  bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
  animation: 'stepIn 0.4s ease',
  '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
}

function PokeballIcon({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#CC0000" stroke="#111" strokeWidth="6" />
      <path d="M4 50 A46 46 0 0 1 96 50 Z" fill="#CC0000" />
      <path d="M4 50 A46 46 0 0 0 96 50 Z" fill="#fff" />
      <rect x="4" y="44" width="92" height="12" fill="#111" />
      <circle cx="50" cy="50" r="14" fill="#111" />
      <circle cx="50" cy="50" r="9" fill="#fff" />
      <circle cx="44" cy="44" r="3" fill="#fff" opacity="0.7" />
    </svg>
  )
}

export default function PokemonPage() {
  const [step,         setStep]         = useState(1)
  const [trainerName,  setTrainerName]  = useState('')
  const [region,       setRegion]       = useState(null)
  const [selectedId,   setSelectedId]   = useState(null)
  const [displayedId,  setDisplayedId]  = useState(null)
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step])

  const filteredPokemon = region
    ? Array.from({ length: region.range[1] - region.range[0] + 1 }, (_, i) => ({
        id: region.range[0] + i,
        name: POKEMON[region.range[0] + i - 1],
      }))
    : []

  const displayedName = displayedId ? POKEMON[displayedId - 1] : null

  function pickRegion(r) {
    setRegion(r)
    setSelectedId(r.range[0])
    setStep(3)
  }

  function lookup() {
    setDisplayedId(selectedId)
    setStep(4)
  }

  function reset() {
    setStep(1); setTrainerName(''); setRegion(null); setSelectedId(null); setDisplayedId(null)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 560 }}>

      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 1 }}>
        <PokeballIcon size={72} />
        <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.75rem', color: '#111', letterSpacing: 1 }}>
          POKEMON LOOKUP
        </Typography>
      </Box>

      {/* Step 1 — Trainer name */}
      <StepCard number={1} title="ENTER YOUR NAME" done={step > 1} summary={`Trainer: ${trainerName}`}>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); if (trainerName.trim()) setStep(2) }}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}
        >
          <TextField
            value={trainerName} onChange={(e) => setTrainerName(e.target.value)}
            placeholder="Your trainer name..." autoFocus fullWidth sx={inputSx}
            inputProps={{ maxLength: 12, style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem' } }}
          />
          <Button type="submit" disabled={!trainerName.trim()} variant="contained" sx={redBtnSx}>
            NEXT →
          </Button>
        </Box>
      </StepCard>

      {/* Step 2 — Choose region */}
      {step >= 2 && (
        <StepCard number={2} title="CHOOSE YOUR REGION" done={step > 2} summary={`Region: ${region?.label}`}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {REGIONS.map((r) => (
              <Button key={r.label} onClick={() => pickRegion(r)} variant="contained"
                sx={{
                  fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem',
                  bgcolor: '#fff', color: '#111',
                  border: '4px solid #111', borderRadius: '6px', boxShadow: '4px 4px 0 #111', py: 1.75,
                  display: 'flex', justifyContent: 'space-between',
                  '&:hover': { bgcolor: '#FFFDE7' },
                  '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
                }}
              >
                <span>{r.label}</span>
                <span style={{ opacity: 0.5 }}>{r.desc}</span>
              </Button>
            ))}
          </Box>
        </StepCard>
      )}

      {/* Step 3 — Pick Pokemon */}
      {step >= 3 && (
        <StepCard number={3} title="PICK A POKEMON"
          done={step > 3}
          summary={displayedId ? `#${String(displayedId).padStart(3,'0')} ${displayedName}` : ''}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <FormControl fullWidth>
              <Select
                value={selectedId ?? ''}
                onChange={(e) => setSelectedId(e.target.value)}
                variant="outlined"
                sx={{
                  fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem',
                  bgcolor: '#fff', border: '4px solid #111', borderRadius: '6px', boxShadow: '4px 4px 0 #111',
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                }}
              >
                {filteredPokemon.map(({ id, name }) => (
                  <MenuItem key={id} value={id} sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem' }}>
                    #{String(id).padStart(3,'0')} — {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={lookup} variant="contained" sx={redBtnSx}>
              LOOK UP! →
            </Button>
          </Box>
        </StepCard>
      )}

      {/* Result */}
      {step >= 4 && (
        <Box sx={resultSx}>
          <Box sx={{ bgcolor: '#FFDE00', borderBottom: '4px solid #111', px: 2.5, py: 1.5 }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#111' }}>
              GOOD CHOICE, {trainerName.toUpperCase()}!
            </Typography>
          </Box>
          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <PokemonDisplay pokemonId={displayedId} pokemonName={displayedName} />
            <Box sx={{ bgcolor: '#fff', border: '4px solid #111', borderRadius: 2, p: 2, width: '100%' }}>
              <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#888', mb: 0.75 }}>
                #{String(displayedId).padStart(3,'0')}
              </Typography>
              <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.9rem', color: '#111' }}>
                {displayedName}
              </Typography>
            </Box>
            <Button onClick={reset} variant="contained" fullWidth
              sx={{ ...redBtnSx, bgcolor: '#3B4CCA', '&:hover': { bgcolor: '#4a5cda' } }}
            >
              START OVER
            </Button>
          </Box>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  )
}
