function Cell(){

    marker = "";

    return {marker};
}

const gameBoard = (function (){

    const rows = 3, columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j=0; j< columns; j++){
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;


    const notEmptyBoard = () => {
            return board.every(rows => rows.every(columns => columns.marker !== ""));
        };

    const addMarker = (activePlayer, row, column) => {

            if(!board[row][column].marker){
                board[row][column].marker = activePlayer.marker;
                board[row][column].playerSpace = activePlayer.name;
                console.log(board[row][column]);
            }
            else{
                console.log("Not a valid space");
            }
        
    };


    const printBoard = () => {

        const newBoard = board.map((rows) => {rows.map((column)=>{ return column.marker}); return rows}); // column returns object array to rows array 
        console.log(newBoard);

    };


    return {getBoard, addMarker, printBoard, notEmptyBoard};
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

    const playRound = (inputRow, inputColumn) =>{
        console.log("New Round");
        gameBoard.addMarker(getActivePlayer(), inputRow, inputColumn);
        gameBoard.printBoard();
    };

    const switchPlayerTurn = () => {
        console.log("Switching Players...");
        activePlayer = (activePlayer == players[0]) ? players[1] : players[0];
    };

    const gameWinner = () =>{
    
        const currentBoard = gameBoard.getBoard();

        let i =0;
        while(i < currentBoard.length){
            //check rows
            if ((currentBoard[i][0].marker !== "") && (currentBoard[i][0].marker == currentBoard[i][1].marker) && (currentBoard[i][1].marker == currentBoard[i][2].marker)){
                console.log("Winner through rows");
                return true;
            }
            //check columns
            else if ((currentBoard[0][i].marker !== "") && (currentBoard[0][i].marker == currentBoard[1][i].marker) && (currentBoard[1][i].marker == currentBoard[2][i].marker)){
                console.log("Winner through columns");
                return true;
            }
            //check diagonals
            else if ((currentBoard[0][0].marker !== "") && (currentBoard[0][0].marker == currentBoard[1][1].marker) && (currentBoard[1][1].marker == currentBoard[2][2].marker)){
                console.log("Winner through diagonals");
                return true;
            }
            else if ((currentBoard[2][0].marker !== "") && (currentBoard[2][0].marker == currentBoard[1][1].marker) && (currentBoard[1][1].marker == currentBoard[0][2].marker)){
                console.log("Winner through diagonals");
                return true;
            }
            //check tie
            else if (gameBoard.notEmptyBoard() == true){
                console.log("Tie game");
                return true;
            }
            i++;
        }
    };

   /*while(!gameWinner()){
        getActivePlayer();
        var inputRow = prompt(`${getActivePlayer().name} Insert Row`), inputColumn = prompt(`${getActivePlayer().name} Insert Column`);
        console.log("Row: " + inputRow + " Column: " + inputColumn);
        playRound(inputRow, inputColumn);
        switchPlayerTurn();
   } */

    const getCompChoice = () =>{
        let choiceRow = Math.floor(Math.random()*3);
        let choiceColumn = Math.floor(Math.random()*3);
        return {choiceRow, choiceColumn};
    };

    return{getActivePlayer};
})();

function screenDOMController(){

    const gameBoardContainer = document.getElementsByClassName("gameboard-container");

    for(let i=0; i < 9; i++){

        const gameBoardCell = document.createElement("div");

        const image = document.createElement("img");

        image.classList.add("svg-styles", "hidden-svg");

        let activePlayer = gameMaster.getActivePlayer();

        if(activePlayer.name == "Player One" ){

            image.setAttribute("src", "svgs/crossbones.svg");
        }
        else{
            image.setAttribute("src", "svgs/skull.svg");
        }

        gameBoardCell.addEventListener("click", ()=>{
                 image.classList.replace("hidden-svg", "unhidden-svg")
                });

        gameBoardCell.classList.add("cell");

        gameBoardContainer[0].appendChild(gameBoardCell).appendChild(image);
    }



    } screenDOMController();