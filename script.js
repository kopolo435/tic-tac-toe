let Gameboard = (() => {
  let gameboard = [];

  return { gameboard };
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
    item.addEventListener(
      "click",
      () => {
        item.textContent = mark;
        mark = mark === "X" ? "0" : "X";
      },
      { once: true }
    );
  });
})();
