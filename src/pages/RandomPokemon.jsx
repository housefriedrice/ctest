import { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import StepCard from '../components/StepCard'
import POKEMON from '../data/pokemon'

const LEGENDARIES   = new Set([144, 145, 146, 150, 151])
const STARTERS_POOL = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const ALL_POOL      = Array.from({ length: 151 }, (_, i) => i + 1)

const COUNT_OPTIONS  = [1, 3, 5]
const FILTER_OPTIONS = ['Any Pokemon', 'No Legendaries', 'Starters Only']

function getPool(filter) {
  if (filter === 'No Legendaries') return ALL_POOL.filter(id => !LEGENDARIES.has(id))
  if (filter === 'Starters Only')  return STARTERS_POOL
  return ALL_POOL
}

function pickRandom(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

const btnSx = {
  fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem',
  border: '4px solid #111', borderRadius: '6px', boxShadow: '4px 4px 0 #111', py: 1.5,
  '&:active': { transform: 'translate(3px,3px)', boxShadow: '1px 1px 0 #111' },
}

const choiceSx = (selected) => ({
  ...btnSx,
  bgcolor: selected ? '#CC0000' : '#fff',
  color:   selected ? '#FFDE00' : '#111',
  border:  selected ? '4px solid #FFDE00' : '4px solid #111',
  '&:hover': { bgcolor: selected ? '#FF1111' : '#FFFDE7' },
})

export default function RandomPokemon() {
  const [step,          setStep]          = useState(1)
  const [count,         setCount]         = useState(null)
  const [filter,        setFilter]        = useState(null)
  const [picks,         setPicks]         = useState([])
  const [revealedCount, setRevealedCount] = useState(0)
  const [rolling,       setRolling]       = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step])

  function roll() {
    const newPicks = pickRandom(getPool(filter), count)
    setPicks(newPicks)
    setRevealedCount(0)
    setRolling(true)
    setStep(3)

    let revealed = 0
    const interval = setInterval(() => {
      revealed++
      setRevealedCount(revealed)
      if (revealed >= count) { clearInterval(interval); setRolling(false) }
    }, 700)
  }

  function reset() {
    setStep(1); setCount(null); setFilter(null); setPicks([]); setRevealedCount(0)
  }

  const isSingle = count === 1

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 560 }}>
      <style>{`@keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>

      {/* Step 1 — How many? */}
      <StepCard number={1} title="HOW MANY POKEMON?" done={step > 1} summary={`Count: ${count}`}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          {COUNT_OPTIONS.map(n => (
            <Button key={n} onClick={() => setCount(n)} variant="contained" fullWidth sx={choiceSx(count === n)}>
              {n}
            </Button>
          ))}
        </Box>
        <Button onClick={() => { if (count) setStep(2) }} disabled={!count} variant="contained" fullWidth
          sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
        >
          NEXT →
        </Button>
      </StepCard>

      {/* Step 2 — Filter */}
      {step >= 2 && (
        <StepCard number={2} title="SET YOUR RULES" done={step > 2} summary={`Rule: ${filter}`}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
            {FILTER_OPTIONS.map(f => (
              <Button key={f} onClick={() => setFilter(f)} variant="contained" fullWidth sx={choiceSx(filter === f)}>
                {f}
              </Button>
            ))}
          </Box>
          <Button onClick={() => { if (filter) roll() }} disabled={!filter} variant="contained" fullWidth
            sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' }, gap: 1.5 }}
          >
            <ShuffleRoundedIcon fontSize="small" /> ROLL!
          </Button>
        </StepCard>
      )}

      {/* Step 3 — Reveal */}
      {step >= 3 && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          <Box sx={{ bgcolor: rolling ? '#CC0000' : '#FFDE00', borderBottom: '4px solid #111', px: 2.5, py: 1.5 }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: rolling ? '#FFDE00' : '#111' }}>
              {rolling ? `REVEALING... (${revealedCount}/${count})` : 'YOUR POKEMON!'}
            </Typography>
          </Box>

          <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
            {/* Revealed cards */}
            {picks.slice(0, revealedCount).map((id) => (
              <Box key={id} sx={{
                flex: isSingle ? '1' : '1 1 140px',
                bgcolor: '#fff', border: '4px solid #111', borderRadius: 2, p: 2,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
                boxShadow: '4px 4px 0 #111',
                animation: 'cardPop 0.4s ease',
                '@keyframes cardPop': { from: { opacity: 0, transform: 'scale(0.7)' }, to: { opacity: 1, transform: 'scale(1)' } },
              }}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
                  alt={POKEMON[id - 1]}
                  style={{ width: isSingle ? 160 : 90, animation: 'bob 2s ease-in-out infinite', filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.2))' }}
                />
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#888' }}>
                  #{String(id).padStart(3, '0')}
                </Typography>
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: isSingle ? '0.8rem' : '0.45rem', color: '#111', textAlign: 'center' }}>
                  {POKEMON[id - 1]}
                </Typography>
              </Box>
            ))}

            {/* Placeholder slots for unrevealed */}
            {rolling && picks.slice(revealedCount).map((_, i) => (
              <Box key={`empty-${i}`} sx={{
                flex: isSingle ? '1' : '1 1 140px',
                bgcolor: '#2a3694', border: '4px dashed #FFDE00', borderRadius: 2, p: 2,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: isSingle ? 200 : 160,
              }}>
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '2rem', color: '#FFDE00', opacity: 0.3 }}>
                  ?
                </Typography>
              </Box>
            ))}
          </Box>

          {!rolling && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Button onClick={reset} variant="contained" fullWidth
                sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' }, gap: 1.5 }}
              >
                <ShuffleRoundedIcon fontSize="small" /> ROLL AGAIN
              </Button>
            </Box>
          )}
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  )
}
