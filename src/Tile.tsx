// src/components/Cell.tsx

import React from 'react';

interface CellProps {
  value: number | null;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  // Explicitly handle the null case
  const cellValue = value !== null ? value.toString() : '';

  return (
    <div className="cell" data-value={cellValue}>
      {cellValue}
    </div>
  );
};
export default Cell;
