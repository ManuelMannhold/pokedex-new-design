function displayPokemonTemplate(pokemonData, i) {
  return `
            <div class="pokemon-card" onclick="openPokemonDetails(${
              (pokemonData, i)
            }); setBackgroundToOverlayCard(${i})" id="poke-card${i}">
              <header>
              <span class="header-name-id-span">
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              </span>
              <span class="pokemon-image-card">
              <img src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              </span>
              <div>
                ${getPokemonTypes(i)}
              </div>
              <span class="cries-sound" onclick="getPokemonCries(${i}, event)">🔊</span>
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
              <span class="section-overlay-card-span">
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
