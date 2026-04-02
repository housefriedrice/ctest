import { Box } from '@mui/material'

const bobKeyframes = `
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-8px); }
  }
`

export default function PokemonDisplay({ pokemonId, pokemonName }) {
  return (
    <>
      <style>{bobKeyframes}</style>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
          alt={pokemonName}
          style={{
            width: 200,
            filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.35))',
            animation: 'bob 2s ease-in-out infinite',
          }}
        />
      </Box>
    </>
  )
}
