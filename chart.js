function renderChart(pokemonData) {
  const ctx = document.getElementById("my-chart");
  const mainColor = getPrimaryColor(pokemonData);

  const hp = Hp(pokemonData);
  const atk = attack(pokemonData);
  const def = defense(pokemonData);
  const spAtk = speedAttack(pokemonData);
  const spDef = speedDefense(pokemonData);
  const spd = speed(pokemonData);

  if (myPokemonChart) {
    myPokemonChart.destroy();
  }

  myPokemonChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
      datasets: [
        {
          label: "Stats",
          data: [hp, atk, def, spAtk, spDef, spd],
          backgroundColor: "black",
          borderColor: mainColor,
          borderWidth: 2,
          borderRadius: 8,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          display: true,
          max: 255,
          grid: {
            display: true,
            color: "rgba(0, 0, 0, 0.8)"
          },
          ticks: {
            color: "#555",
            font: { size: 14 }
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            color: "#333",
            font: { size: 16, weight: "bold" }
          }
        }
      }
    }
  });
}

function Hp(pokemonData) {
  let pokemonStats = pokemonData["stats"][0]["base_stat"];
  return pokemonStats;
}

function attack(pokemonData) {
  let pokemonStats = pokemonData["stats"][1]["base_stat"];
  return pokemonStats;
}

function defense(pokemonData) {
  let pokemonStats = pokemonData["stats"][2]["base_stat"];
  return pokemonStats;
}

function speedAttack(pokemonData) {
  let pokemonStats = pokemonData["stats"][3]["base_stat"];
  return pokemonStats;
}

function speedDefense(pokemonData) {
  let pokemonStats = pokemonData["stats"][4]["base_stat"];
  return pokemonStats;
}

function speed(pokemonData) {
  let pokemonStats = pokemonData["stats"][5]["base_stat"];
  return pokemonStats;
}
