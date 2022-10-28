//#region VARIABLES GLOBALES

let referenceDeck; // injecter tous les arcanes depuis le json
let shuffledDeck; // contenant qui va recevoir toutes les cartes mélangées

// selection des DOM existants
let pickedCardsPlaceholders = document.getElementsByClassName("card");
let selectionArea = document.getElementById("selection-area");

console.log(pickedCardsPlaceholders);

const MAXPICK = 4; // nombre maximum de cartes choisies
let cardsPicked = []; // liste des cartes tirées par le joueur, objet carte
let cardsTurned = []; // liste des cartes tournées par le joueur, élément DOM
let cardElements = []; // liste des cartes tirées par le joueur, element DOM

let isDrawn = false; // état de jeu
let turnCounter = 0;

// reinjection de contenus
let domCardsPickedNames; // objet DOM  pour l’injection des cartes sélectionnées
let domResultReading; // objet DOM pour l’injection du texte des résultats

//#endregion

//#region  PROGRAM

referenceDeck = arcanae.arcane; // à remplacer avec un vrai lecteur JSON
shuffledDeck = shuffle(referenceDeck);

for (let i = 0; i < shuffledDeck.length; i++) {
  let cardElement = document.createElement("button");
  cardElement.setAttribute("id", `card-${i}`);
  cardElement.setAttribute("class", "cards-position");
  cardElement.setAttribute("value", `${i}`);
  cardElements.push(cardElement);
  selectionArea.appendChild(cardElement);
}

cardElements.forEach(function (i) {
  i.addEventListener("click", function (e) {
    pickCard(e.target.value);
  });
});

for (let i = 0; i < pickedCardsPlaceholders.length; i++) {
  pickedCardsPlaceholders[i].addEventListener("click", function (e) {
    turnCard(e.target.parentElement);
  });
}

//#endregion

//#region METHODS

function shuffle(deck) {
  // declare placeholder
  let shuffled = [];

  // copies values in new object
  let copy = [];
  for (let i = 0; i < deck.length; i++) {
    copy.push(deck[i]);
  }

  // shuffles and copies
  for (let i = 0; i < deck.length; i++) {
    let rng = Math.floor(Math.random() * copy.length);
    shuffled.push(copy[rng]);
    copy.splice(rng, 1);
  }
  return shuffled;
}

function pickCard(value) {
  if (cardsPicked.length < MAXPICK) {
    cardsPicked.push(shuffledDeck[value]);
    cardElements[value].remove();
    pickedCardsPlaceholders[cardsPicked.length - 1].className += " picked";
  }
  if (cardsPicked.length == MAXPICK) isDrawn = true;
  console.log(cardsPicked.length);
  console.log(isDrawn);
}

function turnCard(card) {
  console.log(turnCounter);

  // check if card hasn’t already been turned
  if (isDrawn && cardsTurned.length <= MAXPICK) {
    var realCard = cardsPicked[turnCounter];
    console.log(realCard);
    cardsTurned.push(card);
    // let image = document.createElement("img");
    // image.src= ;
    // card.appendChild(image);
    //card.style = "background-image:url('" + realCard.url + "')";
    card.className += " visible";
    turnCounter++;
  }
}

//#endregion

function init() {
  loadJSON(function (response) {
    referenceDeck = JSON.parse(response);
  });
}

function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "../assets/data/arcanesMajeurs.json", true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
      console.log("success");
    }
  };
  xobj.send(null);
}

//Proposition de solution de sauvegarde des data entre page application.html et resultat.html
// Query solution stackoverflow to implement

// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }

// var clicked = getParameterByName('clicked');


  /* Storing a stringified array and object to local storage */
// var cardsPicked; //Je récupère l'array des 4 cartes sélectionnées 
// localStorage.setItem('storedCards', JSON.stringify(storedCards)) //Je convertis en string Jaaaason mes données js

  /* Parsing back to JavaScript array*/
// var myFourSavedCards = JSON.parse(localStorage.getItem('storedCards'));
// console.log(myFourSavedCards); 

  /* Clear all items : localStorage.clear();*/

  /* Note à moi-même : arriver à récupérer dans la page resultat.html :
//     card1: [index de la carte]["name"]["signification"]["past"] 
//     card2: [index de la carte]["name"]["signification"]["present"] 
//     card3: [index de la carte]["name"]["signification"]["advice"] 
//     card4: [index de la carte]["name"]["signification"]["future"] 
  */

// https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/Basics
// https://developer.mozilla.org/fr/docs/Learn/JavaScript/Objects/JSON
