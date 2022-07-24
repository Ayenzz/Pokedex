const POKEMON_API = "https://pokeapi.co/api/v2/"
const IMG_POKEMON =  "https://assets.pokemon.com/assets/cms2/img/pokedex/full/"

function getInputName(){
    return document.getElementById("inputname").value
}


function getResponse(response) {
    response.json().then(function(response) {
        fillTheCard(response)
    })
}


function normalizeId(id){
    const idx = "00" + id
    return idx.substr(-3)
}

function setImage(id) {
    const cardImg = document.getElementById("pokemon-id-img")

    const pokemonID = normalizeId(id)
    cardImg.src = IMG_POKEMON + pokemonID + ".png"
}

function setAttr(response) {
    const name = document.getElementById("pokemon-name")
    name.innerHTML = response.name

    const id = document.getElementById("pokemon-id")
    id.innerHTML = "nº " + normalizeId(response.id)

    const types = document.getElementById("pokemon-types")

    const typesString = response.types.map(function(t) { return t.type.name });

    types.innerHTML = ''
    typesString.map(function (type) {
        types.innerHTML += "<div class= 'type-name' >" + type + "</div>"
    })
}

function fillTheCard(response) {
    console.log(response)
    setImage(response.id)
    setAttr(response)
}


function getPokemon() {
    const pokemonName = getInputName().toLowerCase();
    
    const url = POKEMON_API + "pokemon/" +  pokemonName

    const options = {
        method: "GET"
    }

    const result = fetch(url, options)

    result.then(getResponse)
}


function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomPokemon() {
    const pokemonName = normalizeId(randomIntFromInterval(1, 905));
    
    const url = POKEMON_API + "pokemon/" +  pokemonName

    const options = {
        method: "GET"
    }

    const result = fetch(url, options)

    result.then(getResponse)
}
