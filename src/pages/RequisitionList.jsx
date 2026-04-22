import { useState, useRef, useEffect } from 'react'
import {
  Box, Button, TextField, Typography, Paper, Chip,
  FormControl, Select, MenuItem, IconButton, Divider,
} from '@mui/material'
import CloseRoundedIcon        from '@mui/icons-material/CloseRounded'
import AddRoundedIcon          from '@mui/icons-material/AddRounded'
import AssignmentRoundedIcon   from '@mui/icons-material/AssignmentRounded'
import DownloadRoundedIcon     from '@mui/icons-material/DownloadRounded'
import StepCard                from '../components/StepCard'
import { MRO_PRODUCTS, CATEGORIES, CATEGORY_COLORS } from '../data/mroProducts'

const SLOT_COUNT = 8

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#F8FAFC',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
    '&:hover fieldset': { borderColor: '#0EA5E9' },
    '&.Mui-focused fieldset': { borderColor: '#0EA5E9' },
  },
}

export default function RequisitionList() {
  const [step,       setStep]       = useState(1)
  const [listName,   setListName]   = useState('')
  const [category,   setCategory]   = useState(null)
  const [items,      setItems]      = useState(Array(SLOT_COUNT).fill(null))
  const [finalized,  setFinalized]  = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step])

  useEffect(() => {
    if (finalized) localStorage.setItem('mro-requisition', JSON.stringify({ listName, category, items }))
  }, [finalized, listName, category, items])

  const availableProducts = category ? MRO_PRODUCTS.filter(p => p.category === category) : MRO_PRODUCTS
  const filledItems       = items.filter(Boolean)
  const totalCost         = filledItems.reduce((sum, p) => sum + p.price, 0)
  const catColor          = CATEGORY_COLORS[category] || '#0EA5E9'

  function selectCategory(cat) {
    setCategory(cat)
    setItems(Array(SLOT_COUNT).fill(null))
  }

  function updateSlot(i, productId) {
    const product = MRO_PRODUCTS.find(p => p.id === Number(productId)) || null
    setItems(prev => prev.map((v, idx) => idx === i ? product : v))
  }

  function removeSlot(i) {
    setItems(prev => prev.map((v, idx) => idx === i ? null : v))
  }

  function reset() {
    setStep(1); setListName(''); setCategory(null); setItems(Array(SLOT_COUNT).fill(null)); setFinalized(false)
  }

  return (
    <Box sx={{ p: 4, maxWidth: 820, mx: 'auto', width: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0F172A', mb: 0.5 }}>Requisition Lists</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
          Build and save MRO product requisition lists for procurement
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Step 1 — List name */}
        <StepCard number={1} title="Name Your Requisition" done={step > 1} summary={`List: ${listName}`}>
          <Box component="form" onSubmit={e => { e.preventDefault(); if (listName.trim()) setStep(2) }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            <TextField value={listName} onChange={e => setListName(e.target.value)}
              placeholder="e.g. Q2 Maintenance Supplies, PO-2024-001..." autoFocus fullWidth size="small" sx={inputSx}
            />
            <Button type="submit" disabled={!listName.trim()} variant="contained"
              sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' }, alignSelf: 'flex-start', px: 3 }}
            >
              Continue
            </Button>
          </Box>
        </StepCard>

        {/* Step 2 — Category focus */}
        {step >= 2 && (
          <StepCard number={2} title="Category Focus (Optional)" done={step > 2} summary={category ? `Focus: ${category}` : 'All categories'}>
            <Typography sx={{ fontSize: '0.8rem', color: '#64748B', mb: 1.5 }}>
              Filter products by category, or leave unset to browse all items.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
              {CATEGORIES.map(cat => {
                const color = CATEGORY_COLORS[cat]
                return (
                  <Button key={cat} onClick={() => selectCategory(cat)} variant="outlined"
                    sx={{
                      justifyContent: 'flex-start', px: 1.5, py: 1, fontSize: '0.78rem',
                      borderColor: category === cat ? color : 'rgba(0,0,0,0.12)',
                      bgcolor: category === cat ? `${color}14` : '#fff',
                      color: category === cat ? color : '#334155',
                      fontWeight: category === cat ? 600 : 400,
                      '&:hover': { borderColor: color, bgcolor: `${color}0D` },
                    }}
                  >
                    {cat}
                  </Button>
                )
              })}
            </Box>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {category && (
                <Button onClick={() => setCategory(null)} variant="outlined" size="small"
                  sx={{ borderColor: 'rgba(0,0,0,0.12)', color: '#64748B' }}
                >
                  Clear Filter
                </Button>
              )}
              <Button onClick={() => setStep(3)} variant="contained"
                sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' } }}
              >
                Build List
              </Button>
            </Box>
          </StepCard>
        )}

        {/* Step 3 — Build list */}
        {step >= 3 && !finalized && (
          <Paper elevation={0} sx={{
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
            animation: 'stepIn 0.35s ease',
            '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            <Box sx={{ bgcolor: '#1E3A5F', px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AssignmentRoundedIcon sx={{ color: '#94A3B8', fontSize: 18 }} />
                <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                  Add Items to List
                </Typography>
              </Box>
              <Typography sx={{ color: '#94A3B8', fontSize: '0.8rem' }}>
                {filledItems.length} / {SLOT_COUNT} slots filled
              </Typography>
            </Box>

            <Box sx={{ p: 2.5, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1.5 }}>
              {items.map((product, i) => (
                <Box key={i} sx={{
                  border: '1px solid',
                  borderColor: product ? catColor + '40' : 'rgba(0,0,0,0.08)',
                  borderRadius: '10px', p: 1.5,
                  bgcolor: product ? '#F8FAFC' : '#FAFAFA',
                  position: 'relative',
                  minHeight: 110,
                  display: 'flex', flexDirection: 'column', gap: 1,
                }}>
                  {product ? (
                    <>
                      <IconButton onClick={() => removeSlot(i)} size="small" sx={{
                        position: 'absolute', top: 6, right: 6, width: 22, height: 22,
                        bgcolor: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA',
                        '&:hover': { bgcolor: '#EF4444', color: '#fff' },
                      }}>
                        <CloseRoundedIcon sx={{ fontSize: 13 }} />
                      </IconButton>
                      <Box sx={{ pr: 3 }}>
                        <Typography sx={{ fontSize: '0.65rem', color: '#94A3B8', mb: 0.25 }}>{product.sku}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#0F172A', lineHeight: 1.3 }}>
                          {product.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#64748B', mt: 0.25 }}>{product.supplier}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
                        <Chip label={product.category} size="small" sx={{ height: 18, fontSize: '0.6rem', bgcolor: `${CATEGORY_COLORS[product.category]}14`, color: CATEGORY_COLORS[product.category] }} />
                        <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', color: '#1E3A5F' }}>
                          ${product.price.toFixed(2)}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5, opacity: 0.4 }}>
                      <AddRoundedIcon sx={{ fontSize: 20, color: '#94A3B8' }} />
                      <Typography sx={{ fontSize: '0.7rem', color: '#94A3B8' }}>Empty slot</Typography>
                    </Box>
                  )}

                  <FormControl fullWidth size="small">
                    <Select value={product?.id ?? ''} onChange={e => updateSlot(i, e.target.value || null)}
                      displayEmpty variant="outlined"
                      sx={{ bgcolor: '#fff', fontSize: '0.72rem', '.MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,0,0,0.1)' } }}
                    >
                      <MenuItem value=""><em>— Select product —</em></MenuItem>
                      {availableProducts.map(p => (
                        <MenuItem key={p.id} value={p.id} sx={{ fontSize: '0.78rem' }}>
                          {p.sku} · {p.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              ))}
            </Box>

            <Box sx={{ px: 2.5, pb: 2.5 }}>
              {filledItems.length > 0 && (
                <Box sx={{ bgcolor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', px: 2, py: 1.25, mb: 1.5 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#0369A1' }}>
                    Estimated total: <strong>${totalCost.toFixed(2)}</strong> for {filledItems.length} item{filledItems.length !== 1 ? 's' : ''}
                  </Typography>
                </Box>
              )}
              <Button onClick={() => setFinalized(true)} disabled={filledItems.length === 0} variant="contained" fullWidth
                sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' } }}
              >
                Finalize Requisition ({filledItems.length} items)
              </Button>
            </Box>
          </Paper>
        )}

        {/* Finalized view */}
        {finalized && (
          <Paper elevation={0} sx={{
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
            animation: 'stepIn 0.35s ease',
            '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            <Box sx={{ bgcolor: '#1E3A5F', px: 3, py: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ color: '#94A3B8', fontSize: '0.72rem', mb: 0.25, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Requisition
                  </Typography>
                  <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{listName}</Typography>
                  {category && (
                    <Typography sx={{ color: '#94A3B8', fontSize: '0.78rem', mt: 0.25 }}>
                      {category} · {filledItems.length} items
                    </Typography>
                  )}
                </Box>
                <Chip label="SAVED" size="small" sx={{ bgcolor: '#22C55E', color: '#fff', fontWeight: 700, fontSize: '0.72rem' }} />
              </Box>
            </Box>

            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}>
                {filledItems.map((p, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 1.5, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: CATEGORY_COLORS[p.category], flexShrink: 0 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#0F172A' }}>{p.name}</Typography>
                      <Typography sx={{ fontSize: '0.7rem', color: '#64748B' }}>{p.sku} · {p.supplier}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#1E3A5F', flexShrink: 0 }}>
                      ${p.price.toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                <Typography sx={{ fontWeight: 600, color: '#334155' }}>Total Estimated Cost</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1E3A5F' }}>
                  ${totalCost.toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button onClick={reset} variant="outlined" sx={{ flex: 1, borderColor: '#CBD5E1', color: '#475569', '&:hover': { borderColor: '#0EA5E9', color: '#0EA5E9' } }}>
                  New Requisition
                </Button>
                <Button variant="contained" sx={{ flex: 1, bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' }, gap: 1 }}>
                  <DownloadRoundedIcon fontSize="small" /> Export
                </Button>
              </Box>
            </Box>
          </Paper>
        )}

        <div ref={bottomRef} />
      </Box>
    </Box>
  )
}
