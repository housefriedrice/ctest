import { useState, useRef, useEffect } from 'react'
import {
  Box, Button, TextField, Typography, Paper, Chip,
  FormControl, Select, MenuItem, Divider,
} from '@mui/material'
import SearchRoundedIcon       from '@mui/icons-material/SearchRounded'
import CategoryRoundedIcon     from '@mui/icons-material/CategoryRounded'
import InventoryRoundedIcon    from '@mui/icons-material/InventoryRounded'
import StorefrontRoundedIcon   from '@mui/icons-material/StorefrontRounded'
import StepCard                from '../components/StepCard'
import { MRO_PRODUCTS, CATEGORIES, CATEGORY_COLORS } from '../data/mroProducts'

const inputSx = {
  '& .MuiOutlinedInput-root': {
    bgcolor: '#F8FAFC',
    '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' },
    '&:hover fieldset': { borderColor: '#0EA5E9' },
    '&.Mui-focused fieldset': { borderColor: '#0EA5E9' },
  },
}

const inventoryColor = (status) => {
  if (status === 'In Stock')    return { bg: '#F0FDF4', text: '#166534', border: '#BBF7D0' }
  if (status === 'Low Stock')   return { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' }
  return                               { bg: '#FEF2F2', text: '#991B1B', border: '#FECACA' }
}

export default function ProductCatalog() {
  const [step,       setStep]       = useState(1)
  const [requester,  setRequester]  = useState('')
  const [category,   setCategory]   = useState(null)
  const [productId,  setProductId]  = useState('')
  const bottomRef = useRef()

  useEffect(() => {
    if (step > 1) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }, [step])

  const categoryProducts = MRO_PRODUCTS.filter(p => p.category === category)
  const selectedProduct  = MRO_PRODUCTS.find(p => p.id === Number(productId))
  const catColor         = CATEGORY_COLORS[category] || '#0EA5E9'
  const invStyle         = selectedProduct ? inventoryColor(selectedProduct.inventory) : {}

  function reset() {
    setStep(1); setRequester(''); setCategory(null); setProductId('')
  }

  return (
    <Box sx={{ p: 4, maxWidth: 680, mx: 'auto', width: '100%' }}>
      {/* Page header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0F172A', mb: 0.5 }}>Product Catalog</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
          Search and browse MRO products by category
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

        {/* Step 1 — Requester */}
        <StepCard number={1} title="Enter Requester Name" done={step > 1} summary={`Requester: ${requester}`}>
          <Box component="form" onSubmit={(e) => { e.preventDefault(); if (requester.trim()) setStep(2) }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
          >
            <TextField
              value={requester} onChange={e => setRequester(e.target.value)}
              placeholder="Your name or employee ID..." autoFocus fullWidth size="small" sx={inputSx}
            />
            <Button type="submit" variant="contained" disabled={!requester.trim()}
              sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' }, alignSelf: 'flex-start', px: 3 }}
            >
              Continue
            </Button>
          </Box>
        </StepCard>

        {/* Step 2 — Category */}
        {step >= 2 && (
          <StepCard number={2} title="Select Product Category" done={step > 2} summary={`Category: ${category}`}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mb: 2 }}>
              {CATEGORIES.map(cat => {
                const color = CATEGORY_COLORS[cat]
                const count = MRO_PRODUCTS.filter(p => p.category === cat).length
                return (
                  <Button key={cat} onClick={() => setCategory(cat)} variant="outlined"
                    sx={{
                      justifyContent: 'flex-start', px: 1.5, py: 1.25, textAlign: 'left',
                      borderColor: category === cat ? color : 'rgba(0,0,0,0.12)',
                      bgcolor: category === cat ? `${color}14` : '#fff',
                      color: category === cat ? color : '#334155',
                      fontWeight: category === cat ? 600 : 400,
                      fontSize: '0.78rem',
                      '&:hover': { borderColor: color, bgcolor: `${color}0D` },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>{cat}</Box>
                    <Box sx={{ ml: 1, fontSize: '0.7rem', opacity: 0.6 }}>{count}</Box>
                  </Button>
                )
              })}
            </Box>
            <Button onClick={() => { if (category) setStep(3) }} disabled={!category} variant="contained"
              sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' } }}
            >
              Browse Products
            </Button>
          </StepCard>
        )}

        {/* Step 3 — Select product */}
        {step >= 3 && (
          <StepCard number={3} title="Select a Product" done={step > 3} summary={`Product: ${selectedProduct?.name}`}>
            <Box sx={{ mb: 1 }}>
              <Chip label={category} size="small"
                sx={{ bgcolor: `${catColor}14`, color: catColor, fontWeight: 600, fontSize: '0.7rem', border: `1px solid ${catColor}30` }}
              />
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mt: 0.75 }}>
                {categoryProducts.length} products available
              </Typography>
            </Box>
            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Select value={productId} onChange={e => setProductId(e.target.value)} displayEmpty
                sx={{ bgcolor: '#F8FAFC', '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' } }}
              >
                <MenuItem value="" disabled><em>Select a product...</em></MenuItem>
                {categoryProducts.map(p => (
                  <MenuItem key={p.id} value={p.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', gap: 2 }}>
                      <span>{p.name}</span>
                      <Typography component="span" sx={{ fontSize: '0.75rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                        {p.sku}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button onClick={() => { if (productId) setStep(4) }} disabled={!productId} variant="contained"
              sx={{ bgcolor: '#1E3A5F', '&:hover': { bgcolor: '#2D5491' } }}
            >
              View Product Details
            </Button>
          </StepCard>
        )}

        {/* Step 4 — Product card */}
        {step >= 4 && selectedProduct && (
          <Paper elevation={0} sx={{
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
            animation: 'stepIn 0.35s ease',
            '@keyframes stepIn': { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
          }}>
            {/* Card header */}
            <Box sx={{ bgcolor: '#1E3A5F', px: 3, py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>
                Product Details
              </Typography>
              <Chip label={selectedProduct.sku} size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: '#CBD5E1', fontSize: '0.72rem', fontWeight: 600 }}
              />
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Icon area */}
              <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
                <Box sx={{
                  width: 100, height: 100, flexShrink: 0, borderRadius: '12px',
                  bgcolor: `${catColor}14`, border: `1px solid ${catColor}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <InventoryRoundedIcon sx={{ fontSize: 44, color: catColor }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0F172A', mb: 0.5, lineHeight: 1.3 }}>
                    {selectedProduct.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.8rem', color: '#64748B', mb: 1 }}>
                    {selectedProduct.brand} · {selectedProduct.unit}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip label={selectedProduct.inventory} size="small" sx={{
                      bgcolor: invStyle.bg, color: invStyle.text,
                      border: `1px solid ${invStyle.border}`, fontWeight: 600, fontSize: '0.72rem',
                    }} />
                    {selectedProduct.isNew && (
                      <Chip label="NEW" size="small" sx={{ bgcolor: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', fontWeight: 700, fontSize: '0.68rem' }} />
                    )}
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', color: '#1E3A5F' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#94A3B8' }}>per {selectedProduct.unit}</Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2.5 }} />

              {/* Details grid */}
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
                {[
                  { icon: <CategoryRoundedIcon sx={{ fontSize: 16 }} />,    label: 'Category',     value: selectedProduct.category },
                  { icon: <StorefrontRoundedIcon sx={{ fontSize: 16 }} />,  label: 'Supplier',     value: selectedProduct.supplier },
                  { icon: <InventoryRoundedIcon sx={{ fontSize: 16 }} />,   label: 'Stock Qty',    value: `${selectedProduct.qty} ${selectedProduct.unit}${selectedProduct.qty !== 1 ? 's' : ''}` },
                  { icon: <SearchRoundedIcon sx={{ fontSize: 16 }} />,      label: 'Item ID / SKU', value: selectedProduct.sku },
                ].map(({ icon, label, value }) => (
                  <Box key={label} sx={{ bgcolor: '#F8FAFC', borderRadius: '8px', p: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#94A3B8', mb: 0.5 }}>
                      {icon}
                      <Typography sx={{ fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {label}
                      </Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#0F172A' }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Requester info */}
              <Box sx={{ bgcolor: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', px: 2, py: 1.25, mb: 2.5 }}>
                <Typography sx={{ fontSize: '0.78rem', color: '#0369A1' }}>
                  Requested by <strong>{requester}</strong>
                </Typography>
              </Box>

              <Button onClick={reset} variant="outlined" fullWidth
                sx={{ borderColor: '#CBD5E1', color: '#475569', '&:hover': { borderColor: '#0EA5E9', color: '#0EA5E9' } }}
              >
                Start New Search
              </Button>
            </Box>
          </Paper>
        )}

        <div ref={bottomRef} />
      </Box>
    </Box>
  )
}
