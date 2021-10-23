import React from 'react';

import './App.css';
import { useGetPokemonByNameQuery } from './services/pokemon';

const App: React.VFC = () => {
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  return (
    <div className="app">
      {error ? (
        <h1>error!</h1>
      ) : isLoading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <>
          <h1>{data.species.name}</h1>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};

export default App;
