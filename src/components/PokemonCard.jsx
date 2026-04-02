import { Box } from '@mui/material'
import MascotRow from './MascotRow'
import PokemonDisplay from './PokemonDisplay'
import DialogBox from './DialogBox'

export default function PokemonCard({ pokemonId, pokemonName, children }) {
  return (
    <Box
      sx={{
        bgcolor: '#3B4CCA',
        border: '6px solid #111',
        borderRadius: 3,
        p: '30px 36px 36px',
        width: '100%',
        maxWidth: 560,
        boxShadow: '8px 8px 0px #111',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -6,
          left: -6,
          right: -6,
          height: 16,
          bgcolor: '#CC0000',
          border: '6px solid #111',
          borderBottom: 'none',
          borderRadius: '12px 12px 0 0',
        },
      }}
    >
      {pokemonId ? (
        <PokemonDisplay pokemonId={pokemonId} pokemonName={pokemonName} />
      ) : (
        <MascotRow />
      )}

      <DialogBox pokemonId={pokemonId} pokemonName={pokemonName} />

      {children}
    </Box>
  )
}
