import { useState, useRef, useEffect } from 'react'
import { Box, Button, Typography, Paper, Chip } from '@mui/material'
import ShuffleRoundedIcon    from '@mui/icons-material/ShuffleRounded'
import StarRoundedIcon       from '@mui/icons-material/StarRounded'
import InventoryRoundedIcon  from '@mui/icons-material/InventoryRounded'
import StepCard              from '../components/StepCard'
import { MRO_PRODUCTS, CATEGORY_COLORS } from '../data/mroProducts'

const COUNT_OPTIONS  = [3, 6, 9]
const FILTER_OPTIONS = ['All Items', 'New Arrivals', 'Critical Stock', 'Top Value']

const inventoryColor = (status) => {
  if (status === 'In Stock')    return { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' }
  if (status === 'Low Stock')   return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' }
  return                               { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' }
}

function getPool(filter) {
  if (filter === 'New Arrivals')   return MRO_PRODUCTS.filter(p => p.isNew)
  if (filter === 'Critical Stock') return MRO_PRODUCTS.filter(p => p.isCritical)
  if (filter === 'Top Value')      return [...MRO_PRODUCTS].sort((a, b) => b.price - a.price)
  return MRO_PRODUCTS
}

function pickRandom(pool, n) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, n)
}

const choiceSx = (selected) => ({
  borderColor:  selected ? '#0EA5E9' : 'rgba(0,0,0,0.12)',
  bgcolor:      selected ? '#EFF6FF' : '#fff',
  color:        selected ? '#0369A1' : '#334155',
  fontWeight:   selected ? 600 : 400,
  '&:hover': { borderColor: '#0EA5E9', bgcolor: '#F0F9FF' },
})

export default function FeaturedItems() {
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
    const pool = getPool(filter)
    const n    = Math.min(count, pool.length)
    const newPicks = pickRandom(pool, n)
    setPicks(newPicks)
    setRevealedCount(0)
    setRolling(true)
    setStep(3)
    let revealed = 0
    const interval = setInterval(() => {
      revealed++
      setRevealedCount(revealed)
      if (revealed >= n) { clearInterval(interval); setRolling(false) }
    }, 500)
  }

  function reset() {
    setStep(1); setCount(null); setFilter(null); setPicks([]); setRevealedCount(0)
  }

  return (
    <Box sx={{ p: 4, maxWidth: 820, mx: 'auto', width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0F172A', mb: 0.5 }}>Featured Items</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
          Discover highlighted products from across the MRO catalog
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Step 1 — How many? */}
        <StepCard number={1} title="How many items?" done={step > 1} summary={`Showing ${count} items`}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
            {COUNT_OPTIONS.map(n => (
              <Button key={n} onClick={() => setCount(n)} variant="outlined" sx={{ flex: 1, py: 1.5, fontSize: '1rem', fontWeight: 700, ...choiceSx(count === n) }}>
                {n}
              </Button>
            ))}
          </Box>
          <Button onClick={() => { if (count) setStep(2) }} disabled={!count} variant="contained"
            sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' } }}
          >
            Continue
          </Button>
        </StepCard>

        {/* Step 2 — Filter */}
        {step >= 2 && (
          <StepCard number={2} title="Apply Filter" done={step > 2} summary={`Filter: ${filter}`}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
              {FILTER_OPTIONS.map(f => (
                <Button key={f} onClick={() => setFilter(f)} variant="outlined"
                  sx={{ py: 1.25, fontSize: '0.82rem', ...choiceSx(filter === f) }}
                >
                  {f}
                </Button>
              ))}
            </Box>
            <Button onClick={() => { if (filter) roll() }} disabled={!filter} variant="contained"
              sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' }, gap: 1 }}
            >
              <ShuffleRoundedIcon fontSize="small" /> Generate Items
            </Button>
          </StepCard>
        )}

        {/* Step 3 — Results */}
        {step >= 3 && (
          <Paper elevation={0} sx={{
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
            animation: 'stepIn 0.35s ease',
            '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            <Box sx={{ bgcolor: rolling ? '#F59E0B' : '#1E3A5F', px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <StarRoundedIcon sx={{ color: rolling ? '#fff' : '#F59E0B', fontSize: 20 }} />
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                  {rolling ? `Loading... (${revealedCount}/${Math.min(count, picks.length)})` : `${filter} — ${picks.length} Items`}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ p: 2.5, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 2 }}>
              {picks.slice(0, revealedCount).map(product => {
                const catColor = CATEGORY_COLORS[product.category] || '#64748B'
                const inv = inventoryColor(product.inventory)
                return (
                  <Paper key={product.id} elevation={0} sx={{
                    border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', overflow: 'hidden',
                    animation: 'cardPop 0.35s ease',
                    '@keyframes cardPop': { from: { opacity: 0, transform: 'scale(0.9)' }, to: { opacity: 1, transform: 'scale(1)' } },
                    '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transform: 'translateY(-2px)', transition: 'all 0.2s' },
                  }}>
                    {/* Category stripe */}
                    <Box sx={{ height: 4, bgcolor: catColor }} />
                    {/* Icon area */}
                    <Box sx={{ bgcolor: `${catColor}0D`, px: 2, pt: 2, pb: 1.5, display: 'flex', justifyContent: 'center' }}>
                      <Box sx={{
                        width: 64, height: 64, borderRadius: '12px',
                        bgcolor: `${catColor}18`, border: `1px solid ${catColor}25`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <InventoryRoundedIcon sx={{ fontSize: 32, color: catColor }} />
                      </Box>
                    </Box>
                    <Box sx={{ px: 2, pb: 2 }}>
                      <Typography sx={{ fontSize: '0.72rem', color: '#94A3B8', mb: 0.25 }}>{product.sku}</Typography>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A', mb: 0.5, lineHeight: 1.35 }}>
                        {product.name}
                      </Typography>
                      <Typography sx={{ fontSize: '0.72rem', color: '#64748B', mb: 1 }}>{product.supplier}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip label={product.inventory} size="small" sx={{
                          bgcolor: inv.bg, color: inv.text, border: `1px solid ${inv.border}`,
                          fontSize: '0.68rem', fontWeight: 600, height: 22,
                        }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#1E3A5F' }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                )
              })}

              {/* Placeholder slots */}
              {rolling && picks.slice(revealedCount).map((_, i) => (
                <Box key={`ph-${i}`} sx={{
                  border: '1px dashed rgba(0,0,0,0.12)', borderRadius: '10px',
                  height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  bgcolor: '#F8FAFC',
                }}>
                  <InventoryRoundedIcon sx={{ fontSize: 32, color: '#CBD5E1' }} />
                </Box>
              ))}
            </Box>

            {!rolling && (
              <Box sx={{ px: 2.5, pb: 2.5 }}>
                <Button onClick={reset} variant="outlined" fullWidth
                  sx={{ borderColor: '#CBD5E1', color: '#475569', gap: 1, '&:hover': { borderColor: '#0EA5E9', color: '#0EA5E9' } }}
                >
                  <ShuffleRoundedIcon fontSize="small" /> Generate New Selection
                </Button>
              </Box>
            )}
          </Paper>
        )}

        <div ref={bottomRef} />
      </Box>
    </Box>
  )
}
