import { useState, useRef } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import POKEMON from '../data/pokemon'
import DialogBox from '../components/DialogBox'

function randomId() {
  return Math.ceil(Math.random() * 151)
}

const bobKeyframes = `
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
`

const cardSx = {
  bgcolor: '#3B4CCA',
  border: '6px solid #111',
  borderRadius: 3,
  p: '30px 36px 36px',
  width: '100%',
  maxWidth: 560,
  boxShadow: '8px 8px 0px #111',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -6, left: -6, right: -6,
    height: 16,
    bgcolor: '#CC0000',
    border: '6px solid #111',
    borderBottom: 'none',
    borderRadius: '12px 12px 0 0',
  },
}

const btnSx = {
  fontFamily: "'Press Start 2P', cursive",
  fontSize: '0.6rem',
  border: '4px solid #111',
  borderRadius: '6px',
  boxShadow: '4px 4px 0 #111',
  py: 1.5,
  '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
}

export default function WhosThat() {
  const [pokemonId, setPokemonId]   = useState(randomId)
  const [revealed,  setRevealed]    = useState(false)
  const [guess,     setGuess]       = useState('')
  const [feedback,  setFeedback]    = useState(null) // 'correct' | 'wrong'
  const [score,     setScore]       = useState({ correct: 0, total: 0 })
  const inputRef = useRef()

  const pokemonName = POKEMON[pokemonId - 1]

  function checkGuess(e) {
    e.preventDefault()
    const isCorrect = guess.trim().toLowerCase() === pokemonName.toLowerCase()
    setFeedback(isCorrect ? 'correct' : 'wrong')
    setRevealed(true)
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  function next() {
    setPokemonId(randomId())
    setRevealed(false)
    setGuess('')
    setFeedback(null)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const dialogText = revealed
    ? (feedback === 'correct' ? `✓ ${pokemonName}!` : `✗ It's ${pokemonName}!`)
    : "Who's that Pokemon?"

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>

      {/* Score */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {[
          { label: 'CORRECT', value: score.correct, color: '#2e7d32' },
          { label: 'TOTAL',   value: score.total,   color: '#111'    },
        ].map(({ label, value, color }) => (
          <Box
            key={label}
            sx={{
              bgcolor: '#fff',
              border: '4px solid #111',
              borderRadius: 2,
              px: 2.5, py: 1,
              textAlign: 'center',
              boxShadow: '4px 4px 0 #111',
            }}
          >
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#888', mb: 0.5 }}>
              {label}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1rem', color }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Box sx={cardSx}>
        <style>{bobKeyframes}</style>

        {/* Pokemon image — silhouette until revealed */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
            alt="???"
            style={{
              width: 200,
              filter: revealed ? 'drop-shadow(4px 4px 0px rgba(0,0,0,0.35))' : 'brightness(0)',
              animation: 'bob 2s ease-in-out infinite',
              transition: 'filter 0.4s ease',
            }}
          />
        </Box>

        {/* Dialog box */}
        <Box
          sx={{
            bgcolor: feedback === 'correct' ? '#e8f5e9' : feedback === 'wrong' ? '#ffebee' : '#fff',
            border: '5px solid #111',
            borderRadius: 2,
            p: '18px 22px',
            mb: 3,
            position: 'relative',
            transition: 'background-color 0.3s',
            '&::before': {
              content: '""', position: 'absolute',
              bottom: -14, left: 30, width: 0, height: 0,
              borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
              borderTop: '14px solid #111',
            },
            '&::after': {
              content: '""', position: 'absolute',
              bottom: -9, left: 33, width: 0, height: 0,
              borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
              borderTop: `10px solid ${feedback === 'correct' ? '#e8f5e9' : feedback === 'wrong' ? '#ffebee' : '#fff'}`,
            },
          }}
        >
          <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.75rem', color: '#111', lineHeight: 1.8 }}>
            {dialogText}
          </Typography>
        </Box>

        {/* Form */}
        {!revealed ? (
          <Box component="form" onSubmit={checkGuess} sx={{ display: 'flex', flexDirection: 'column', gap: 1.75 }}>
            <TextField
              inputRef={inputRef}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter Pokemon name..."
              autoFocus
              variant="outlined"
              fullWidth
              inputProps={{ style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#fff',
                  borderRadius: '6px',
                  border: '4px solid #111',
                  boxShadow: '4px 4px 0 #111',
                  '& fieldset': { border: 'none' },
                },
              }}
            />
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              <Button type="submit" variant="contained" fullWidth
                sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
              >
                GUESS!
              </Button>
              <Button onClick={() => { setRevealed(true); setScore(s => ({ ...s, total: s.total + 1 })) }}
                variant="outlined" fullWidth
                sx={{ ...btnSx, color: '#FFDE00', borderColor: '#FFDE00', '&:hover': { bgcolor: 'rgba(255,222,0,0.1)' } }}
              >
                REVEAL
              </Button>
            </Box>
          </Box>
        ) : (
          <Button onClick={next} variant="contained" fullWidth
            sx={{ ...btnSx, bgcolor: '#3B4CCA', color: '#FFDE00', '&:hover': { bgcolor: '#4a5cda' } }}
          >
            NEXT POKEMON →
          </Button>
        )}
      </Box>
    </Box>
  )
}
