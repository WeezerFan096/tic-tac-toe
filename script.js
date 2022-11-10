let winCond = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let turnOn = true;
let playerTurn = "O";
let whosTurnIsIt = () => `${playerTurn}'s turn`;
let statusDisplay = document.querySelector('.winStatement');
let winMessege = () => ` ${playerTurn} won`;
let drawMessege = () => 'draw';
let whoWonArray = ["", "", "", "", "", "", "", "", ""];
statusDisplay.innerHTML = whosTurnIsIt();

function whoWon() {
 let roundWon = false;
 for (let i = 0; i <= 7; i++) {
    const winCondition=winCond[i];
    let condAlpha=whoWonArray[winCondition[0]];
    let condBeta=whoWonArray[winCondition[1]];
    let condCharlie=whoWonArray[winCondition[2]];
    if (condAlpha=== '' || condBeta === '' || condCharlie=== '') {
        continue;
}
    if (condAlpha=== condBeta && condBeta === condCharlie) {
        roundWon = true;
        break
}

}

 if (roundWon) {
    statusDisplay.innerHTML = winMessege();
    turnOn = false;

    return;
}

 let roundDraw = !whoWonArray.includes("");
 if (roundDraw) {
    statusDisplay.innerHTML = drawMessege();
    turnOn = false;

    return;
}

playerChanger();
}

function playerChanger() {
    playerTurn = playerTurn === "X" ? "O" : "X";
    statusDisplay.innerHTML = whosTurnIsIt();
}

function gameRestart() {
    turnOn = true;
    playerTurn = "X";
    whoWonArray = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = whosTurnIsIt();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

function handleCellPlayed(boxClicked, indexOfClickedBox) {
    
    boxClicked.innerHTML = playerTurn;
    whoWonArray[indexOfClickedBox] = playerTurn;
}


function cellClick(cellEvent) {
    let boxClicked = cellEvent.target;
    let indexOfClickedBox = parseInt(boxClicked.getAttribute('data-cell-index'));

    if (whoWonArray[indexOfClickedBox] !== "" || !turnOn) {
        return;
    }

    handleCellPlayed(boxClicked, indexOfClickedBox);
    whoWon();
}



document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.resetGame').addEventListener('click', gameRestart);