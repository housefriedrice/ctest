import { NavLink, Outlet } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material'
import SearchRoundedIcon       from '@mui/icons-material/SearchRounded'
import StarRoundedIcon         from '@mui/icons-material/StarRounded'
import BarChartRoundedIcon     from '@mui/icons-material/BarChartRounded'
import AssignmentRoundedIcon   from '@mui/icons-material/AssignmentRounded'
import BusinessRoundedIcon     from '@mui/icons-material/BusinessRounded'
import HexagonRoundedIcon      from '@mui/icons-material/HexagonRounded'

const navItems = [
  { label: 'Product Catalog',   path: '/catalog',      icon: <SearchRoundedIcon fontSize="small" /> },
  { label: 'Featured Items',    path: '/featured',     icon: <StarRoundedIcon fontSize="small" /> },
  { label: 'Analytics',         path: '/analytics',    icon: <BarChartRoundedIcon fontSize="small" /> },
  { label: 'Requisition Lists', path: '/requisitions', icon: <AssignmentRoundedIcon fontSize="small" /> },
  { label: 'Suppliers',         path: '/suppliers',    icon: <BusinessRoundedIcon fontSize="small" /> },
]

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F1F5F9' }}>

      {/* Sidebar */}
      <Box sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: '#0F2040',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
      }}>

        {/* Logo */}
        <Box sx={{ px: 3, py: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '10px',
              bgcolor: '#0EA5E9',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <HexagonRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem', lineHeight: 1.2 }}>
                MROHub
              </Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', fontWeight: 500 }}>
                Procurement Intelligence
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Nav label */}
        <Box sx={{ px: 3, pt: 2.5, pb: 1 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Navigation
          </Typography>
        </Box>

        {/* Nav items */}
        <List disablePadding sx={{ flex: 1, px: 1.5 }}>
          {navItems.map(({ label, path, icon }) => (
            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              sx={{
                borderRadius: '8px',
                mb: 0.5,
                py: 1.25,
                px: 1.5,
                color: 'rgba(255,255,255,0.6)',
                '& .MuiListItemIcon-root': { color: 'rgba(255,255,255,0.4)', minWidth: 34 },
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.06)',
                  color: '#fff',
                  '& .MuiListItemIcon-root': { color: '#0EA5E9' },
                },
                '&.active': {
                  bgcolor: 'rgba(14,165,233,0.15)',
                  color: '#fff',
                  '& .MuiListItemIcon-root': { color: '#0EA5E9' },
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: '0.825rem', fontWeight: 500 }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Footer */}
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.07)' }} />
        <Box sx={{ px: 3, py: 2 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.68rem' }}>
            v2.0.3 · MROHub Platform
          </Typography>
        </Box>
      </Box>

      {/* Main content */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F1F5F9',
        minHeight: '100vh',
        overflow: 'auto',
      }}>
        <Outlet />
      </Box>

    </Box>
  )
}
