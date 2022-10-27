//#region VARIABLES GLOBALES

let referenceDeck;  // injecter tous les arcanes depuis le json
let shuffledDeck;   // contenant qui va recevoir toutes les cartes mélangées

// selection des DOM existants
let pickedCardsPlaceholders = document.getElementsByClassName("card");
let selectionArea = document.getElementById("selection-area");

console.log(pickedCardsPlaceholders);


const MAXPICK = 4;          // nombre maximum de cartes choisies
let cardsPicked = [];       // liste des cartes tirées par le joueur, objet carte
let cardsTurned = [];       // liste des cartes tournées par le joueur, élément DOM
let cardElements = [];      // liste des cartes tirées par le joueur, element DOM

let isDrawn = false;        // état de jeu
let turnCounter = 0;

// reinjection de contenus
let domCardsPickedNames;    // objet DOM  pour l’injection des cartes sélectionnées
let domResultReading;       // objet DOM pour l’injection du texte des résultats

//#endregion

//#region  PROGRAM

referenceDeck = arcanae.arcane; // à remplacer avec un vrai lecteur JSON
shuffledDeck = shuffle(referenceDeck);

for (let i = 0; i < shuffledDeck.length; i++) {
    let cardElement = document.createElement("button");
    cardElement.setAttribute("id", `card-${i}}`);
    cardElement.setAttribute("class", "cards-position");
    cardElement.setAttribute("value", `${i}`);
    cardElements.push(cardElement);
    selectionArea.appendChild(cardElement);
}

cardElements.forEach(function(i) {
    i.addEventListener("click", function(e) {
        pickCard(e.target.value);
    });
});

for (let i = 0; i < pickedCardsPlaceholders.length; i++) {
    pickedCardsPlaceholders[i].addEventListener("click", function(e) {
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
    if (cardsPicked.length <= MAXPICK - 1) {
        cardsPicked.push(shuffledDeck[value]);
        cardElements[value].remove();
        pickedCardsPlaceholders[cardsPicked.length-1].className += " picked";
    }
    else isDrawn = true;
    console.log(isDrawn);
}

function turnCard(card) {
    console.log(turnCounter);
     
    // check if card hasn’t already been turned
    // turncounter becomes useless
    if (!isDrawn && turnCounter <= MAXPICK && card.className!="card")
    {
        var realCard = shuffledDeck[card.id.replace("card","")];
        cardsTurned.push(card);
        // let image = document.createElement("img");
        // image.src= ;
        // card.appendChild(image);
        // turnCounter++;
        card.style="background-image:url('"+realCard.url+"')";
        card.className += " front";
    }
}

//#endregion

function init(){
    loadJSON(function(response){
        referenceDeck = JSON.parse(response);
    });
}

function loadJSON(callback) {
    let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../assets/data/arcanesMajeurs.json', true);
    xobj.onreadystatechange = function() {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
            console.log("success");
        }
    };
    xobj.send(null);
}