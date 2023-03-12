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

  let showFinalBoard = function (nodeArray) {
    nodeArray.forEach((node) => {
      node.insertAdjacentElement(
        "afterend",
        createNewBlock(node, boardArray[node.getAttribute("id")])
      );
      gameBoardContainer.removeChild(node);
    });
  };

  return { getBoardArray, updateGameBoard, showFinalBoard };
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

  let gameStatus = function () {
    if (checkWin(Gameboard.getBoardArray(), currentPlayer.getPlayerMark())) {
      console.log(`${currentPlayer.getPLayerName()} has won the game`);
      nodeGameBoard = document.querySelectorAll(".block");
      Gameboard.showFinalBoard(nodeGameBoard);
    } else if (checkTie(Gameboard.getBoardArray())) {
      console.log("The game has ended in a tie");
    } else {
      currentPlayer = currentPlayer === Player1 ? Player2 : Player1;
    }
  };

  nodeGameBoard.forEach((item) => {
    item.addEventListener("click", () => {
      Gameboard.updateGameBoard(item, currentPlayer.getPlayerMark());
      gameStatus();
    });
  });
})();
