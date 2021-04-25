/*
* 2C = two of Clubs ( tréboles )
* 2D = two of Diaminds ( diamantes )
* 2H = two of hearts ( corazones )
* 2S = two of Spades ( espadas )
*/


let deck = [];
const types = ['C','D','H','S'];
const specials = ['A','J','Q','K']

let playerPoints = 0,
    computerPoints = 0;

//referencia del html
const btnNew = document.querySelector('#btnNew');
const btnGet = document.querySelector('#btnGet');
const btnStop = document.querySelector('#btnStop');

const divPlayerCards = document.querySelector('#player-cards');
const divComputerCards = document.querySelector('#computer-cards');
const showPoints = document.querySelectorAll('small');

//Crea una nueva baraja
const  createDeck = () => {

    for (let i = 2; i < 10; i++) {
        
        for (let j = 0; j < types.length; j++) {
            
            deck.push(i + types[j]);
            
        }
    }

    for( let type of types) {
        for( let special of specials) {
            deck.push( special + type);
        }
    }

    deck = _.shuffle( deck );

    return deck;
}

createDeck();

//Permite tomar una nueva carta
const getPlayingCard = () => {

    // let pos = deck.length-1;
    // let playingCard = deck.splice( pos, 1);
    if ( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }
    const playingCard = deck.pop();

    return playingCard;
}

getPlayingCard();

//
const valuePlayingCard = ( playingCard ) => {

    const value = playingCard.substring(0, playingCard.length - 1);
    // let points = 0;

    //2 = 2  10 = 10,  3 = 3
    // if( isNaN( value ) ) {
    //     console.log('No es un número');
    //     points =  ( valor === 'A') ? 11 : 10;
    // } else {
    //     console.log('Sí es un número');
    //     points = value * 1;
    // }

    // console.log( points );

    return (isNaN( value ))?
                (value ==='A')?11:10
                : value * 1;

}

//turno de la computadora
const computerShift = ( PointsMin ) => {
    //implementar
    do {
        
        const playingCard = getPlayingCard();
        computerPoints = computerPoints + valuePlayingCard(playingCard);
        showPoints[1].innerText = computerPoints;

        const imgPlayingCard = document.createElement('img');
        imgPlayingCard.src = `assets/cartas/${playingCard}.png`;
        imgPlayingCard.classList.add('playing-card');
        divComputerCards.append(imgPlayingCard);

        if(PointsMin > 21) {
            break;
        }

    } while ( (computerPoints < PointsMin) && (PointsMin<=21) );

    setTimeout( () => {

        if (computerPoints === PointsMin) {
            alert('Nadie ganó 😅');
        } else if (PointsMin > 21) {
            alert('La computadora 💻 Gana🏆✨');
        } else if (computerPoints > 21) {
            alert('¡Muy bién! Ganaste🏆✨');
        } else {
            alert('La computadora 💻 Gana🏆✨');
        }
    }, 30);

}



//eventos
btnGet.addEventListener('click', ()=>{

    const playingCard = getPlayingCard();
    playerPoints = playerPoints + valuePlayingCard( playingCard );
    showPoints[0].innerText = playerPoints;

    const imgPlayingCard = document.createElement('img');
    imgPlayingCard.src = `assets/cartas/${ playingCard }.png`;
    imgPlayingCard.classList.add('playing-card');
    divPlayerCards.append( imgPlayingCard );

    if( playerPoints > 21 ) {

        console.warn('Lástima, perdiste :(');
        btnGet.disabled = true;
        btnStop.disabled = true;
        computerShift( playerPoints );

    } else if( playerPoints === 21 ){

        console.warn('21, ¡genial!');
        btnGet.disabled = true;
        btnStop.disabled = true;
        computerShift( playerPoints );
    }


});

btnStop.addEventListener('click', () => {
    btnGet.disabled = true;
    btnStop.disabled = true;

    computerShift( playerPoints )
});

btnNew.addEventListener('click', ()=>{
    console.clear();
    deck = [];
    deck = createDeck();

    playerPoints = 0;
    computerPoints = 0;

    showPoints[0].innerText = 0;
    showPoints[1].innerText = 0;

    divComputerCards.innerHTML = '';
    divPlayerCards.innerHTML = '';

    btnGet.disabled = false;
    btnStop.disabled = false;

});

