import { useState } from 'react'
import {
  Box, Typography, Paper, Chip, TextField, InputAdornment, Divider,
} from '@mui/material'
import SearchRoundedIcon      from '@mui/icons-material/SearchRounded'
import BusinessRoundedIcon    from '@mui/icons-material/BusinessRounded'
import StarRoundedIcon        from '@mui/icons-material/StarRounded'
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded'
import EmailRoundedIcon       from '@mui/icons-material/EmailRounded'
import PhoneRoundedIcon       from '@mui/icons-material/PhoneRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { SUPPLIERS, CATEGORY_COLORS, MRO_PRODUCTS } from '../data/mroProducts'

const ratingColor = (r) => r >= 4.7 ? '#22C55E' : r >= 4.4 ? '#F59E0B' : '#EF4444'

export default function Suppliers() {
  const [search, setSearch] = useState('')

  const filtered = SUPPLIERS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
  )

  const totalSkus   = MRO_PRODUCTS.length
  const activeCount = SUPPLIERS.length
  const avgRating   = (SUPPLIERS.reduce((s, x) => s + x.rating, 0) / SUPPLIERS.length).toFixed(1)

  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0F172A', mb: 0.5 }}>Supplier Directory</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
          Approved vendors and their MRO supply coverage
        </Typography>
      </Box>

      {/* Quick stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mb: 3 }}>
        {[
          { label: 'Active Suppliers', value: activeCount, icon: <BusinessRoundedIcon />,       color: '#6366F1', bg: '#EEF2FF' },
          { label: 'Total SKUs',       value: totalSkus,   icon: <LocalShippingRoundedIcon />,  color: '#0EA5E9', bg: '#EFF6FF' },
          { label: 'Avg. Rating',      value: `★ ${avgRating}`, icon: <StarRoundedIcon />,     color: '#F59E0B', bg: '#FFFBEB' },
        ].map(({ label, value, icon, color, bg }) => (
          <Paper key={label} elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', p: 2.5, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
              {icon}
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.4rem', color: '#0F172A', lineHeight: 1 }}>{value}</Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#64748B', mt: 0.25 }}>{label}</Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* Search */}
      <TextField
        value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search suppliers or categories..." fullWidth size="small"
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: '#fff', borderRadius: '10px', '& fieldset': { borderColor: 'rgba(0,0,0,0.12)' }, '&:hover fieldset': { borderColor: '#0EA5E9' }, '&.Mui-focused fieldset': { borderColor: '#0EA5E9' } } }}
        InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{ color: '#94A3B8', fontSize: 20 }} /></InputAdornment> }}
      />

      {/* Supplier cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(420px, 1fr))', gap: 2 }}>
        {filtered.map(supplier => {
          const rc = ratingColor(supplier.rating)
          return (
            <Paper key={supplier.code} elevation={0} sx={{
              border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', overflow: 'hidden',
              '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.08)', transform: 'translateY(-1px)', transition: 'all 0.2s' },
            }}>
              {/* Header */}
              <Box sx={{ px: 2.5, py: 2, display: 'flex', alignItems: 'center', gap: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.65rem', color: '#475569' }}>{supplier.code}</Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A' }}>{supplier.name}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: '#64748B' }}>{supplier.skus} SKUs in catalog</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <StarRoundedIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: rc }}>{supplier.rating}</Typography>
                </Box>
                <CheckCircleRoundedIcon sx={{ color: '#22C55E', fontSize: 18 }} />
              </Box>

              {/* Body */}
              <Box sx={{ px: 2.5, py: 2 }}>
                {/* Categories */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 2 }}>
                  {supplier.categories.map(cat => (
                    <Chip key={cat} label={cat} size="small" sx={{
                      height: 22, fontSize: '0.65rem', fontWeight: 500,
                      bgcolor: `${CATEGORY_COLORS[cat]}12`,
                      color: CATEGORY_COLORS[cat],
                      border: `1px solid ${CATEGORY_COLORS[cat]}25`,
                    }} />
                  ))}
                </Box>

                <Divider sx={{ mb: 1.75 }} />

                {/* Contact info */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailRoundedIcon sx={{ fontSize: 15, color: '#94A3B8' }} />
                    <Typography sx={{ fontSize: '0.78rem', color: '#475569' }}>{supplier.contact}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PhoneRoundedIcon sx={{ fontSize: 15, color: '#94A3B8' }} />
                    <Typography sx={{ fontSize: '0.78rem', color: '#475569' }}>{supplier.phone}</Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          )
        })}
      </Box>

      {filtered.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <BusinessRoundedIcon sx={{ fontSize: 48, color: '#CBD5E1', mb: 2 }} />
          <Typography sx={{ color: '#94A3B8' }}>No suppliers match your search</Typography>
        </Box>
      )}
    </Box>
  )
}
