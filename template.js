function displayPokemonTemplate(pokemonData, i) {
  return `
            <div class="pokemon-card" onclick="openPokemonDetails(${i}); setBackgroundToOverlayCard(${i})" id="poke-card${i}">
              <header>
              <span class="header-name-id-span">
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              </span>
              <span class="pokemon-image-card">
              <img src="${pokemonData[i].sprites.other.dream_world.front_default}">
              </span>
              
            </div>
        `;
}

function openPokemonDetailsTemplate(filteredPokemon, i) {
  return `
  <div class="card-container">
  <span class="close-overlay" onclick="closeOverlayDetails()">X</span>
  <span class="previous-pokemon" onclick="previousPokemon(${i})"><a href="#"><</a></span>
    <div class="pokemon-details" id="poke-card-overlay${i}">
              <header class="pokemon-detail-header">
              <h3 class="pokemon-details-id">#${filteredPokemon[i].id}</h3>
              <span class="pokemon-details-overlay">
              <img class="pokemon-details-overlay-image" alt="picture from Pokemon" src="${
                filteredPokemon[i].sprites.other.dream_world.front_default
              }">
              </span>
              <div class="header-overlay-characteristics">
              <span>Weight: ${filteredPokemon[i].weight} </span>
              <span>Height: ${filteredPokemon[i].height}</span>
              </div>
              </header>
              <section class="section-overlay-card">
              <span>
                    <button onclick="displayMoves()">Moves</button>
                    <button onclick="showStatsOnChart(${i})">Stats</button>
              </span>
             
                <div class="pokemon-info">
                  <span class="pokemon-info-big-card-moves d-none"  id="display-pokemon-info">
                    ${getPokemonMoves(i)}
                  </span>
                  <span id="display-pokemon-stats">
                  </span>
                  <canvas id="my-chart" width="200" height="170" class="d-none"></canvas>
                </div>
            </div>
            <span class="next-pokemon" onclick="nextPokemon(${i})"><a href="#">></a></span>
            </div>
             </section>
        `;
}
