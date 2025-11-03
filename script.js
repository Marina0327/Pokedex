const pokemonList = document.getElementById("pokemonList");
const pokemonDetail = document.getElementById("pokemonDetail");

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

async function loadPokemons(limit = 30) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await response.json();

  for (const poke of data.results) {
    const res = await fetch(poke.url);
    const details = await res.json();

    const mainType = details.types[0].type.name;
    const color = typeColors[mainType] || '#a8a77a';

    const card = document.createElement("div");
    card.classList.add("pokemon-card");
    card.style.background = color;
    card.innerHTML = `
      <img src="${details.sprites.front_default}" alt="${details.name}">
      <h3>${details.name}</h3>
      <p>#${details.id.toString().padStart(3, '0')}</p>
      <span class="type-label">${mainType}</span>
    `;
    card.addEventListener("click", () => showDetail(details, color));
    pokemonList.appendChild(card);
  }
}

function showDetail(pokemon, color) {
  pokemonList.style.display = "none";
  pokemonDetail.classList.remove("hidden");
 pokemonDetail.style.background = color;

  pokemonDetail.innerHTML = `
    <button class="back-btn" onclick="goBack()">← Voltar</button>
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
    <p><strong>#${pokemon.id}</strong></p>
    <p><strong>Tipo:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <div class="stats">
      <h3>Base Stats</h3>
      ${pokemon.stats.map(stat => `
        <div class="stat">
          <span>${stat.stat.name}</span>
          <span>${stat.base_stat}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function goBack() {
  pokemonDetail.classList.add("hidden");
  pokemonList.style.display = "grid";
}

loadPokemons();
