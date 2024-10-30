document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonID = urlParams.get('id');
    
    if (pokemonID) {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
            const pokemonData = await response.json();
            
            document.getElementById('pokemon-name').textContent = pokemonData.name;
            document.getElementById('pokemon-image').src = pokemonData.sprites.front_default;

            const statsDiv = document.getElementById('pokemon-stats');
            pokemonData.stats.forEach(stat => {
                const statElement = document.createElement('p');
                statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
                statsDiv.appendChild(statElement);
            });

            const abilitiesDiv = document.getElementById('pokemon-abilities');
            pokemonData.abilities.forEach(ability => {
                const abilityElement = document.createElement('p');
                abilityElement.textContent = ability.ability.name;
                abilitiesDiv.appendChild(abilityElement);
            });
        } catch (error) {
            console.error('Erro ao buscar dados do Pokémon:', error);
        }
    } else {
        console.error('ID do Pokémon não encontrado na URL');
    }
});
