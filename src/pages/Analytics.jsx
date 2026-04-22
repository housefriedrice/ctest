import { Box, Typography, Paper, Chip, Divider } from '@mui/material'
import InventoryRoundedIcon      from '@mui/icons-material/InventoryRounded'
import BusinessRoundedIcon       from '@mui/icons-material/BusinessRounded'
import CategoryRoundedIcon       from '@mui/icons-material/CategoryRounded'
import WarningAmberRoundedIcon   from '@mui/icons-material/WarningAmberRounded'
import TrendingUpRoundedIcon     from '@mui/icons-material/TrendingUpRounded'
import CheckCircleRoundedIcon    from '@mui/icons-material/CheckCircleRounded'
import ErrorRoundedIcon          from '@mui/icons-material/ErrorRounded'
import { MRO_PRODUCTS, CATEGORIES, CATEGORY_COLORS, SUPPLIERS } from '../data/mroProducts'

const inStock    = MRO_PRODUCTS.filter(p => p.inventory === 'In Stock').length
const lowStock   = MRO_PRODUCTS.filter(p => p.inventory === 'Low Stock').length
const outOfStock = MRO_PRODUCTS.filter(p => p.inventory === 'Out of Stock').length
const newItems   = MRO_PRODUCTS.filter(p => p.isNew).length
const totalValue = MRO_PRODUCTS.reduce((sum, p) => sum + p.price * p.qty, 0)

const summaryCards = [
  { label: 'Total SKUs',     value: MRO_PRODUCTS.length, icon: <InventoryRoundedIcon />,    color: '#0EA5E9', bg: '#EFF6FF' },
  { label: 'Active Suppliers',value: SUPPLIERS.length,   icon: <BusinessRoundedIcon />,     color: '#6366F1', bg: '#EEF2FF' },
  { label: 'Categories',     value: CATEGORIES.length,   icon: <CategoryRoundedIcon />,     color: '#F59E0B', bg: '#FFFBEB' },
  { label: 'Low / Out Stock',value: `${lowStock + outOfStock}`, icon: <WarningAmberRoundedIcon />, color: '#EF4444', bg: '#FEF2F2' },
]

export default function Analytics() {
  return (
    <Box sx={{ p: 4, maxWidth: 1000, mx: 'auto', width: '100%' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ color: '#0F172A', mb: 0.5 }}>Analytics Overview</Typography>
        <Typography sx={{ color: '#64748B', fontSize: '0.9rem' }}>
          Real-time MRO inventory and procurement intelligence
        </Typography>
      </Box>

      {/* Summary cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, mb: 4 }}>
        {summaryCards.map(({ label, value, icon, color, bg }) => (
          <Paper key={label} elevation={0} sx={{
            border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', p: 2.5,
            display: 'flex', flexDirection: 'column', gap: 1,
          }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '10px', bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
              {icon}
            </Box>
            <Typography sx={{ fontSize: '1.8rem', fontWeight: 700, color: '#0F172A', lineHeight: 1 }}>
              {value}
            </Typography>
            <Typography sx={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500 }}>{label}</Typography>
          </Paper>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>

        {/* Inventory Status */}
        <Paper elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', p: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', mb: 2 }}>
            Inventory Status
          </Typography>
          {[
            { label: 'In Stock',     count: inStock,    color: '#22C55E', pct: Math.round((inStock / MRO_PRODUCTS.length) * 100) },
            { label: 'Low Stock',    count: lowStock,   color: '#F59E0B', pct: Math.round((lowStock / MRO_PRODUCTS.length) * 100) },
            { label: 'Out of Stock', count: outOfStock, color: '#EF4444', pct: Math.round((outOfStock / MRO_PRODUCTS.length) * 100) },
          ].map(({ label, count, color, pct }) => (
            <Box key={label} sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.75 }}>
                <Typography sx={{ fontSize: '0.82rem', color: '#334155', fontWeight: 500 }}>{label}</Typography>
                <Typography sx={{ fontSize: '0.82rem', color: '#64748B' }}>{count} SKUs ({pct}%)</Typography>
              </Box>
              <Box sx={{ height: 8, borderRadius: '4px', bgcolor: '#F1F5F9', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', width: `${pct}%`, bgcolor: color, borderRadius: '4px', transition: 'width 1s ease' }} />
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: '0.8rem', color: '#64748B' }}>Catalog Value (on-hand)</Typography>
            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#1E3A5F' }}>
              ${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </Typography>
          </Box>
        </Paper>

        {/* Category Breakdown */}
        <Paper elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', p: 3 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', mb: 2 }}>
            Category Breakdown
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {CATEGORIES.map(cat => {
              const products = MRO_PRODUCTS.filter(p => p.category === cat)
              const catLow   = products.filter(p => p.inventory !== 'In Stock').length
              const color    = CATEGORY_COLORS[cat]
              return (
                <Box key={cat} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.75 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, flexShrink: 0 }} />
                  <Typography sx={{ flex: 1, fontSize: '0.78rem', color: '#334155' }}>{cat}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: '#64748B', width: 48, textAlign: 'right' }}>
                    {products.length} SKUs
                  </Typography>
                  {catLow > 0 && (
                    <Chip label={`${catLow} alert`} size="small" sx={{ height: 20, fontSize: '0.65rem', bgcolor: '#FEF2F2', color: '#EF4444', border: '1px solid #FECACA' }} />
                  )}
                </Box>
              )
            })}
          </Box>
        </Paper>
      </Box>

      {/* Critical items alert */}
      {MRO_PRODUCTS.filter(p => p.isCritical).length > 0 && (
        <Paper elevation={0} sx={{ border: '1px solid #FECACA', borderRadius: '12px', p: 3, bgcolor: '#FEF2F2' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <WarningAmberRoundedIcon sx={{ color: '#EF4444', fontSize: 20 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#991B1B' }}>
              Reorder Alerts — {MRO_PRODUCTS.filter(p => p.isCritical).length} Items Require Attention
            </Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 1.5 }}>
            {MRO_PRODUCTS.filter(p => p.isCritical).map(p => (
              <Box key={p.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, bgcolor: '#fff', borderRadius: '8px', px: 2, py: 1.25, border: '1px solid #FECACA' }}>
                {p.inventory === 'Out of Stock'
                  ? <ErrorRoundedIcon sx={{ color: '#EF4444', fontSize: 18, flexShrink: 0 }} />
                  : <WarningAmberRoundedIcon sx={{ color: '#F59E0B', fontSize: 18, flexShrink: 0 }} />
                }
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.7rem', color: '#64748B' }}>{p.sku} · {p.supplier}</Typography>
                </Box>
                <Chip label={p.inventory === 'Out of Stock' ? 'OUT' : `${p.qty} left`} size="small"
                  sx={{ bgcolor: p.inventory === 'Out of Stock' ? '#FEF2F2' : '#FFFBEB', color: p.inventory === 'Out of Stock' ? '#EF4444' : '#92400E', fontWeight: 700, fontSize: '0.65rem', flexShrink: 0 }}
                />
              </Box>
            ))}
          </Box>
        </Paper>
      )}

      {/* Supplier summary */}
      <Paper elevation={0} sx={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', p: 3, mt: 3 }}>
        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: '#0F172A', mb: 2 }}>
          Supplier Summary
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 1.5 }}>
          {SUPPLIERS.map(s => (
            <Box key={s.code} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1, px: 1.5, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.05)' }}>
              <Box sx={{ width: 36, height: 36, borderRadius: '8px', bgcolor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.65rem', color: '#1D4ED8' }}>{s.code}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#0F172A' }}>{s.name}</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#64748B' }}>{s.skus} SKUs · ★ {s.rating}</Typography>
              </Box>
              <CheckCircleRoundedIcon sx={{ color: '#22C55E', fontSize: 16, flexShrink: 0 }} />
            </Box>
          ))}
        </Box>
      </Paper>

    </Box>
  )
}
