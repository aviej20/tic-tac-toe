const createGameBoard = (function (){

    const rows = 3, columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];

        for(let j=0; j< columns; j++){
            board[i].push(Cell());
        }
    }

    console.log(board);
    return {};
})();


function Cell(){

    let playerSpace = "", marker = "";



    return {playerSpace, marker};
}