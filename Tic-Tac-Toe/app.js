var tiles = document.querySelectorAll(".tile");
var player_num = document.querySelector(".player_num")
var player = 1

var gameOver = false

var check_X = [1,2,3,4]

var turn = document.querySelector(".turn")

function checkWinner(player) {
    var sets = ['row-1', 'row-2', 'row-3', 'column-1', 'column-2', 'column-3', 'diag-left', 'diag-right']

    var winner = false

    sets.forEach(function (set) {
        var selector = "."+set+"."+player;
        var tiles = document.querySelectorAll(selector);

        if (tiles.length == 3) {
            winner = true;
        }
    })
    return winner;
}

tiles.forEach(function (tile) {
    tile.onclick = function () {
        if (tile.innerHTML == "" && !gameOver){
            if (player == 1) {
                player_num.innerHTML = "O";
                tile.classList.add("X");
                player = 2;
                tile.innerHTML = "X";
                if  (checkWinner("X") == true){
                    console.log("X Wins");
                    turn.innerHTML = "X Wins";
                    gameOver = true;
                    return gameOver
                }
            } else {
                player_num.innerHTML = "X"
                tile.classList.add("O");
                player = 1;
                tile.innerHTML = "O";
                if  (checkWinner("O") == true){
                    console.log("O Wins");
                    turn.innerHTML = "O Wins";
                    gameOver = true
                    return gameOver
                }
            }
        }
    }
})