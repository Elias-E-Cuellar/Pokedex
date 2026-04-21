const input = document.getElementById("name");
const formulario = document.querySelector("form");
const contenedor = document.getElementById("estadisticas");

formulario.addEventListener("submit", async (e) => {
    e.preventDefault();

    const pokemonBuscado = input.value.trim().toLowerCase();

    if (!pokemonBuscado) {
        contenedor.innerHTML = "<li>Ingresa un nombre de Pokémon</li>";
        return;
    }

    try {
        contenedor.innerHTML = "<p>Cargando...</p>";
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonBuscado}`);

        if (!res.ok) {
            throw new Error("Pokémon no encontrado");
        }

        const pokemon = await res.json();

        mostrarPokemon(pokemon);

    } catch (error) {
        contenedor.innerHTML = `<li>${error.message}</li>`;
    }
});

function mostrarPokemon(pokemon) {
    let tipos = pokemon.types.map(t => t.type.name).join(", ");
    let tipoPrincipal = pokemon.types[0].type.name;
    let color = colores[tipoPrincipal] || "#777";


    let contenido = `
    <div class="card">
        <h2>#${pokemon.id} ${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p><strong>Tipo:</strong> ${tipos}</p>
        <ul>
`;

    for (let estadistica of pokemon.stats) {
        contenido += `
            <li>${estadistica.stat.name} : ${estadistica.base_stat}</li>
        `;
    }

    contenido += `
            </ul>
        </div>
    `;

    // ✅ recién acá insertás el HTML
    contenedor.innerHTML = contenido;

    // ✅ y después aplicás el color
    contenedor.querySelector(".card").style.background = color;
}
const colores = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    psychic: "#F85888",
    ice: "#98D8D8",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
    normal: "#A8A878"
};