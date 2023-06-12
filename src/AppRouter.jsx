import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { EvolutionPage, HomePage, PokemonPage, SearchPage } from './pages'
import { Navigation } from './components/Navigation'

export const AppRouter = () => {
  return <Routes>
    <Route path='/' element={<Navigation />}>
        <Route index element={<HomePage />} />
        <Route path='pokemon/:id' element={<PokemonPage />} />
        <Route path='search' element={<SearchPage />} />
        <Route path='evolution' element={<EvolutionPage />} />    
    </Route>

    <Route path='*' element={<Navigate to='/' />} />
  </Routes>
  
}
