import { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import QuizRoundedIcon from '@mui/icons-material/QuizRounded'
import StepCard from '../components/StepCard'
import POKEMON from '../data/pokemon'

// Primary type for each Gen 1 Pokemon (index 0 = #001 Bulbasaur)
const TYPES = [
  'Grass','Grass','Grass','Fire','Fire','Fire','Water','Water','Water','Bug',
  'Bug','Bug','Bug','Bug','Bug','Normal','Normal','Normal','Normal','Normal',
  'Normal','Normal','Poison','Poison','Electric','Electric','Ground','Ground','Poison','Poison',
  'Poison','Poison','Poison','Poison','Normal','Normal','Fire','Fire','Normal','Normal',
  'Poison','Poison','Grass','Grass','Grass','Bug','Bug','Bug','Bug','Ground',
  'Ground','Normal','Normal','Water','Water','Fighting','Fighting','Fire','Fire','Water',
  'Water','Water','Psychic','Psychic','Psychic','Fighting','Fighting','Fighting','Grass','Grass',
  'Grass','Water','Water','Rock','Rock','Rock','Fire','Fire','Water','Water',
  'Electric','Electric','Normal','Normal','Normal','Water','Water','Poison','Poison','Water',
  'Water','Ghost','Ghost','Ghost','Rock','Psychic','Psychic','Water','Water','Electric',
  'Electric','Grass','Grass','Ground','Ground','Fighting','Fighting','Normal','Poison','Poison',
  'Ground','Ground','Normal','Grass','Normal','Water','Water','Water','Water','Water',
  'Water','Psychic','Bug','Ice','Electric','Fire','Bug','Normal','Water','Water',
  'Water','Normal','Normal','Water','Electric','Fire','Normal','Rock','Rock','Rock',
  'Rock','Rock','Normal','Ice','Electric','Fire','Dragon','Dragon','Dragon','Psychic',
  'Psychic',
]

const ALL_TYPE_NAMES = [...new Set(TYPES)]

const TYPE_COLORS = {
  Normal:   '#A8A878', Fire:     '#F08030', Water:    '#6890F0',
  Grass:    '#78C850', Electric: '#F8D030', Ice:      '#98D8D8',
  Fighting: '#C03028', Poison:   '#A040A0', Ground:   '#E0C068',
  Rock:     '#B8A038', Bug:      '#A8B820', Ghost:    '#705898',
  Psychic:  '#F85888', Dragon:   '#7038F8',
}

const ROUND_OPTIONS = [5, 10, 15]

function getChoices(correct) {
  const wrong = ALL_TYPE_NAMES.filter(t => t !== correct)
  const shuffled = wrong.sort(() => Math.random() - 0.5).slice(0, 3)
  return [correct, ...shuffled].sort(() => Math.random() - 0.5)
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

export default function TypeQuiz() {
  const [step,       setStep]       = useState(1)
  const [rounds,     setRounds]     = useState(null)
  const [pokemonIds, setPokemonIds] = useState([])
  const [choices,    setChoices]    = useState([])
  const [roundIndex, setRoundIndex] = useState(0)
  const [selected,   setSelected]   = useState(null)
  const [answered,   setAnswered]   = useState(false)
  const [score,      setScore]      = useState({ correct: 0, total: 0 })
  const [gameOver,   setGameOver]   = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step, roundIndex, gameOver])

  function startGame() {
    const ids = Array.from({ length: rounds }, () => Math.ceil(Math.random() * 151))
    setPokemonIds(ids)
    setChoices(ids.map(id => getChoices(TYPES[id - 1])))
    setRoundIndex(0)
    setSelected(null)
    setAnswered(false)
    setScore({ correct: 0, total: 0 })
    setGameOver(false)
    setStep(2)
  }

  function submitAnswer(type) {
    if (answered) return
    const correct = TYPES[pokemonIds[roundIndex] - 1]
    const isCorrect = type === correct
    setSelected(type)
    setAnswered(true)
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }))
  }

  function nextRound() {
    if (roundIndex + 1 >= pokemonIds.length) {
      setGameOver(true)
    } else {
      setRoundIndex(r => r + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  function reset() {
    setStep(1); setRounds(null); setGameOver(false); setSelected(null)
  }

  const currentId    = pokemonIds[roundIndex]
  const currentName  = currentId ? POKEMON[currentId - 1] : null
  const correctType  = currentId ? TYPES[currentId - 1] : null
  const isLastRound  = roundIndex + 1 >= (rounds ?? 0)
  const pct          = gameOver ? Math.round((score.correct / (rounds ?? 1)) * 100) : 0

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 560 }}>
      <style>{`@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>

      {/* Step 1 — Rounds */}
      <StepCard number={1} title="CHOOSE ROUNDS" done={step > 1} summary={`Rounds: ${rounds}`}>
        <Box sx={{ bgcolor: '#2a3694', border: '3px solid #FFDE00', borderRadius: 1.5, p: 1.5, mb: 2 }}>
          <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.4rem', color: '#FFDE00', lineHeight: 1.8 }}>
            ★ See a Pokemon · Guess its primary type · Score points!
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          {ROUND_OPTIONS.map(n => (
            <Button key={n} onClick={() => setRounds(n)} variant="contained" fullWidth sx={choiceSx(rounds === n)}>
              {n}
            </Button>
          ))}
        </Box>
        <Button onClick={() => { if (rounds) startGame() }} disabled={!rounds} variant="contained" fullWidth
          sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' }, gap: 1 }}
        >
          <QuizRoundedIcon fontSize="small" /> START QUIZ →
        </Button>
      </StepCard>

      {/* Step 2 — Game */}
      {step >= 2 && !gameOver && (
        <Box sx={{
          bgcolor: '#3B4CCA', border: '5px solid #111', borderRadius: 2, boxShadow: '5px 5px 0 #111', overflow: 'hidden',
          animation: 'stepIn 0.4s ease',
          '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        }}>
          {/* Header */}
          <Box sx={{ bgcolor: '#CC0000', borderBottom: '4px solid #111', px: 2.5, py: 1.5, display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00' }}>
              ROUND {roundIndex + 1} / {rounds}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00' }}>
              ✓ {score.correct} / {score.total}
            </Typography>
          </Box>

          <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
            {/* Pokemon */}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentId}.png`}
              alt={currentName}
              style={{ width: 160, animation: 'bob 2s ease-in-out infinite', filter: 'drop-shadow(3px 3px 0 rgba(0,0,0,0.25))' }}
            />
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.7rem', color: '#FFDE00', textAlign: 'center' }}>
              {currentName}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.38rem', color: 'rgba(255,222,0,0.6)' }}>
              WHAT IS ITS PRIMARY TYPE?
            </Typography>

            {/* Type buttons */}
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, width: '100%' }}>
              {choices[roundIndex]?.map(type => {
                const isCorrect  = type === correctType
                const isSelected = type === selected
                let bgcolor = '#fff'
                let color   = '#111'
                let border  = '4px solid #111'
                if (answered && isCorrect)  { bgcolor = '#e8f5e9'; color = '#2e7d32'; border = '4px solid #2e7d32' }
                if (answered && isSelected && !isCorrect) { bgcolor = '#ffebee'; color = '#c62828'; border = '4px solid #c62828' }
                return (
                  <Button
                    key={type}
                    onClick={() => submitAnswer(type)}
                    disabled={answered}
                    variant="contained"
                    sx={{
                      ...btnSx, bgcolor, color, border,
                      display: 'flex', gap: 1, alignItems: 'center',
                      '&:hover': { bgcolor: answered ? bgcolor : '#FFFDE7' },
                      '&.Mui-disabled': { bgcolor, color, border },
                    }}
                  >
                    <Box sx={{
                      width: 10, height: 10, borderRadius: '50%',
                      bgcolor: TYPE_COLORS[type] ?? '#888',
                      border: '2px solid rgba(0,0,0,0.3)', flexShrink: 0,
                    }} />
                    {type}
                  </Button>
                )
              })}
            </Box>

            {/* Feedback + next */}
            {answered && (
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box sx={{
                  bgcolor: selected === correctType ? '#e8f5e9' : '#ffebee',
                  border: '4px solid #111', borderRadius: 2, p: 1.5, textAlign: 'center',
                }}>
                  <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: selected === correctType ? '#2e7d32' : '#c62828' }}>
                    {selected === correctType ? '✓ Correct!' : `✗ It was ${correctType}!`}
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
              QUIZ COMPLETE!
            </Typography>
          </Box>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '2.5rem', color: '#FFDE00' }}>
              {score.correct}/{rounds}
            </Typography>
            <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.55rem', color: '#FFDE00' }}>
              {pct === 100 ? '🏆 TYPE MASTER!' : pct >= 70 ? '⭐ TYPE EXPERT!' : pct >= 40 ? '👍 KEEP STUDYING!' : '📚 READ YOUR POKEDEX!'}
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
              sx={{ ...btnSx, bgcolor: '#CC0000', color: '#FFDE00', '&:hover': { bgcolor: '#FF1111' }, gap: 1 }}
            >
              <QuizRoundedIcon fontSize="small" /> PLAY AGAIN
            </Button>
          </Box>
        </Box>
      )}

      <div ref={bottomRef} />
    </Box>
  )
}
