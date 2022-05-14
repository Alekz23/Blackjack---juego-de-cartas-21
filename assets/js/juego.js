
// 2C --- > 2 de treboles
// 2D --- > 2 de diamantes  
// 2H --- > 2 de corazones
// 2S --- > 2 de picas 

//modulo de patron ---> encapsula los metodos y atributos ---> protección

const miModulo = (() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugadores = [];


    // si busca un id(#name), una etiqueta('name')
    let btnPedir = document.querySelector('#btnPedir');
    let btnDetener = document.querySelector('#btnDetener');
    let btnNuevo = document.querySelector('#btnNuevo');

    let smallPuntosJ = document.querySelectorAll('small');
    let divCartasJugador = document.querySelectorAll('.divCartas');



    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        btnDetener.disabled = false;
        btnPedir.disabled = false;


        // smallPuntosJ[0].innerText = 0;
        // smallPuntosJ[1].innerText = 0;

        smallPuntosJ.forEach(elm => elm.innerText = 0)
        divCartasJugador.forEach(elm => elm.innerText = '')





    }

    const crearDeck = () => {
        deck = [];

        for (let i = 2; i < 11; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);
    }

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'no hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);

        return (isNaN(valor) ? (valor === 'A' ? 10 : 11)
            : valor * 1)
    }


    const acumularPuntos = (carta, jugador) => {

        puntosJugadores[jugador] = puntosJugadores[jugador] + valorCarta(carta);

        smallPuntosJ[jugador].innerText = puntosJugadores[jugador];

        return puntosJugadores[jugador];
    }

    const crearCartas = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador[turno].append(imgCarta);
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputador] = puntosJugadores;

        console.log(puntosMinimos, 'putosmin', puntosComputador);
        setTimeout(() => {
            if (puntosComputador === puntosMinimos) {
                alert('empate')
            } else if (puntosMinimos > 21) {
                alert('pc gana !!')
            } else if (puntosComputador > 21) {
                alert('jugador gana !!')

            } else {
                alert('pc gana !!')
            }
        }, 500);

    }

    const turnoPc = (puntosMinimos) => {

        let puntosComputador = 0;
        do {
            let carta = pedirCarta();

            puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCartas(carta, puntosJugadores.length - 1);

            if (puntosMinimos > 21) {
                break;
            }


        } while (puntosComputador < puntosMinimos && puntosMinimos <= 21);

        determinarGanador();


    }

    btnNuevo.addEventListener('click', () => {

        inicializarJuego();

    })


    btnDetener.addEventListener('click', () => {

        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoPc(puntosJugadores[0]);
    }
    )

    btnPedir.addEventListener('click', () => {

        let carta = pedirCarta();

        let puntosJugador = acumularPuntos(carta, 0);
        crearCartas(carta, 0);

        console.log(puntosJugador);
        if (puntosJugador > 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            console.warn('perdiste');
            turnoPc(puntosJugador)



        } else if (puntosJugador === 21) {
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            console.warn('ganaste!!');
            turnoPc(puntosJugador)

        }
    }
    )

    btnDetener.disabled = true;
    btnPedir.disabled = true;


})();


