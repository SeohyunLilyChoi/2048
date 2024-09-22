// src/components/Grid.tsx

import React from 'react';

import type { Cell } from './hooks/use2048Game';
import CellComponent from './Tile';

interface GridProps {
  grid: Cell[][];
}

const Grid: React.FC<GridProps> = ({ grid }) => {
  return (
    <div className="grid">
      {grid.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => (
            <CellComponent key={j} value={cell} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
