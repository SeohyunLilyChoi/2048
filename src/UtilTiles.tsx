export default function getInitialGrid() {
  const initialTileList: Array<{
    id: number;
    x: number;
    y: number;
    value: number;
  }> = [];
  const tile1 = makeTile(initialTileList);
  initialTileList.push(tile1);
  const tile2 = makeTile(initialTileList);
  initialTileList.push(tile2);

  return initialTileList;
}

function checkCollision(
  tileList: Array<{
    id: number;
    x: number;
    y: number;
    value: number;
  }>,
  tile: {
    id: number;
    x: number;
    y: number;
    value: number;
  },
) {
  return tileList.some((item) => item.x === tile.x && item.y === tile.y);
}

let currentId = 0;

export function makeTile(
  tileList: Array<{ id: number; x: number; y: number; value: number }>,
) {
  let tile: { id: number; x: number; y: number; value: number } = {
    id: currentId++,
    x: Math.floor(Math.random() * 3),
    y: Math.floor(Math.random() * 3),
    value: 2,
  };
  while (checkCollision(tileList, tile)) {
    tile = {
      id: currentId++,
      x: Math.floor(Math.random() * 3),
      y: Math.floor(Math.random() * 3),
      value: 2,
    };
  }
  return tile;
}
