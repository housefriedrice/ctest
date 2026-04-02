import { useState, useRef, useEffect } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import StepCard from '../components/StepCard'
import POKEMON from '../data/pokemon'

const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard']
const ROUND_OPTIONS      = [3, 5, 10]

// Easy mode: show first letter + underscores for remaining chars
function getHint(name) {
  return name[0] + Array(name.length - 1).fill(' _').join('')
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

const inputSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem',
    bgcolor: '#fff', borderRadius: '6px', border: '4px solid #111', boxShadow: '4px 4px 0 #111',
    '& fieldset': { border: 'none' },
  },
}

export default function WhosThat() {
  const [step,       setStep]       = useState(1)
  const [difficulty, setDifficulty] = useState(null)
  const [rounds,     setRounds]     = useState(null)

  // Game state
  const [pokemonIds,  setPokemonIds]  = useState([])
  const [roundIndex,  setRoundIndex]  = useState(0)
  const [guess,       setGuess]       = useState('')
  const [answered,    setAnswered]    = useState(false)
  const [correct,     setCorrect]     = useState(false)
  const [score,       setScore]       = useState({ correct: 0, total: 0 })
  const [gameOver,    setGameOver]    = useState(false)

  const bottomRef = useRef()
  const inputRef  = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step, roundIndex, gameOver])

  function startGame() {
    const ids = Array.from({ length: rounds }, () => Math.ceil(Math.random() * 151))
    setPokemonIds(ids)
    setRoundIndex(0)
    setGuess('')
    setAnswered(false)
    setCorrect(false)
    setScore({ correct: 0, total: 0 })
    setGameOver(false)
    setStep(3)
    setTimeout(() => inputRef.current?.focus(), 200)
  }

  function checkGuess(e) {
    e?.preventDefault()
    if (!guess.trim() || answered) return
    const name = POKEMON[pokemonIds[roundIndex] - 1]
    const isCorrect = guess.trim().toLowerCase() === name.toLowerCase()
    setAnswered(true)
    setCorrect(isCorrect)
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  function revealAnswer() {
    setAnswered(true)
    setCorrect(false)
    setScore(s => ({ ...s, total: s.total + 1 }))
  }

  function nextRound() {
    if (roundIndex + 1 >= pokemonIds.length) {
      setGameOver(true)
    } else {
      setRoundIndex(r => r + 1)
      setGuess('')
      setAnswered(false)
      setCorrect(false)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }

  function reset() {
    setStep(1); setDifficulty(null); setRounds(null); setGameOver(false); setGuess('')
  }

  const currentId   = pokemonIds[roundIndex]
  const currentName = currentId ? POKEMON[currentId - 1] : null
  const isLastRound = roundIndex + 1 >= (rounds ?? 0)
  const pct         = gameOver ? Math.round((score.correct / (rounds ?? 1)) * 100) : 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 560 }}>
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>

      {/* Step 1 — Difficulty */}
      <StepCard number={1} title="CHOOSE DIFFICULTY" done={step > 1} summary={`Difficulty: ${difficulty}`}>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          {DIFFICULTY_OPTIONS.map(d => (
            <Button key={d} onClick={() => setDifficulty(d)} variant="contained" fullWidth sx={choiceSx(difficulty === d)}>
              {d}
            </Button>
          ))}
        </Box>
        <Box sx={{ bgcolor: '#2a3694', border: '3px solid #FFDE00', borderRadius: 1.5, p: 1.5, mb: 2 }}>
          <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#FFDE00', lineHeight: 1.8 }}>
            {difficulty === 'Easy'   && '★ First letter hint shown'}
            {difficulty === 'Medium' && '★★ Silhouette only'}
            {difficulty === 'Hard'   && '★★★ Silhouette · No reveal allowed'}
            {!difficulty             && 'Select a difficulty above'}
          </Typography>
        </Box>
        <Button onClick={() => { if (difficulty) setStep(2) }} disabled={!difficulty} variant="contained" fullWidth
          sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
        >
          NEXT →
        </Button>
      </StepCard>

      {/* Step 2 — Rounds */}
      {step >= 2 && (
        <StepCard number={2} title="CHOOSE ROUNDS" done={step > 2} summary={`Rounds: ${rounds}`}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            {ROUND_OPTIONS.map(n => (
              <Button key={n} onClick={() => setRounds(n)} variant="contained" fullWidth sx={choiceSx(rounds === n)}>
                {n}
              </Button>
            ))}
          </Box>
          <Button onClick={() => { if (rounds) startGame() }} disabled={!rounds} variant="contained" fullWidth
            sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
          >
            START GAME →
          </Button>
        </StepCard>
      )}

      {/* Step 3 — Game rounds */}
      {step >= 3 && !gameOver && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          {/* Round header */}
          <Box sx={{ bgcolor: '#CC0000', borderBottom: '4px solid #111', px: 2.5, py: 1.5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00' }}>
              ROUND {roundIndex + 1} / {rounds}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00' }}>
              ✓ {score.correct} / {score.total}
            </Typography>
          </Box>

          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Pokemon silhouette / reveal */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentId}.png`}
                alt="???"
                style={{
                  width: 180,
                  filter: answered ? 'drop-shadow(4px 4px 0 rgba(0,0,0,0.35))' : 'brightness(0)',
                  transition: 'filter 0.5s ease',
                  animation: 'bob 2s ease-in-out infinite',
                }}
              />
            </Box>

            {/* Hint (Easy mode) */}
            {difficulty === 'Easy' && !answered && (
              <Box sx={{ bgcolor: '#2a3694', border: '3px solid #FFDE00', borderRadius: 1.5, p: 1.5, textAlign: 'center' }}>
                <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: '#FFDE00', letterSpacing: 3 }}>
                  {getHint(currentName)}
                </Typography>
              </Box>
            )}

            {/* Guess form */}
            {!answered ? (
              <Box component="form" onSubmit={checkGuess} sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <TextField
                  inputRef={inputRef}
                  value={guess} onChange={(e) => setGuess(e.target.value)}
                  placeholder="Who is this Pokemon?"
                  fullWidth sx={inputSx}
                  inputProps={{ style: { fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem' } }}
                />
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Button type="submit" variant="contained" fullWidth
                    sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
                  >
                    GUESS!
                  </Button>
                  {difficulty !== 'Hard' && (
                    <Button onClick={revealAnswer} variant="outlined" fullWidth
                      sx={{ ...btnSx, color: '#FFDE00', borderColor: '#FFDE00', '&:hover': { bgcolor: 'rgba(255,222,0,0.1)' } }}
                    >
                      REVEAL
                    </Button>
                  )}
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{
                  bgcolor: correct ? '#e8f5e9' : '#ffebee',
                  border: '4px solid #111', borderRadius: 2, p: 2, textAlign: 'center',
                }}>
                  <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.65rem', color: correct ? '#2e7d32' : '#c62828' }}>
                    {correct ? `✓ Correct!` : `✗ It was ${currentName}!`}
                  </Typography>
                </Box>
                <Button onClick={nextRound} variant="contained" fullWidth
                  sx={{ ...btnSx, bgcolor: '#3B4CCA', color: '#FFDE00', '&:hover': { bgcolor: '#4a5cda' } }}
                >
                  {isLastRound ? 'SEE RESULTS →' : 'NEXT ROUND →'}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Results */}
      {gameOver && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          <Box sx={{ bgcolor: '#FFDE00', borderBottom: '4px solid #111', px: 2.5, py: 1.5, textAlign: 'center' }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.6rem', color: '#111' }}>
              GAME OVER!
            </Typography>
          </Box>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '2.5rem', color: '#FFDE00' }}>
              {score.correct}/{rounds}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: '#FFDE00' }}>
              {pct === 100 ? '🏆 PERFECT SCORE!' : pct >= 70 ? '⭐ GREAT JOB!' : pct >= 40 ? '👍 KEEP TRAINING!' : '😅 STUDY YOUR DEX!'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              {[{ label: 'CORRECT', val: score.correct, color: '#2e7d32' }, { label: 'WRONG', val: rounds - score.correct, color: '#c62828' }].map(({ label, val, color }) => (
                <Box key={label} sx={{ flex: 1, bgcolor: '#fff', border: '4px solid #111', borderRadius: 2, p: 1.5, textAlign: 'center', boxShadow: '4px 4px 0 #111' }}>
                  <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#888', mb: 0.5 }}>{label}</Typography>
                  <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '1.2rem', color }}>{val}</Typography>
                </Box>
              ))}
            </Box>
            <Button onClick={reset} variant="contained" fullWidth
              sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' } }}
            >
              PLAY AGAIN
            </Button>
          </Box>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  )
}
