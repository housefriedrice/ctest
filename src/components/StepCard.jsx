import { Box, Typography, Paper } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

export default function StepCard({ number, title, done, summary, children }) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: done ? 'rgba(34,197,94,0.3)' : 'rgba(0,0,0,0.08)',
        borderRadius: '12px',
        overflow: 'hidden',
        bgcolor: '#fff',
        animation: 'stepIn 0.35s ease',
        '@keyframes stepIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {/* Header */}
      <Box sx={{
        display: 'flex', alignItems: 'center', gap: 1.5,
        px: 2.5, py: 1.75,
        bgcolor: done ? '#F0FDF4' : '#1E3A5F',
        borderBottom: '1px solid',
        borderColor: done ? 'rgba(34,197,94,0.2)' : 'rgba(0,0,0,0.1)',
      }}>
        <Box sx={{
          width: 28, height: 28, flexShrink: 0,
          bgcolor: done ? '#22C55E' : '#0EA5E9',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
            {number}
          </Typography>
        </Box>
        <Typography sx={{
          fontSize: '0.8rem', fontWeight: 600, flex: 1,
          color: done ? '#166534' : '#fff',
        }}>
          {title}
        </Typography>
        {done && <CheckCircleRoundedIcon sx={{ color: '#22C55E', fontSize: 20, flexShrink: 0 }} />}
      </Box>

      {/* Body */}
      <Box sx={{ p: 2.5 }}>
        {done ? (
          <Typography sx={{ fontSize: '0.8rem', color: '#475569' }}>
            {summary}
          </Typography>
        ) : children}
      </Box>
    </Paper>
  )
}
