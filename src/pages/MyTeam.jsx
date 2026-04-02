import { useState, useRef, useEffect } from 'react'
import { Box, Button, TextField, Typography, FormControl, Select, MenuItem, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import StepCard from '../components/StepCard'
import POKEMON from '../data/pokemon'

const TYPE_OPTIONS = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic', 'Mixed']

const TYPE_COLORS = {
  Fire: '#FF6B35', Water: '#4A90D9', Grass: '#5CB85C',
  Electric: '#D4A017', Psychic: '#D44D9A', Mixed: '#7B68EE',
}

// Gen 1 Pokemon by type (primary type)
const TYPE_POOLS = {
  Fire:     [4,5,6,37,38,58,59,77,78,126,136],
  Water:    [7,8,9,54,55,60,61,62,72,73,86,87,90,91,98,99,116,117,118,119,120,121,129,130,131,134],
  Grass:    [1,2,3,43,44,45,46,47,69,70,71,102,103,114],
  Electric: [25,26,81,82,100,101,125,135],
  Psychic:  [63,64,65,79,80,96,97,121,122,124,150,151],
  Mixed:    null, // all 151
}

const ALL_IDS = Array.from({ length: 151 }, (_, i) => i + 1)

const inputSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem',
    bgcolor: '#fff', borderRadius: '6px', border: '4px solid #111', boxShadow: '4px 4px 0 #111',
    '& fieldset': { border: 'none' },
  },
}

const btnSx = {
  fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem',
  border: '4px solid #111', borderRadius: '6px', boxShadow: '4px 4px 0 #111', py: 1.5,
  '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
}

export default function MyTeam() {
  const [step,       setStep]       = useState(1)
  const [teamName,   setTeamName]   = useState('')
  const [typeFocus,  setTypeFocus]  = useState(null)
  const [team,       setTeam]       = useState(Array(6).fill(null))
  const [finalized,  setFinalized]  = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step])

  useEffect(() => {
    if (finalized) localStorage.setItem('pokemon-team', JSON.stringify(team))
  }, [finalized, team])

  const availableIds = typeFocus && TYPE_POOLS[typeFocus] ? TYPE_POOLS[typeFocus] : ALL_IDS

  function selectType(t) {
    setTypeFocus(t)
    setTeam(Array(6).fill(null))
  }

  function updateSlot(i, value) {
    setTeam(prev => prev.map((v, idx) => idx === i ? (value || null) : v))
  }

  function reset() {
    setStep(1); setTeamName(''); setTypeFocus(null); setTeam(Array(6).fill(null)); setFinalized(false)
  }

  const filledCount = team.filter(Boolean).length
  const typeColor   = typeFocus ? TYPE_COLORS[typeFocus] : '#CC0000'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 680 }}>
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>

      {/* Step 1 — Team name */}
      <StepCard number={1} title="NAME YOUR TEAM" done={step > 1} summary={`Team: ${teamName}`}>
        <Box component="form" onSubmit={(e) => { e.preventDefault(); if (teamName.trim()) setStep(2) }}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}
        >
          <TextField
            value={teamName} onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team name..." autoFocus fullWidth sx={inputSx}
            inputProps={{ maxLength: 16, style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem' } }}
          />
          <Button type="submit" disabled={!teamName.trim()} variant="contained"
            sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
          >
            NEXT →
          </Button>
        </Box>
      </StepCard>

      {/* Step 2 — Type focus */}
      {step >= 2 && (
        <StepCard number={2} title="CHOOSE TYPE FOCUS" done={step > 2} summary={`Focus: ${typeFocus}`}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5, mb: 2 }}>
            {TYPE_OPTIONS.map(t => (
              <Button key={t} onClick={() => selectType(t)} variant="contained"
                sx={{
                  ...btnSx, fontSize: '0.5rem',
                  bgcolor: typeFocus === t ? TYPE_COLORS[t] : '#fff',
                  color:   typeFocus === t ? '#fff' : '#111',
                  border:  typeFocus === t ? '4px solid #111' : '4px solid #111',
                  '&:hover': { bgcolor: typeFocus === t ? TYPE_COLORS[t] : '#FFFDE7', filter: 'brightness(1.1)' },
                }}
              >
                {t}
              </Button>
            ))}
          </Box>
          {typeFocus && (
            <Box sx={{ bgcolor: '#2a3694', border: '3px solid #FFDE00', borderRadius: 1.5, p: 1.5, mb: 2 }}>
              <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#FFDE00', lineHeight: 1.8 }}>
                {typeFocus === 'Mixed'
                  ? '★ All 151 Pokemon available'
                  : `★ ${TYPE_POOLS[typeFocus].length} ${typeFocus}-type Pokemon available`}
              </Typography>
            </Box>
          )}
          <Button onClick={() => { if (typeFocus) setStep(3) }} disabled={!typeFocus} variant="contained" fullWidth
            sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
          >
            BUILD TEAM →
          </Button>
        </StepCard>
      )}

      {/* Step 3 — Build team */}
      {step >= 3 && !finalized && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          <Box sx={{ bgcolor: typeColor, borderBottom: '4px solid #111', px: 2.5, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#fff' }}>
              PICK YOUR 6
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.45rem', color: '#fff', opacity: 0.85 }}>
              {filledCount} / 6 filled
            </Typography>
          </Box>

          <Box sx={{ p: 2, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1.5 }}>
            {team.map((pokemonId, i) => (
              <Box key={i} sx={{
                bgcolor: pokemonId ? '#fff' : '#2a3694',
                border: pokemonId ? '4px solid #111' : '4px dashed rgba(255,222,0,0.4)',
                borderRadius: 2, p: 1.5,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                boxShadow: pokemonId ? '4px 4px 0 #111' : 'none',
                position: 'relative', minHeight: 170,
                transition: 'all 0.2s',
              }}>
                {pokemonId ? (
                  <>
                    <IconButton onClick={() => updateSlot(i, null)} size="small" sx={{
                      position: 'absolute', top: 4, right: 4,
                      width: 20, height: 20, bgcolor: '#CC0000', border: '2px solid #111', color: '#fff',
                      '&:hover': { bgcolor: '#FF1111' },
                    }}>
                      <CloseRoundedIcon sx={{ fontSize: 12 }} />
                    </IconButton>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                      alt={POKEMON[pokemonId - 1]}
                      style={{ width: 72, filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))' }}
                    />
                    <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.35rem', color: '#888' }}>
                      #{String(pokemonId).padStart(3, '0')}
                    </Typography>
                    <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.38rem', color: '#111', textAlign: 'center', lineHeight: 1.5 }}>
                      {POKEMON[pokemonId - 1]}
                    </Typography>
                  </>
                ) : (
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/images/pokeball.png" alt="" style={{ width: 32, opacity: 0.25, imageRendering: 'pixelated' }} />
                  </Box>
                )}

                <FormControl fullWidth size="small">
                  <Select value={pokemonId ?? ''} onChange={(e) => updateSlot(i, e.target.value || null)}
                    displayEmpty variant="outlined"
                    sx={{
                      fontFamily: "'Press Start 2P', cursive", fontSize: '0.38rem',
                      bgcolor: '#f5f5f5', border: '3px solid #111', borderRadius: '4px', boxShadow: '2px 2px 0 #111',
                      '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                    }}
                  >
                    <MenuItem value="" sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.38rem' }}>— Empty —</MenuItem>
                    {availableIds.map(id => (
                      <MenuItem key={id} value={id} sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.38rem' }}>
                        #{String(id).padStart(3,'0')} {POKEMON[id - 1]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ))}
          </Box>

          <Box sx={{ px: 2, pb: 2 }}>
            <Button onClick={() => setFinalized(true)} disabled={filledCount === 0} variant="contained" fullWidth
              sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
            >
              FINALIZE TEAM ({filledCount}/6) →
            </Button>
          </Box>
        </Box>
      )}

      {/* Team showcase */}
      {finalized && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          <Box sx={{ bgcolor: '#FFDE00', borderBottom: '4px solid #111', px: 2.5, py: 2, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem', color: '#111' }}>
              ⭐ {teamName.toUpperCase()} ⭐
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#555', mt: 0.75 }}>
              {typeFocus} Focus · {filledCount} Members
            </Typography>
          </Box>

          <Box sx={{ p: 2.5, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {team.filter(Boolean).map((id) => (
              <Box key={id} sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75,
                p: 1.5, bgcolor: '#fff', border: '4px solid #111', borderRadius: 2, boxShadow: '4px 4px 0 #111',
                flex: '1 1 120px',
              }}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt={POKEMON[id - 1]}
                  style={{ width: 88, animation: 'bob 2s ease-in-out infinite', filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.15))' }}
                />
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#888' }}>
                  #{String(id).padStart(3,'0')}
                </Typography>
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.42rem', color: '#111', textAlign: 'center' }}>
                  {POKEMON[id - 1]}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ px: 2.5, pb: 2.5 }}>
            <Button onClick={reset} variant="contained" fullWidth
              sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
            >
              BUILD NEW TEAM
            </Button>
          </Box>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  )
}
