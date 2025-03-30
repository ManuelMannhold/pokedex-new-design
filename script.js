let offset = 0;
let limit = 20;
let pokemon = [];
let pokemonData = [];
let pokemonTypes = [];
let allPokemon = [];
const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878",
};

async function init() {
  toggleLoadingSpinner();
  await fetchPokemon();
  await fetchPokemonDetails();
  await fetchAllPokemon();
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
}

async function fetchPokemon(offset, limit) {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);

  pokemon.push(...data.results);
}

async function fetchPokemonDetails(offset, limit) {
  let newPokemon = pokemon.slice(-limit);

  for (let p of newPokemon) {
    let response = await fetch(p.url);
    let dataPokemon = await response.json();

    pokemonData.push(dataPokemon);
    console.log(pokemonData);

    getPokemonTypes(pokemonData.length - 1);
  }
}

async function fetchAllPokemon(offset, limit) {
  offset = 0;
  limit = 1302;
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let allPokemons = await response.json();
  console.log(allPokemons);

  allPokemon.push(allPokemons.results);
}

function getPokemonTypes(i) {
  pokemonTypes = pokemonData[i].types;
  let pokeTypes = "";

  if (pokemonTypes && pokemonTypes.length > 0) {
    for (let j = 0; j < pokemonTypes.length; j++) {
      const types = pokemonTypes[j].type.name;

      pokeTypes += `
                    <span class="show-pokemon-types ${types}">${types}</span>
                `;
    }
  }
  return pokeTypes;
}

async function load20More() {
  offset = offset + 20;
  toggleLoadingSpinner();
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(offset, limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
}

function setPokemonCardBackground() {
  let cards = document.querySelectorAll(".pokemon-card");

  for (let i = 0; i < pokemonData.length; i++) {
    let card = cards[i];
    if (!card) continue;

    let types = pokemonData[i].types;
    if (!types.length) continue;

    let type1 = types[0].type.name;
    let type2 = types[1] ? types[1].type.name : type1;

    let color1 = typeColors[type1] || "#A8A878";
    let color2 = typeColors[type2] || "#A8A878";

    card.style.background = `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`;
  }
}

function setBackgroundToOverlayCard(i) {
  let card = document.getElementById(`poke-card-overlay${i}`);

  let types = pokemonData[i].types;

  let type1 = types[0].type.name;
  let type2 = types[1] ? types[1].type.name : type1;

  let color1 = typeColors[type1] || "#A8A878";
  let color2 = typeColors[type2] || "#A8A878";

  card.style.background = `linear-gradient(135deg, ${color1} 50%, ${color2} 50%)`;
}

function getPokemonCries(i) {
  let cries = pokemonData[i].cries.latest;
  let audio = new Audio(cries);
  return audio.play();
}

function displayPokemon() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < pokemon.length; i++) {
    content.innerHTML += `
            <div class="pokemon-card" onclick="openPokemonDetails(${i}); setBackgroundToOverlayCard(${i})" id="poke-card${i}">
              <header>
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              <img src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              <span>
                ${getPokemonTypes(i)}
              </span>
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
}

function openPokemonDetails(i) {
  let container = document.getElementById("pokemon-overlay");
  container.classList.remove("d-none");

  container.innerHTML = `
    <div class="pokemon-details pokemon-card" id="poke-card-overlay${i}">
    <span class="close-overlay" onclick="closeOverlay()">X</span>
              <header>
              <h2>${pokemonData[i].name}</h2>
              <h3>#${pokemonData[i].id}</h3>
              <img src="${
                pokemonData[i].sprites.other.dream_world.front_default
              }">
              <span>
                ${getPokemonTypes(i)}
              </span>
              <span><button onclick="getPokemonCries(${i})">Schrei</button></span>
              </header>
                <div class="pokemon-info">
                  <span>
                    Gewicht: ${pokemonData[i].weight / 10} Kg
                  </span>
                  <span>
                    Größe: ${pokemonData[i].height * 10} cm
                  </span>
                </div>
            </div>
        `;
}

function closeOverlay() {
  let container = document.getElementById("pokemon-overlay");

  container.classList.add("d-none");
}

function toggleLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.toggle("d-none");
  }
}

function searchPokemon() {
  let input = document.getElementById("input-pokemon").value.toLowerCase();

  input.addEventListener("keydown", (e) => {
    let search = input.value;
    for (let i = 0; i < allPokemon.length; i++) {
      let allPokemon = allPokemon[i][i].name;
      if (allPokemon.includes(search)) {
        console.log(allPokemon[i]);
      }
    }
  });
}
