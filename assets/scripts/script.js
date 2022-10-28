//#region VARIABLES GLOBALES

let referenceDeck; // injecter tous les arcanes depuis le json
let shuffledDeck; // contenant qui va recevoir toutes les cartes mélangées

// selection des DOM existants page tirage
let pickedCardsPlaceholders = document.getElementsByClassName("card");
let selectionArea = document.getElementById("selection-area");
let drawButton = document.getElementById("draw-button");

console.log(pickedCardsPlaceholders);

// seléction des DOM existants page résultat
let resultsElement = document.getElementById("results");

let pastTitle = document.getElementById("past-title");
let presentTitle = document.getElementById("present-title");
let adviceTitle = document.getElementById("advice-title");
let resultTitle = document.getElementById("result-title");

let pastParagraph = document.getElementById("paragraph1");
let presentParagraph = document.getElementById("paragraph2");
let adviceParagraph = document.getElementById("paragraph3");
let resultParagraph = document.getElementById("paragraph4");

const MAXPICK = 4; // nombre maximum de cartes choisies
let cardsPicked = []; // liste des cartes tirées par le joueur, objet carte
let cardsTurned = []; // liste des cartes tournées par le joueur, élément DOM
let cardElements = []; // liste des cartes tirées par le joueur, element DOM

let isDrawn = false; // est-ce que toutes les cartes sont tirées
let turnCounter = 0; // compteur des cartes retournées

// reinjection de contenus
let domCardsPickedNames; // objet DOM  pour l’injection des cartes sélectionnées
let domResultReading; // objet DOM pour l’injection du texte des résultats

//#endregion

//#region persistent variables & game state management
if (typeof(Storage) !== "undefined") {
  if (resultsElement) {
    pastTitle.innerHTML += localStorage.pastCardName;
    presentTitle.innerHTML += localStorage.presentCardName;
    adviceTitle.innerHTML += localStorage.adviceCardName;
    resultTitle.innerHTML += localStorage.resultCardName;

    pastParagraph.innerHTML = localStorage.pastText;
    presentParagraph.innerHTML = localStorage.presentText;
    adviceParagraph.innerHTML = localStorage.adviceText;
    resultParagraph.innerHTML = localStorage.resultText;
  }
} else {
  alert("hey, your browser doesn’t support session storage, that’s too bad.");
}
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

drawButton.addEventListener("click", function (e) {
  setDrawingValues();
});

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
    let image = document.createElement("img");
    image.src= realCard.url;
    card.appendChild(image);
    card.className += " visible";
    turnCounter++;
  }
}

function setDrawingValues() {
  localStorage.exists = true;

  localStorage.pastCardName     =  cardsPicked[0].name;
  localStorage.presentCardName  =  cardsPicked[1].name;
  localStorage.adviceCardName   =  cardsPicked[2].name;
  localStorage.resultCardName   =  cardsPicked[3].name;

  localStorage.pastText = cardsPicked[0].signification.past;
  localStorage.presentText = cardsPicked[1].signification.present;
  localStorage.adviceText = cardsPicked[2].signification.advice;
  localStorage.resultText = cardsPicked[3].signification.present;

  console.log(pastCardName);
}
//#endregion
