"use client";

import { useState } from "react";

export default function Body() {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const pokemonName = event.target.pokemonName.value;

    if (!pokemonName) {
      setError("Please enter a Pokémon name.");
      return;
    }

    setError("");
    try {
      const response = await fetch(`http://localhost:8080/api/data?pokemonName=${pokemonName}`);

      if (!response.ok) {
        throw new Error("Failed to fetch Pokémon data.");
      }

      const data = await response.json();
      setPokemonData(data); // Update the pokemonData state with the response data
    } catch (err) {
      setError(err.message);
      setPokemonData(null); // Reset pokemonData if there's an error
    }
  };

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1>Welcome to the Pokedex</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <span id="error">{error}</span>
        </p>
        <label htmlFor="pokemonName">Enter Pokemon Name:</label>
        <input type="text" id="pokemonName" name="pokemonName" />
        <button type="submit" id="submitButton">
          Search
        </button>
      </form>
      {pokemonData && (
        <div className="pokemon-info">
          <div className="pokemon-details">
            <p>Name: {pokemonData.name}</p>
            <p>Dex Number: {pokemonData.dexNumber}</p>
            <p>Primary Type: {pokemonData.primaryType}</p>
            <p>Secondary Type: {pokemonData.secondaryType}</p>
            <p>HP: {pokemonData.hp}</p>
            <p>Attack: {pokemonData.attack}</p>
            <p>Defense: {pokemonData.defense}</p>
            <p>Special Attack: {pokemonData.specialAttack}</p>
            <p>Special Defense: {pokemonData.specialDefense}</p>
            <p>Speed: {pokemonData.speed}</p>
          </div>
          <div className="pokemon-image">
            <img src={pokemonData.imageUrl} alt={pokemonData.name} /> {/* Display the image */}
          </div>
        </div>
      )}
      <img src="/images/pokemon-logo.webp" id="pokemonLogo" alt="Pokemon Logo" />
    </div>
    
  );
}