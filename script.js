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
  toggleLoadingSpinner();
  load();
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

async function load20More() {
  offset = offset + 20;
  toggleLoadingSpinner();
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(offset, limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
  document.getElementById("input-pokemon").value = "";
}

async function load50More() {
  offset = offset + 50;
  toggleLoadingSpinner();
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(offset, limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
  document.getElementById("input-pokemon").value = "";
}

async function load100More() {
  offset = offset + 100;
  toggleLoadingSpinner();
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(offset, limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
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

async function displayPokemon() {
  let content = document.getElementById("content");
  content.innerHTML = "";

  for (let i = 0; i < pokemon.length; i++) {
    content.innerHTML += displayPokemonTemplate(pokemonData, i);
    setPokemonCardBackground();
  }
}

function displayPokemonSearch(pokemon) {
  let content = document.getElementById("content");

  content.innerHTML += displayPokemonTemplateOverlaySearch(pokemon);
}

function displayMoves() {
  let display = document.getElementById("display-pokemon-info");
  let chart = document.getElementById("my-chart");

  if (!chart) {
    display.classList.remove("d-none");
  } else {
    chart.classList.add("d-none");
    display.classList.remove("d-none");
  }
}

function displayStats() {
  let stats = document.getElementById("");
}

function openPokemonDetails(i) {
  let container = document.getElementById("pokemon-overlay");
  container.classList.remove("d-none");

  container.innerHTML = openPokemonDetailsTemplate(pokemonData, i);
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
  let input = document.getElementById("input-pokemon").value.toLowerCase();
  let result = document.getElementById("content");
  result.innerHTML = "";

  if (input !== "") {
    let filtered = pokemonData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(input)
    );
    if (filtered.length > 0) {
      filtered.forEach((p) => {
        displayPokemonSearch(p);
        setPokemonCardBackground();
      });
    }
  } else {
    displayPokemon();
  }
}

async function showStatsOnChart(i) {
  let pokemonId = pokemonData[i].id;
  let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  let pokemonIds = await response.json();
  let container = document.getElementById("my-chart");
  let moves = document.getElementById("display-pokemon-info");
  moves.classList.add("d-none");

  container.classList.remove("d-none");
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
  if (pokemonData[i].id + 1 <= pokemonData.length) {
    i++;
  } else {
    i = 0;
  }
  openPokemonDetails(i);
  setBackgroundToOverlayCard(i);
}

function previousPokemon(i) {
  if (pokemonData[i].id - 1 !== 0) {
    i--;
  } else {
    i = pokemonData.length - 1;
  }
  openPokemonDetails(i);
  setBackgroundToOverlayCard(i);
}

async function loadAllPokemon() {
  document.getElementById("overlay-load-all-pokemon").classList.add("d-none");
  offset = 20;
  limit += 1302;
  limit += offset;
  toggleLoadingSpinner();
  await fetchPokemon(offset, limit);
  await fetchPokemonDetails(offset, limit);
  displayPokemon();
  setPokemonCardBackground();
  toggleLoadingSpinner();
  document.getElementById("input-pokemon").value = "";
}

function getPrimaryColor(pokemonData) {
  let type = pokemonData.types[0].type.name;
  return typeColors[type] || "#A8A878";
}

function save() {
  const dataToSave = JSON.stringify(pokemonData);
  localStorage.setItem("pokemonData", dataToSave);
}

function load() {
  localStorage.getItem("pokemonData");
}
