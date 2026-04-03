import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import PokemonPage from './components/PokemonPage'
import RandomPokemon from './pages/RandomPokemon'
import WhosThat from './pages/WhosThat'
import MyTeam from './pages/MyTeam'
import TypeQuiz from './pages/TypeQuiz'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/pokemon-lookup" replace />} />
        <Route path="/pokemon-lookup" element={<PokemonPage />} />
        <Route path="/random"         element={<RandomPokemon />} />
        <Route path="/whos-that"      element={<WhosThat />} />
        <Route path="/my-team"        element={<MyTeam />} />
        <Route path="/type-quiz"      element={<TypeQuiz />} />
      </Route>
    </Routes>
  )
}
