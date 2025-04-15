function openPokemonDetailsTemplate(pokemonData, i) {
  return `
  <div class="card-container">
  <span class="close-overlay" onclick="closeOverlay()">X</span>
  <span class="previous-pokemon" onclick="previousPokemon(${i})"><a href="#"><</a></span>
    <div class="pokemon-details pokemon-card" id="poke-card-overlay${i}">
              <header>
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              <span class="pokemon-details-overlay">
              <img src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              </span>
              <span>
                ${getPokemonTypes(i)}
              </span>
              <span><button onclick="getPokemonCries(${i})">Schrei</button></span>
              <span>
                    <button onclick="displayMoves()">Moves</button>
                    <button onclick="displayStats()">Stats</button>
                  </span>
              </header>
                <div class="pokemon-info">
                  <span class="pokemon-info-big-card-moves d-none"  id="display-pokemon-info">
                    ${getPokemonMoves(i)}
                  </span>
                  <span id="display-pokemon-stats">
                  </span>
                </div>
            </div>
            <span class="next-pokemon" onclick="nextPokemon(${i})"><a href="#">></a></span>
            </div>
        `;
}

function displayPokemonTemplate(pokemonData, i) {
  return `
            <div class="pokemon-card" onclick="openPokemonDetails(${i}); setBackgroundToOverlayCard(${i})" id="poke-card${i}">
              <header>
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              <span class="pokemon-image-card">
              <img src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              </span>
              <div>
                ${getPokemonTypes(i)}
              </div>
              <button onclick="getPokemonCries(${i})">Schrei</button>
              </header>
                <div class="pokemon-info">
                  <span>
                    <b>Gewicht:</b> ${pokemonData[i].weight / 10} Kg
                  </span>
                  <span>
                    <b>Größe:</b> ${pokemonData[i].height * 10} cm
                  </span>
                </div>
            </div>
        `;
}

function displayPokemonTemplateOverlay(pokemon) {
  return `
  <div class="pokemon-card">
    <header>
    <h2>${pokemon.name}</h2>
    <h3>#${pokemon.id}</h3>
    <span class="display-pokemon-overlay">
    <img src="${pokemon.sprites.other.dream_world.front_default}">
  </span>
    </header>
      <div class="pokemon-info">
        <span>
          <b>Gewicht:</b> ${pokemon.weight / 10} Kg
        </span>
        <span>
          <b>Größe:</b> ${pokemon.height * 10} cm
        </span>
      </div>
  </div>
`;
}
