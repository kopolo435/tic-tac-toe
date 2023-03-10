const gameBoardContainer = document.querySelector(".gameBoard");

let Gameboard = (() => {
  let gameboard = ["","","","","","","","",""];

  let updateGameBoard = function (item, mark) {
    gameboard[item.getAttribute("id")] = mark
    item.insertAdjacentElement("afterend", createNewBlock(item,mark));
    gameBoardContainer.removeChild(item);
  };

  let createNewBlock = function(item,mark){
    let newBlock = document.createElement("div");
    let itemId = item.getAttribute("id");
    newBlock.classList.add("block");
    newBlock.textContent = mark;
    newBlock.setAttribute("id",itemId);
    return newBlock
  }

  return { gameboard, updateGameBoard };
})();

function Player(name, mark) {
  const getPLayerName = () => name;
  const getPlayerMark = () => mark;

  return { getPLayerName, getPlayerMark };
}

let GameMaster = (() => {
  const Player1 = Player("Player1", "X");
  const Player2 = Player("Player2", "0");
  let mark = "X";

  let nodeGameBoard = document.querySelectorAll(".block");
  nodeGameBoard.forEach((item) => {
    item.addEventListener("click", () => {
      Gameboard.updateGameBoard(item, mark);
      mark = mark === "X" ? "0" : "X";
      console.log(Gameboard.gameboard)
    });
  });
})();
