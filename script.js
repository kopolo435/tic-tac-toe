const gameBoardContainer = document.querySelector(".gameBoard");

let Gameboard = (() => {
  let boardArray = ["", "", "", "", "", "", "", "", ""];

  let getBoardArray = function () {
    return boardArray;
  };

  let updateGameBoard = function (item, mark) {
    boardArray[item.getAttribute("id")] = mark;
    item.insertAdjacentElement("afterend", createNewBlock(item, mark));
    gameBoardContainer.removeChild(item);
  };

  let createNewBlock = function (item, mark) {
    let newBlock = document.createElement("div");
    let itemId = item.getAttribute("id");
    newBlock.classList.add("block");
    newBlock.textContent = mark;
    newBlock.setAttribute("id", itemId);
    return newBlock;
  };

  return { getBoardArray, updateGameBoard };
})();

function Player(name, mark) {
  const getPLayerName = () => name;
  const getPlayerMark = () => mark;

  return { getPLayerName, getPlayerMark };
}

let GameMaster = (() => {
  const Player1 = Player("Player1", "X");
  const Player2 = Player("Player2", "0");
  let currentPlayer = Player1;

  let nodeGameBoard = document.querySelectorAll(".block");
  nodeGameBoard.forEach((item) => {
    item.addEventListener("click", () => {
      Gameboard.updateGameBoard(item, currentPlayer.getPlayerMark);
      checkWin(Gameboard.getBoardArray(), currentPlayer.getPlayerMark);
      currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
      console.log(Gameboard.getBoardArray);
    });
  });

  let checkWin = function (board, symbol) {
    if (
      (board[0] === symbol && board[1] === symbol && board[2] === symbol) ||
      (board[3] === symbol && board[4] === symbol && board[5] === symbol) ||
      (board[6] === symbol && board[7] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[3] === symbol && board[6] === symbol) ||
      (board[1] === symbol && board[4] === symbol && board[7] === symbol) ||
      (board[2] === symbol && board[5] === symbol && board[8] === symbol) ||
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
      (board[2] === symbol && board[4] === symbol && board[6] === symbol)
    ) {
      return true
    }
  };
})();
