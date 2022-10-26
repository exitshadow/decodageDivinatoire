/*---------Menu---------*/
//Title
//Start Button

/*---------Main---------*/
//Shuffle deck
// var cardsSelection = document.querySelectorAll(".card");        // !!! only cards in card-selector

// [...cardsSelection].forEach((card) => {
//     card.addEventListener("onLoad", function () {      // !!! when loading application.html
//     for (let i = 0; i < card.length; i++) {
//         setTimeout(() => {
//             card[i].classList.add("card" + i);
//         }, 
//         i * 150);
//     };
// });

// //Stack deck

// [...cardsSelection].forEach((card) => {
//     card.addEventListener('stackDeck', function () {        //!!! when done selecting
//     for (let i = 0; i < card.length; i++) {
//         setTimeout(() => {
//             card[i].classList.remove("card" + i);
//         },
//         i * 150);
//     };
// });

//Flip selected cards on click
var flipCards = document.querySelectorAll('.card');

[...flipCards].forEach((card) => {
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });
});

/*in style.css*/
        // .card{transition: transform 1s;}
        // .card.is-flipped{transform: translateX(-100%) rotateY(-180deg)}

//Slide card into designated position
//Reverse spread and pile deck

/*---------Interpretation---------*/
