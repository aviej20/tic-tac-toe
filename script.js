function Cell(row, column){

    rowNum = row;
    columnNum = column;
    marker = "";

    return {marker, rowNum, columnNum};
}

/* Creates gameboard as well as contains notEmptyBoard, addMarker to cell, printBoard, & getBoard
    Returns parameters for an object containing the above function
 */
const gameBoard = (function (){

    const rows = 3, columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j=0; j< columns; j++){
            board[i].push(Cell(i, j));
        }
    }

    const getBoard = () => board;


    const notEmptyBoard = () => {
            return board.every(row => row.every(cell => cell.marker !== ""));
        };

    const addMarker = (activePlayer, row, column) => {

            if(!board[row][column].marker){
                board[row][column].marker = activePlayer.marker;
                console.log(board[row][column]);
                return true;
            }
            else{
                console.log("Not a valid space");
                return false;
            }
        
    };


    const printBoard = () => {

        const newBoard = board.map(row => row.map(cell => cell.marker)); // cell returns object array to row array 
        console.log(newBoard);

    };


    const resetBoard = () => {

    let row = 0;
    while(row < 3){
        for(let column = 0; column < 3; column++){

            const cell = document.querySelector(`.cell[data-row="${row}"][data-column="${column}"]`);

            const img = cell.querySelector("img");

            img.classList.replace("unhidden-svg", "hidden-svg");
        }
        row++;
    }
    board.map(row => row.map(cell => cell.marker = ""));
    console.log(printBoard());
}

    return {getBoard, addMarker, printBoard, notEmptyBoard, resetBoard};
})();

const gameMaster = (function (){
    
    let playerOneName = "Player One";
    let playerTwoName = "Player Two"

    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const switchPlayerTurn = () => {
        console.log("Switching Players...");
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    };

    const gameWinner = () =>{
    
        const currentBoard = gameBoard.getBoard();

        let i =0;
        while(i < 3){
            //check rows
            if ((currentBoard[i][0].marker !== "") && (currentBoard[i][0].marker == currentBoard[i][1].marker) && (currentBoard[i][1].marker == currentBoard[i][2].marker)){
                console.log("Winner through rows");
                alert("Winner through rows");
                return true;
            }
            //check columns
            else if ((currentBoard[0][i].marker !== "") && (currentBoard[0][i].marker == currentBoard[1][i].marker) && (currentBoard[1][i].marker == currentBoard[2][i].marker)){
                console.log("Winner through columns");
                alert("Winner through columns");
                return true;
            }
            i++;
        }

             //check diagonals
         if ((currentBoard[0][0].marker !== "") && (currentBoard[0][0].marker == currentBoard[1][1].marker) && (currentBoard[1][1].marker == currentBoard[2][2].marker)){
                console.log("Winner through diagonals");
                alert("Winner through diagonals");
                return true;
        }
        else if ((currentBoard[2][0].marker !== "") && (currentBoard[2][0].marker == currentBoard[1][1].marker) && (currentBoard[1][1].marker == currentBoard[0][2].marker)){
                console.log("Winner through diagonals");
                alert("Winner through diagonals");
                return true;
        }

        //check tie
        if (gameBoard.notEmptyBoard() == true){
            console.log("Tie game");
            alert("Tie game");
            return true;
        }
    };

    const getCompChoice = () =>{
        let choiceRow = Math.floor(Math.random()*3);
        let choiceColumn = Math.floor(Math.random()*3);
        return {choiceRow, choiceColumn};
    };

    const playRound = (inputRow, inputColumn) => {
    
        console.log("New Round");

        let currentPlayer = getActivePlayer();

        console.log("Current Player: " + currentPlayer.name);

        // Player's turn
        if (currentPlayer.name === "Player One") {
            console.log("Person going...");
    
            let playersMove = gameBoard.addMarker(currentPlayer, inputRow, inputColumn);
            // Check if move is valid before continuing
            if (!playersMove) {
                alert("Space is full, Please try again");
                console.log("Space is full");
                return;
            }

            gameBoard.printBoard();
    

            if (gameWinner()) {
                console.log("Game Over");
                return;
            }
        
            switchPlayerTurn();
        }

       currentPlayer = getActivePlayer();


        if (currentPlayer.name === "Player Two") {
            console.log("Computer going...");
    
            let compChoice;
            let validMove = false;
    
            while (!validMove) {
                compChoice = getCompChoice();
                validMove = gameBoard.addMarker(currentPlayer, compChoice.choiceRow, compChoice.choiceColumn);
            }
    

            setTimeout( () => {screenDOMController.updateCellImage(currentPlayer, compChoice.choiceRow, compChoice.choiceColumn)}, 1000);
            gameBoard.printBoard();
    
            if (gameWinner()) {
                console.log("Game Over");
                return;
            }
            switchPlayerTurn();
        }

        console.log("current player: " + currentPlayer.name);
     
    };

    return{playRound, getActivePlayer, gameWinner};
})();


const screenDOMController= (function(){


    const nameEnteringPrompt = () => {

        const form = document.createElement("form");

        //form.appendChild()

    };

    const getPlayerChoice = (row, column) => { 

        console.log("Clicked column: " + column);

        return{row, column};
    };

    
    const updateCellImage = (activePlayer, row, column) => {

        const cell = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);

        const img = cell ? cell.querySelector("img") : "";

        if(activePlayer.marker == "O"){
            img.setAttribute("src", "svgs/skull.svg");
            img.classList.replace("hidden-svg", "unhidden-svg");
        }
        else{
            img.classList.replace("hidden-svg", "unhidden-svg");
        }

    };

    const gameBoardContainer = document.getElementsByClassName("gameboard-container");

    const board = gameBoard.getBoard();

    board.forEach(row => { row.forEach(column => {

        const gameBoardCell = document.createElement("div");

        gameBoardCell.dataset.row = column.rowNum;
        gameBoardCell.dataset.column =column.columnNum;

        const image = document.createElement("img");

        image.classList.add("svg-styles", "hidden-svg");

        image.setAttribute("src", "svgs/crossbones.svg"); //placeholder

        gameBoardCell.addEventListener("click", ()=>{

                if(gameMaster.gameWinner()){
                    return;
                }
                else{
                const {row, column} = getPlayerChoice(gameBoardCell.dataset.row, gameBoardCell.dataset.column);

                updateCellImage(gameMaster.getActivePlayer(), row, column);

                 gameMaster.playRound(row, column);
                }
                });

        gameBoardCell.classList.add("cell");

        gameBoardContainer[0].appendChild(gameBoardCell).appendChild(image);
    })
    });

    document.getElementById('reset').addEventListener("click", ()=> {
        
        console.log("Reset button worked");
        gameBoard.resetBoard();

        if(gameMaster.getActivePlayer().name == "Player Two"){
            gameMaster.switchPlayerTurn();
        }
    });

    return {updateCellImage};

})();