//define API URL
// let api = "https://pokeapi.co/api/v2/";

// console.log(api);


// // AJAX w3
// function loadDoc() {
//     const xhttp = new XMLHttpRequest();
//     xhttp.onload = function() {
//       document.getElementById("nameDisplay").innerHTML = this.responseText;
//       }
//     xhttp.open("GET", "https://pokeapi.co/api/v2/?limit=1&offset=1", true);
//     xhttp.send();
//   }



// // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// fetch("https://pokeapi.co/api/v2/pokemon/")
//     .then(response => response.json())
//     .then(data => console.log(data.results[2].name));
//     document.getElementById("nameDisplay").innerHTML = (data.results[2].name);


// THIS APPEARS TO WORK!
// https://www.youtube.com/watch?v=XL68br6JyYs
// const nameDisplay = document.getElementById("nameDisplay");
// const pokemonNumb = 20;


// const fetchPokemon = async () => {
//     let i = 598
//         await getPokemon(i);


// };

// const getPokemon = async id => {
//     const url =
//     `https://pokeapi.co/api/v2/pokemon/${id}`;
//     const result = await fetch(url);
//     const pokemon = await result.json();
//     createCard(pokemon.name);
// };

// fetchPokemon();

// function createCard(pokemon) {
//     const pokemonElement = document.createElement('div');
//     pokemonElement.classList.add('pokemon');


//     // const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

//     const pokemonInnerHTML = `<h3> ${pokemon} </h3>`;

//     pokemonElement.innerHTML = pokemonInnerHTML;

//     nameDisplay.appendChild(pokemonElement);
// };







// input
// button
var run = document.getElementById("btnNumbInput").addEventListener("click", userNumberInputFunc);


// init "i"
// let i = 130;

function userNumberInputFunc() {

    // number (user)
    let userNumbInputVal = document.getElementById("userNumbInput").value;


    let i = userNumbInputVal;
    getPokemon(i);
    console.log(i);
};



const poke_container = document.getElementById('nameDisplay');
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
    // for (let i = 1; i <= pokemons_number; i++) {
    // 	await getPokemon(i);
    // }

    {
        await getPokemon(i);
    }
};

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');


    // img
    const img = pokemon.sprites.front_default;

    // moves -- what a long-winded approach!! this needs shortening.... forEach move in moves??
    // const move = pokemon.moves[0].move.name[0].toUpperCase() + pokemon.moves[0].move.name.slice(1);
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

    poke_container.appendChild(pokemonEl);
}

fetchPokemons();



// 
// 
// 
// list
// https://pokeapi.co/api/v2/pokemon/?limit=50&offset=50

const poke_list = document.getElementById('list');


const fetchList = async () => {
    await getPokemonList(i);
};

const getPokemonList = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=100&offset=00}`;
    const res = await fetch(url);
    const pokemonList = await res.json();
    createPokemonList(pokemonList);
};




function createPokemonList(pokemonList) {
    const pokemonElementList = document.createElement('option');
    pokemonElementList.classList.add('pokemonList');


    // name
    const name = pokemonList.name[0].toUpperCase() + pokemonList.name.slice(1);
    // id
    const pokemonListID = pokemonList.id;

    // this innerHTML thing needs to change - create element/li for each
    const pokeInnerHTML = `
                <option value="${pokemonList.id}">${pokemonList.name}</option>
        `;

    pokemonElementList.innerHTML = pokeInnerHTML;

    poke_list.appendChild(pokemonElementList);
};
