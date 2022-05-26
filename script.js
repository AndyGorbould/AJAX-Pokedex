// input
// button
var run = document.getElementById("btnNumbInput").addEventListener("click", userNumberInputFunc);

function userNumberInputFunc() {

    // number (user)
    let userNumbInputVal = document.getElementById("userNumbInput").value;


    let i = userNumbInputVal;
    getPokemon(i);
    // console.log(i);
};



const selectedDisplay = document.getElementById('nameDisplay');
const pokemons_number = 20;
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};

// remove color key?
const main_types = Object.keys(colors);
// const main_moves = Object.keys(colors);

const fetchPokemons = async () => {
    {
        await getPokemon(i);
    }
};


//////// restructure into 3 funcs
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
    // species url
    const speciesURL = (pokemon.species.url);       // https://pokeapi.co/api/v2/pokemon-species/4/
    const reultSpecies = await fetch(speciesURL);
    const speciesTree = await reultSpecies.json();
    // evo chain
    const evoChainURL = (speciesTree.evolution_chain.url);    // https://pokeapi.co/api/v2/evolution-chain/2/
    const resultEvoChain = await fetch(evoChainURL);
    const evoChainEnd = await resultEvoChain.json();

    
    let pokeEvoList = evoListAll(evoChainEnd);
    console.log(pokeEvoList);
    createEvolutionCard(pokeEvoList)
    
};


// list evo chain
function evoListAll(evoChainEnd) {
// push names to array
let pokeEvoList = [];

// push first       ////// thank to Lucas for the expert advice!!
if (evoChainEnd.chain.evolves_to.length === 0) {
    pokeEvoList.push(evoChainEnd.chain.species.name);
} else {
    pokeEvoList.push(evoChainEnd.chain.species.name);
    // check if 2nd
    if (evoChainEnd.chain.evolves_to[0] !== undefined) {
        pokeEvoList.push(evoChainEnd.chain.evolves_to[0].species.name);
    }
    // check if 3rd
    if (evoChainEnd.chain.evolves_to[0].evolves_to[0] !== undefined) {
        pokeEvoList.push(evoChainEnd.chain.evolves_to[0].evolves_to[0].species.name);
    }
}

return pokeEvoList;
};
/////////////

function createEvolutionCard(pokeEvoList) {
    const evoElement = document.createElement('p');
    evoElement.classList.add('pokeEvoList');


    const evoInnerHTML = `   
    <h2>Stage 1: ${pokeEvoList[0]}</br></h2>
    <h2>Stage 2: ${pokeEvoList[1]}</br></h2>
    <h2>Stage 3: ${pokeEvoList[2]}</br></h2>

    `   
        // document.createElement('h2').innerText = `${pokeEvoList[0]}`;


    evoElement.innerHTML = evoInnerHTML;

    selectedDisplay.appendChild(evoElement);
    
}


//////////
function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    // img
    const img = pokemon.sprites.front_default;

    // moves -- what a long-winded approach!! this needs shortening.... forEach move in moves??
    const moveA = pokemon.moves[0].move.name;
    const moveB = pokemon.moves[1].move.name;
    const moveC = pokemon.moves[2].move.name;
    const moveD = pokemon.moves[3].move.name;

    // types
    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    // name
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    pokemonEl.style.backgroundColor = color;

    // this innerHTML thing needs to change - create element/li for each move
    const pokeInnerHTML = `        
        <div class="info">
            <span class="number">#${pokemon.id
            .toString()
            .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            
            <img class="sprite-front" src="${img}" alt="${name}">
            </br>

            <small class="type">Moves: <span>${moveA}</span></br></small>
            <small class="type">Moves: <span>${moveB}</span></br></small>
            <small class="type">Moves: <span>${moveC}</span></br></small>
            <small class="type">Moves: <span>${moveD}</span></br></small>

            </br>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;

    pokemonEl.innerHTML = pokeInnerHTML;

    selectedDisplay.appendChild(pokemonEl);

}

fetchPokemons();






//////// "moves"  needs to follow same pattern as the evoChain print thing


