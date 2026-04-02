import { Box, Typography } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

export default function StepCard({ number, title, done, summary, children }) {
  return (
    <Box
      sx={{
        bgcolor: done ? '#2a3694' : '#3B4CCA',
        border: '5px solid #111',
        borderRadius: 2,
        boxShadow: '5px 5px 0 #111',
        overflow: 'hidden',
        animation: 'stepIn 0.4s ease',
        '@keyframes stepIn': {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', gap: 1.5,
          px: 2.5, py: 1.5,
          bgcolor: done ? '#1e2a7a' : '#CC0000',
          borderBottom: '4px solid #111',
        }}
      >
        <Box sx={{
          width: 26, height: 26, flexShrink: 0,
          bgcolor: '#FFDE00', border: '3px solid #111', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#111', lineHeight: 1 }}>
            {number}
          </Typography>
        </Box>
        <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00', flex: 1, lineHeight: 1.6 }}>
          {title}
        </Typography>
        {done && <CheckCircleRoundedIcon sx={{ color: '#69f0ae', fontSize: 22, flexShrink: 0 }} />}
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>
        {done ? (
          <Typography sx={{ fontFamily: "'Press Start 2P', cursive", fontSize: '0.5rem', color: '#FFDE00', opacity: 0.75 }}>
            ▶ {summary}
          </Typography>
        ) : children}
      </Box>
    </Box>
  )
}
