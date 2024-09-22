import { useState } from 'react';
import styled from 'styled-components';

import Tile from './Tile.tsx';
import getInitialGrid from './UtilTiles.tsx';

const GridSize = 4;

const Board = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 20vmin);
  grid-template-columns: repeat(4, 20vmin);
  gap: 2vmin;
  border-radius: 1vmin;
  padding: 2vmin;
  position: relative;
`;

const Cell = styled.div`
  background-color: lightgray;
  border-radius: 1vmin;
`;

export default function Grid() {
  const [tileList] = useState(getInitialGrid);

  return (
    <Board>
      {new Array(GridSize * GridSize).fill(0).map((_, i) => (
        <Cell key={i} />
      ))}
      {tileList.map((item) => (
        <Tile key={item.id} {...item} />
      ))}
    </Board>
  );
}
