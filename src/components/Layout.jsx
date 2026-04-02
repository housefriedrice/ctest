import { NavLink, Outlet } from 'react-router-dom'
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded'
import HelpRoundedIcon from '@mui/icons-material/HelpRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'

const navItems = [
  { label: 'Pokemon Lookup', path: '/pokemon-lookup', icon: <SearchRoundedIcon /> },
  { label: 'Random Pokemon', path: '/random',          icon: <ShuffleRoundedIcon /> },
  { label: "Who's That?",    path: '/whos-that',       icon: <HelpRoundedIcon /> },
  { label: 'My Team',        path: '/my-team',          icon: <GroupsRoundedIcon /> },
]

export default function Layout() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          bgcolor: '#3B4CCA',
          borderRight: '6px solid #111',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            p: 2.5,
            borderBottom: '4px solid #111',
            bgcolor: '#2a3694',
            textAlign: 'center',
          }}
        >
          <img src="/images/pokemon_logo.svg" alt="Pokemon" style={{ width: 200 }} />
        </Box>

        {/* Nav */}
        <List disablePadding sx={{ flex: 1 }}>
          {navItems.map(({ label, path, icon }) => (
            <ListItemButton
              key={path}
              component={NavLink}
              to={path}
              sx={{
                borderBottom: '3px solid #2a3694',
                py: 2,
                px: 2.5,
                color: '#FFDE00',
                '& .MuiListItemIcon-root': { color: '#FFDE00', minWidth: 36 },
                '&:hover': { bgcolor: '#4a5cda' },
                '&.active': {
                  bgcolor: '#CC0000',
                  borderLeft: '6px solid #FFDE00',
                  '& .MuiListItemIcon-root': { color: '#FFDE00' },
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontFamily: "'Press Start 2P', cursive",
                  fontSize: '0.55rem',
                  lineHeight: 1.6,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: '4px solid #2a3694',
            textAlign: 'center',
            fontFamily: "'Press Start 2P', cursive",
            fontSize: '0.35rem',
            color: '#FFDE00',
            opacity: 0.6,
          }}
        >
          ● GOTTA CODE 'EM ALL ●
        </Box>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#FFDE00',
          backgroundImage: `
            radial-gradient(circle at 5% 95%, #CC0000 0px, #CC0000 50px, #111 50px, #111 55px, transparent 55px),
            radial-gradient(circle at 95% 5%, #CC0000 0px, #CC0000 50px, #111 50px, #111 55px, transparent 55px)
          `,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
          px: 3,
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>

    </Box>
  )
}
