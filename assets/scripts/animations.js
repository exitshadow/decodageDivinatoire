/*---------Menu---------*/
//Title
//Start Button

/*---------Main---------*/
//Shuffle deck
//Spread deck
//Flip card
var cards = document.querySelectorAll('.card');

[...cards].forEach((card) => {
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });
});

//Slide card into designated position
//Reverse spread and pile deck

/*---------Interpretation---------*/
//Text div alpha 0>1 

