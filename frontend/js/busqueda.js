const btnBuscar = document.getElementById("btnBuscar");
const input = document.getElementById("pokemonName");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", async () => {
  const nombre = input.value.trim().toLowerCase();
  if (!nombre) {
    mensaje.textContent = "Por favor ingresa un nombre de Pokémon.";
    resultado.innerHTML = "";
    return;
  }

  mensaje.textContent = "Buscando...";
  resultado.innerHTML = "";

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!response.ok) {
      throw new Error("Pokémon no encontrado");
    }

    const data = await response.json();

    // Mostrar resultado
    resultado.innerHTML = `
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p>Tipo: ${data.types.map(t => t.type.name).join(", ")}</p>
      <h3>Estadísticas</h3>
      <ul>
        ${data.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join("")}
      </ul>
    `;

    mensaje.textContent = "";
  } catch (error) {
    mensaje.textContent = error.message;
  }
});

