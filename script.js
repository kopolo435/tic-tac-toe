let Gameboard = (() => {
  let gameboard = [];

  return {gameboard}
})();

function Player(name, mark) {
  const getPLayerName = () => name;
  const getPlayerMark = () => mark;

  return { getPLayerName, getPlayerMark };
}
