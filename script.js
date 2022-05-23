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
const nameDisplay = document.getElementById("nameDisplay");
const pokemonNumb = 20;


const fetchPokemon = async () => {
    let i = 598
        await getPokemon(i);

    
};

const getPokemon = async id => {
    const url =
    `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    createCard(pokemon.name);
};

fetchPokemon();

function createCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');


    // const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

    const pokemonInnerHTML = `<h3> ${pokemon} </h3>`;

    pokemonElement.innerHTML = pokemonInnerHTML;

    nameDisplay.appendChild(pokemonElement);
};