import { Box } from '@mui/material'

const bobKeyframes = `
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
`

const mascots = [
  { src: '/images/pikachu.png',    alt: 'Pikachu',    width: 110, delay: '0s'    },
  { src: '/images/jigglypuff.png', alt: 'Jigglypuff', width: 90,  delay: '0.4s' },
  { src: '/images/eevee.png',      alt: 'Eevee',      width: 100, delay: '0.8s' },
]

export default function MascotRow() {
  return (
    <>
      <style>{bobKeyframes}</style>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', mb: 2.5 }}>
        {mascots.map(({ src, alt, width, delay }) => (
          <img
            key={alt}
            src={src}
            alt={alt}
            style={{
              width,
              filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.4))',
              animation: `bob 2s ease-in-out ${delay} infinite`,
            }}
          />
        ))}
      </Box>
    </>
  )
}
