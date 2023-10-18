/*-----------
FASE DI PREPARAZIONE
------*/

//Recuperare dalla pagina tutti gli elementi di interesse
const scoreCounter = document.querySelector(".score-counter")
const grid = document.querySelector(".grid");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainButton = document.querySelector(".play-again");

// Preparo informazione utili alla logica di gioco
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombslist = [];
let score = 0;

//Generare TOT Bombe casuali
while (bombslist.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombslist.includes(number)) {
        bombslist.push(number);
    }
}


console.log(bombslist);

/*--------------------------
GRIGLIA E LOGICA DI GIOCO
----------------------------*/

let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= 100; i++) {
    // Creo un elemento e gli do la classe 'cell'
    const cell = document.createElement('div');
    cell.classList.add('cell');

    isCellEven = i % 2 === 0;


    // Se la riga è pari e la cella è pari casella grigia
    // Se la riga è dispari e la cella è dispari casella grigia
    if (isRowEven && isCellEven) cell.classList.add('cell-dark');
    else if (!isRowEven && !isCellEven) cell.classList.add('cell-dark');

    // Se sono alla fine della riga..

    if (i % 10 === 0) isRowEven = !isRowEven;



    // # Gestiamo il clicl della cella
    cell.addEventListener('click', function () {
        // ! Controllo che la ella non sia già stata cliccata
        if (cell.classList.contains('cell-clicked')) return;


        // Questo codice viene esguito quando avviene l'evento
        if (bombslist.includes(i)) {
            // Se è una bomba..
            cell.classList.add('cell-bomb')
            endGame(false);

        } else {
            // Se non lo è..
            cell.classList.add('cell-clicked')
            updateScore();
        }
    })

    // Lo inserisco nella griglia
    grid.appendChild(cell);
}


/*---------
FUNZIONI
----------*/

// Funzione per aggironare il punteggio
function updateScore() {
    //Incremento lo score
    score++;
    // Lo inserisco nel contatore
    scoreCounter.innerText = String(score).padStart(5, 0);

    // Controlliamo se l'utente ha vinto
    if (score === maxScore) endGame(true);
}

// Funzione per decretare la fine del gioco
function endGame(isVictory) {
    if (isVictory === true) {
        // Coloriamo di verde e cambiamo il messaggio
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN'
    } else {
        // Riveliamo tutte le bombe
        revealAllBombs();
    }

    // Mostriao la schermata rimuovendo la classe
    endGameScreen.classList.remove('hidden');
}

//Funzione per ricaricare la pagina
function playAgain() {
    location.reload();
}


// Funzione che rileva tutte le bombe
function revealAllBombs() {
    // Recupero tutte le celle
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        // controllo se la cella è una bomba
        if (bombslist.includes(i)) {
            const cellToReveal = cells[i - 1];
            cellToReveal.classList.add('cell-bomb');
        }

    }


}

/*----------------
EVENTI
-----------------*/

playAgainButton.addEventListener('click', playAgain);

console.log(bombslist);