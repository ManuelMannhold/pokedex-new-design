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

function openPokemonDetailsTemplate(pokemonData, i) {
  return `
  <div class="card-container">
  <span class="close-overlay" onclick="closeOverlayDetails()">X</span>
  <span class="previous-pokemon" onclick="previousPokemon(${i})"><a href="#"><</a></span>
    <div class="pokemon-details" id="poke-card-overlay${i}">
              <header class="pokemon-detail-header">
              <h3 class="pokemon-details-id">#${pokemonData[i].id}</h3>
              <span class="pokemon-details-overlay">
              <img class="pokemon-details-overlay-image" src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              </span>
              </header>
              <section class="section-overlay-card">
              <span>
                    <button onclick="displayMoves()">Moves</button>
                    <button onclick="displayStats()">Stats</button>
                  </span>
             
                <div class="pokemon-info">
                  <span class="pokemon-info-big-card-moves d-none"  id="display-pokemon-info">
                    ${getPokemonMoves(i)}
                  </span>
                  <span id="display-pokemon-stats">
                  </span>
                  <canvas id="myChart" width="400" height="400" class="d-none"></canvas>
                </div>
            </div>
            <span class="next-pokemon" onclick="nextPokemon(${i})"><a href="#">></a></span>
            </div>
             </section>
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
