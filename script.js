const gameBoardContainer = document.querySelector(".gameBoard");
const nameBtn = document.querySelector("#nameBtn");
const ply1Name = document.querySelector("#player1");
const play2Name = document.querySelector("#player2");
const startBtn = document.querySelector("#startBtn");
const restartBtn = document.querySelector("#restartBtn");
let nodeGameBoard = document.querySelectorAll(".block");
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
    if (mark === "0") newBlock.classList.add("textBlockBlue");
    newBlock.textContent = mark;
    newBlock.classList.add("block");
    newBlock.setAttribute("id", itemId);
    return newBlock;
  };

  let showFinalBoard = function (nodeArray) {
    nodeArray.forEach((node) => {
      node.insertAdjacentElement(
        "afterend",
        createNewBlock(node, boardArray[node.getAttribute("id")])
      );
      gameBoardContainer.removeChild(node);
    });
  };

  let cleanBoard = function (nodeArray) {
    nodeArray.forEach((node) => {
      node.textContent = " ";
      boardArray[node.getAttribute("id")] = "";
    });
  };

  return { getBoardArray, updateGameBoard, showFinalBoard, cleanBoard };
})();

function Player(name, mark) {
  const getPLayerName = () => name;
  const getPlayerMark = () => mark;

  return { getPLayerName, getPlayerMark };
}

let GameMaster = (() => {
  let checkWin = function (board, mark) {
    if (
      (board[0] === mark && board[1] === mark && board[2] === mark) ||
      (board[3] === mark && board[4] === mark && board[5] === mark) ||
      (board[6] === mark && board[7] === mark && board[8] === mark) ||
      (board[0] === mark && board[3] === mark && board[6] === mark) ||
      (board[1] === mark && board[4] === mark && board[7] === mark) ||
      (board[2] === mark && board[5] === mark && board[8] === mark) ||
      (board[0] === mark && board[4] === mark && board[8] === mark) ||
      (board[2] === mark && board[4] === mark && board[6] === mark)
    ) {
      return true;
    }
  };

  let checkTie = function (board) {
    return board.indexOf("") < 0;
  };

  let gameStatus = function (Player1, Player2, currentPlayer) {
    if (checkWin(Gameboard.getBoardArray(), currentPlayer.getPlayerMark())) {
      console.log(`${currentPlayer.getPLayerName()} has won the game`);
      nodeGameBoard = document.querySelectorAll(".block");
      Gameboard.showFinalBoard(nodeGameBoard);
    } else if (checkTie(Gameboard.getBoardArray())) {
      console.log("The game has ended in a tie");
    } else {
      currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
      return currentPlayer;
    }
  };

  let gameStart = function (Player1, Player2) {
    let currentPlayer = Player1;
    nodeGameBoard = document.querySelectorAll(".block");
    nodeGameBoard.forEach((item) => {
      item.addEventListener("click", () => {
        Gameboard.updateGameBoard(item, currentPlayer.getPlayerMark());
        currentPlayer = gameStatus(Player1, Player2, currentPlayer);
      });
    });
  };

  let gameRestart = function () {
    Gameboard.cleanBoard();
    gameStart();
  };

  return { gameStart };
})(nodeGameBoard);
let Player1;
let Player2;
nameBtn.addEventListener("click", () => {
  Player1 = Player(ply1Name.value, "X");
  Player2 = Player(play2Name.value, "0");
  startBtn.disabled = false;
});

startBtn.addEventListener("click", () => {
  GameMaster.gameStart(Player1, Player2);
  restartBtn.disabled = false;
  startBtn.disabled = true;
});

restartBtn.addEventListener("click", () => {
  Gameboard.cleanBoard(document.querySelectorAll(".block"));
  GameMaster.gameStart(Player1,Player2);
});
