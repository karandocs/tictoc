/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var moves = 0;
let endGame = false;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
    turn = 'X';
    console.log('start')
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() { // move by the player
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let current_turn = turn;

    if(endGame){
        alert('Reset game');
        resetGame();
    }

    if(grid[colIdx][rowIdx] !== 0){
        console.log('Box already taken')
        return
    }

    grid[colIdx][rowIdx] = 1;
    moves += 1
    renderMainGrid();

    addClickHandlers();

    if(checkForWin(colIdx, rowIdx)){
        alert('Winner is '+ turn);
        resetGame();
    } else{
        turn = 'O'
        randomMove();
    }

}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}


function randomMove(){ // random move by the computer
    var cs=grid.length,
        cr=Math.floor((Math.random()*cs)+1)-1,
        cc=Math.floor((Math.random()*cs)+1)-1;
    if(grid[cr][cc] === 0){ 
        grid[cr][cc] = 2;
        renderMainGrid();
        addClickHandlers();
        if(checkForWin(cr, cc)){
            alert('Winner is '+ turn);
            resetGame();
        } else {
            turn = 'X'
        }
    } else { randomMove(); }
}

function getCol(matrix, col){ // gets column value based on the column id
   var column = [];
   for(var i=0; i<matrix.length; i++){
      column.push(matrix[i][col]);
   }
   return column;
}

function columnWin(id){ // checks for column win condition
    column = getCol(grid, id)
    return column.every( (val, i, arr) => val === arr[0] )
}

function rowWin(id){ // checks for row win condition
    row = grid[id]
    return row.every( (val, i, arr) => val === arr[0] )
}

function diagonalWin() { // checks for diagonal win condition
    b = grid;
    var win=3, len=b.length, pdr=0, pdl=0, cdr = 0, cdl = 0;
    for(var i=0;i<len;i++){
        for(var j=0;j<len;j++){
            
            if(b[i][j]=== 1 && i<len-win+1){ pdr=0; pdl=0;
                for(var z=0;z<win;z++){ 
                    (b[i+z][j+z]=== 1) ? pdr++ : pdr=0;
                    (b[i+z][j-z]=== 1) ? pdl++ : pdl=0;
                }
            }

            if(b[i][j]=== 2 && i<len-win+1){ cdr=0; cdl=0;
                for(var z=0;z<win;z++){ 
                    (b[i+z][j+z]=== 2) ? cdr++ : cdr=0;
                    (b[i+z][j-z]=== 2) ? cdl++ : cdl=0;
                }
            }

            if(cdr===win || cdl===win || pdr===win || pdl===win){ return true;}
        }
    }
}

function checkForWin(r, c) {
    if (columnWin(c)){
        return true
    } else if (rowWin(r)){
        return true
    } else if (diagonalWin()){
        return true
    } else if (GRID_LENGTH * GRID_LENGTH === moves){
        endGame = true
    }
    return false
}

function startGame(){
    initializeGrid();
    renderMainGrid();
    addClickHandlers();
}

function resetGame(){
    location.reload();
}

startGame();
