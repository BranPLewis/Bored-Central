var board_width = 8;

function generateBoard() {
  var board = document.querySelector("#board");
  board.innerHTML = "";
  for (i = 0; i < board_width; i++) {
    var newRow = document.createElement("div");
    newRow.classList.add("row");
    for (j = 0; j < board_width; j++) {
      var newTile = document.createElement("span");
      newTile.classList.add("tile");
      newRow.appendChild(newTile);
    }
    board.appendChild(newRow);
  }
}

generateBoard();
