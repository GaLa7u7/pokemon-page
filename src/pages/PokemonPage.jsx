import React, { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { useParams } from "react-router-dom";
import { primerMayuscula } from "../helper/helper";
import { Loader } from "../components";
import { evolution } from  "../components/evolution";


export const PokemonPage = () => {
  const { getPokemonByID } = useContext(PokemonContext);

  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState({});
  const [pokemonEvolutions, setPokemonEvolutions] = useState([])



  const { id } = useParams();

  const fetchPokemon = async (id) => {
    const data = await getPokemonByID(id);
    setPokemon(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(id);
  }, []);


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
    <main className="container main-pokemon">
      {
      loading ? (
        <Loader />
      ) : (
        <>
          <div className="header-main-pokemon">
            <span className="number-pokemon">#{pokemon.id}</span>
            <div className="container-img-pokemon">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={`Pokemon ${pokemon?.name}`}
              />
            </div>

            <div className="container-info-pokemon">
              <h1>{primerMayuscula(pokemon.name)}</h1>
              
              <div className="card-types info-pokemon-type">
                {pokemon.types.map((type) => (
                  <span key={type.type.name} className={`${type.type.name}`}>
                    {type.type.name}
                  </span>
                ))}
              </div>

              


              <div className="info-pokemon">
                <div className="group-info">
                  <p>Altura</p>
                  <span>{pokemon.height}</span>
                </div>
                <div className="group-info">
                  <p>Peso</p>
                  <span>{pokemon.weight}KG</span>
                </div>
              </div>
            </div>
          </div>

          <div className="container-stats">
            <h1>Estadísticas</h1>
            <div className="stats">
              <div className="stat-group">
                <span>Hp</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[0].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[1].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Attack</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[3].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Special Defense</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[4].base_stat}
                </span>
              </div>
              <div className="stat-group">
                <span>Speed</span>
                <div className="progress-bar"></div>
                <span className="counter-stat">
                  {pokemon.stats[5].base_stat}
                </span>
              </div>
            </div>
          </div>

          <div className="cadena-evolucion">
          <h1>Cadena de Evolución</h1>
          <div>
            {pokemonEvolutions.map(pokemon => <img
                src={pokemon[1]}
                
              />, pokemon[0]) }
          </div>
            
            

          </div>
          
          
          
        </>
      )
      
      }
    </main>
  );
};
