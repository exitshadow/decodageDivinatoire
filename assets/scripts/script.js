//#region VARIABLES GLOBALES

let referenceDeck;  // injecter tous les arcanes depuis le json
let shuffledDeck;   // contenant qui va recevoir toutes les cartes mélangées

const MAXPICK = 4;  // nombre maximum de cartes choisies
let cardsPicked;    // liste des cartes tirées par le jouer.
                    // sert aussi de compteur pour tester contre MAXPICK

let domCardsPickedNames;    // objet DOM  pour l’injection des cartes sélectionnées
let domResultReading;       // objet DOM pour l’injection du texte des résultats

//#endregion

//#region  PROGRAM

referenceDeck = arcanae.arcane; // à remplacer avec un vrai lecteur JSON
shuffledDeck = shuffle(referenceDeck);

//#endregion

//#region METHODS

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

//#endregion
