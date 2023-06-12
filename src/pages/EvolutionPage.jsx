import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext'
import { useLocation } from 'react-router-dom'
import { CardPokemon } from '../components'

export const EvolutionPage = () => {
  const location  = useLocation()

  //Cadena de evoluciones

  async function getEvolution(idp){
    const response = await fetch (`https://pokeapi.co/api/v2/evolution-chain/${(id)}/`)
    const data = await response.json()
    

    let pokemonEvoArray =[]

    let pokemonLv1 = data.chain.species.name
    let pokemonLv1Img = await getPokemonImgs(pokemonLv1)
    pokemonEvoArray.push([pokemonLv1, pokemonLv1Img])

    if(data.chain.evolves_to.length !==0){
      let pokemonLv2 = data.chain.evolves_to[0].species.name;
      let pokemonLv2Img = await getPokemonImgs(pokemonLv2)
      pokemonEvoArray.push([pokemonLv2, pokemonLv2Img])

      if(data.chain.evolves_to[0].evolves_to.length !==0){
      let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
      let pokemonLv3Img = await getPokemonImgs(pokemonLv3)
      pokemonEvoArray.push([pokemonLv3, pokemonLv3Img])
      setPokemonEvolutions(pokemonEvoArray)
      }
    }

  }

  async function getPokemonImgs(name){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${(name)}`)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default; 
  }


  useEffect(() => {
   getEvolution(pokemon)
  }, []);


  return (
    <div className='container'>
         <p className="cadena-evolucion">
          <h1>Cadena de Evolución</h1>
            <div>
            {pokemonEvolutions.map(pokemon => <img
                src={pokemon[1]}
                
              />, pokemon[0]) }
              
            </div>
            
          </p>

    </div>
  )
}