let offset = 0;
let limit = 20;
let pokemon = [];
let pokemonData = [];
let pokemonTypes = [];
let allPokemon = [];
let originalPokemon = [];
let favoritPokemon = [];
let filteredPokemon;
let myPokemonChart = null;
let totalPokemonToLoad = 20;
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
  toggleLoadingSpinner();
  console.log(pokemonData);
}

async function fetchPokemon(offset, limit) {
  try {
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
    let response = await fetch(url);
    let data = await response.json();
    pokemon.push(...data.results);
  } catch (e) {
    console.error(e);
  }
}

async function fetchPokemonDetails(limit) {
  if (limit === undefined) {
    limit = 20;
  }
  let totalPokemonToLoad = offset + limit;
  let newPokemon = pokemon.slice(-limit);
  for (let pokemon of newPokemon) {
    let response = await fetch(pokemon.url);
    let dataPokemon = await response.json();

    pokemonData.push(dataPokemon);
    originalPokemon.push(dataPokemon);
    getPokemonTypes(pokemonData.length - 1);
    updateLiveCounter(pokemonData.length, totalPokemonToLoad);
  }
}

function updateLiveCounter(count, limit) {
  const loadedPokemon = document.getElementById("loaded-pokemon");
  if (loadedPokemon) {
    loadedPokemon.innerHTML = `<span>${count} von ${limit} geladen</span>`;
  }
}

async function fetchAllPokemon(offset, limit) {
  offset = 0;
  limit = 1302;
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  let response = await fetch(url);
  let allPokemons = await response.json();

  allPokemon.push(...allPokemons.results);
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

function getPokemonMoves(i) {
  let pokeMoves = "";
  if (pokemonData[i].moves.length > 0) {
    for (let j = 0; j < pokemonData[i].moves.length; j++) {
      let moves = pokemonData[i].moves[j].move.name;

      pokeMoves += `
        <span class="pokemon-moves">${moves}</span>
    `;
    }
  }
  return pokeMoves;
}

async function loadMore(count) {
  offset = pokemonData.length;
  limit = count;
  toggleLoadingSpinner(totalPokemonToLoad);
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner(totalPokemonToLoad);
  document.getElementById("input-pokemon").value = "";
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

function getPokemonCries(i, event) {
  event.stopPropagation();
  let cries = pokemonData[i].cries.latest;
  let audio = new Audio(cries);
  return audio.play();
}

async function displayPokemon(pokemons) {
  let content = document.getElementById("content");
  content.innerHTML = "";

  if (!pokemons) {
    pokemons = pokemonData;
  }

  for (let i = 0; i < pokemons.length; i++) {
    content.innerHTML += displayPokemonTemplate(pokemons, i);
  }
  setPokemonCardBackground();
}

function displayMoves() {
  let display = document.getElementById("display-pokemon-info");
  let chart = document.getElementById("my-chart");

  if (chart) {
    chart.classList.add("d-none");
  }

  display.classList.remove("d-none");
}

function openPokemonDetails(i) {
  let container = document.getElementById("pokemon-overlay");
  container.classList.remove("d-none");

  container.innerHTML = openPokemonDetailsTemplate(filteredPokemon, i);
  displayMoves();
}

function closeOverlayDetails() {
  let container = document.getElementById("pokemon-overlay");

  container.classList.add("d-none");
}

function toggleLoadingSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.classList.toggle("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("input-pokemon")
    .addEventListener("input", searchPokemon);
});

function searchPokemon() {
  let input = document
    .getElementById("input-pokemon")
    .value.trim()
    .toLowerCase();

  if (input !== "") {
    const filtered = originalPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(input)
    );
    filteredPokemon = filtered;
    displayPokemon(filtered);
  } else {
    filteredPokemon = originalPokemon;
    displayPokemon(originalPokemon);
  }
}

async function showStatsOnChart(i) {
  let container = document.getElementById("my-chart");
  let moves = document.getElementById("display-pokemon-info");
  moves.classList.add("d-none");
  container.classList.remove("d-none");
  let pokemonId = pokemonData[i].id;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let pokemonIds = await response.json();
  renderChart(pokemonIds);
}

function displayOverlay() {
  document
    .getElementById("overlay-load-all-pokemon")
    .classList.remove("d-none");
}

function closeOverlay() {
  document.getElementById("overlay-load-all-pokemon").classList.add("d-none");
}

function nextPokemon(i) {
  if (i + 1 >= pokemonData.length) {
    i = 0;
  } else {
    i++;
  }
  openPokemonDetails(i);
  setBackgroundToOverlayCard(i);
}

function previousPokemon(i) {
  if (pokemonData[i] !== 0) {
    i--;
  }

  if (i === -1) {
    i = pokemonData.length - 1;
  }
  openPokemonDetails(i);
  setBackgroundToOverlayCard(i);
}

async function loadAllPokemon() {
  document.getElementById("overlay-load-all-pokemon").classList.add("d-none");
  loadMore(allPokemon.length);
}

function getPrimaryColor(pokemonData) {
  let type = pokemonData.types[0].type.name;
  return typeColors[type] || "#A8A878";
}

function saveToLocalStorage() {
  const dataToSave = JSON.stringify(pokemonData);
  localStorage.setItem("pokemonData", dataToSave);
}

function loadFromLocalStorage() {
  const savedData = localStorage.getItem("pokemonData");
  if (savedData) {
    pokemonData = JSON.parse(savedData);
  }
}
