
//2C = two of clubs
//2D = two of Diamons
//2H = two of Hearts
//2S = two of Spades


let deck            = [];
const tipos         = ['C','D','H','S'];
const especiales    = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;


//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas');
const smallHTML = document.querySelectorAll('small');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const btnDetener = document.querySelector('#btnDetener');


//esta funcion crea una nueva baraja
const crearDeck = () => {

    for(let i = 2; i<= 10; i++) {
        for(let tipo of tipos) {
            deck.push( i + tipo);
        }
    }
        
    for(let tipo of tipos){
        for(let esp of especiales) {
            deck.push( esp + tipo);
        }
    }
    
    //console.log( deck );

    deck = _.shuffle( deck);
    console.log( deck )
    return deck;
}
crearDeck();


// Esta función me permite tomar una carta
const pedirCarta = () => {

    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}



const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return ( isNaN(valor)) ? 
            ( valor === 'A') ? 11 : 10
            : valor * 1;
   
    
    //let puntos = 0
    //if( isNaN( valor ) ) {
//
    //    puntos = (valor === 'A') ? 11 : 10;
    //} else {
    //    puntos = valor * 1;
    //}
    //console.log(puntos);
}


// Turno computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
        const carta = pedirCarta();
        
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smallHTML[1].innerText = puntosComputadora;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );
        if(puntosMinimos > 21) {
            break;
        }


    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

}

//Eventos

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);
    console.log( puntosJugador);
    smallHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21) {
        console.warn('Perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if ( puntosJugador === 21) {
        console.warn('21, ganaste!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
        
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
        
    

});    
   

