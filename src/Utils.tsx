// src/utils/gameLogic.ts
import type { Cell } from './hooks/use2048Game';

export const GRID_SIZE = 4;

export const generateEmptyGrid = (): Cell[][] => {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => null),
  );
};

export const getRandomEmptyCell = (grid: Cell[][]): [number, number] | null => {
  const emptyCells: [number, number][] = [];
  grid.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === null) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length === 0) return null; // 빈 셀이 없을 경우 null 반환

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  return randomCell !== undefined ? randomCell : null; // undefined인 경우 null로 처리
};

export const addNewNumber = (grid: Cell[][]): Cell[][] => {
  const newGrid: Cell[][] = grid.map((row) => [...row]); // 기존 그리드를 복사하여 새 배열 생성
  const newNumber = Math.random() < 0.9 ? 2 : 4; // 90% 확률로 2, 10% 확률로 4 생성
  const emptyCell = getRandomEmptyCell(newGrid); // 빈 셀 찾기

  if (emptyCell !== null) {
    const [x, y] = emptyCell;

    // x와 y의 유효성을 먼저 확인한 후 값 할당
    if (newGrid[x] !== undefined && newGrid[x][y] === null) {
      newGrid[x][y] = newNumber; // 빈 셀에 새 숫자 추가
    }
  }

  return newGrid; // 새 그리드를 반환
};

export const slideRow = (
  row: Cell[],
  updateScore: (points: number) => void,
): Cell[] => {
  const filteredRow = row.filter((num) => num !== null);
  const newRow: Cell[] = [];
  let points = 0;

  for (let i = 0; i < filteredRow.length; i++) {
    if (filteredRow[i] === filteredRow[i + 1]) {
      const mergedValue = (filteredRow[i] ?? 0) * 2;
      newRow.push(mergedValue);
      points += mergedValue;
      i++;
    } else {
      newRow.push(filteredRow[i] ?? 0);
    }
  }

  updateScore(points);
  return newRow.concat(Array(GRID_SIZE - newRow.length).fill(null));
};

export const rotateGrid = (grid: Cell[][]): Cell[][] =>
  grid.map((_, colIndex) => grid.map((row) => row[colIndex] ?? null).reverse());

export const moveLeft = (
  grid: Cell[][],
  updateScore: (points: number) => void,
): { newGrid: Cell[][]; canMove: boolean } => {
  const newGrid = grid.map((row) => slideRow(row, updateScore));
  const canMove = JSON.stringify(newGrid) !== JSON.stringify(grid);
  return { newGrid, canMove };
};

export const moveRight = (
  grid: Cell[][],
  updateScore: (points: number) => void,
): { newGrid: Cell[][]; canMove: boolean } => {
  const newGrid = grid.map((row) =>
    slideRow([...row].reverse(), updateScore).reverse(),
  );
  const canMove = JSON.stringify(newGrid) !== JSON.stringify(grid);
  return { newGrid, canMove };
};

export const moveUp = (
  grid: Cell[][],
  updateScore: (points: number) => void,
): { newGrid: Cell[][]; canMove: boolean } => {
  let newGrid = rotateGrid(grid);
  newGrid = newGrid.map((row) =>
    slideRow([...row].reverse(), updateScore).reverse(),
  );
  newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid))); // Rotate back to original orientation
  const canMove = JSON.stringify(newGrid) !== JSON.stringify(grid);
  return { newGrid, canMove };
};

export const moveDown = (
  grid: Cell[][],
  updateScore: (points: number) => void,
): { newGrid: Cell[][]; canMove: boolean } => {
  let newGrid = rotateGrid(grid);
  newGrid = newGrid.map((row) => slideRow(row, updateScore));
  newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid))); // Rotate back to original orientation
  const canMove = JSON.stringify(newGrid) !== JSON.stringify(grid);
  return { newGrid, canMove };
};

export const has2048 = (grid: Cell[][]): boolean => {
  return grid.some((row) => row.some((cell) => cell === 128));
};

export const isGameOver = (grid: Cell[][]): boolean => {
  // Check for empty cells
  const hasEmptyCell = grid.some((row) => row.some((cell) => cell === null));
  if (hasEmptyCell) return false;

  // Check for possible merges
  const hasPossibleMerge = grid.some((row, i) =>
    row.some((cell, j) => {
      const rightNeighbor = j < GRID_SIZE - 1 ? grid[i]?.[j + 1] : null;
      const bottomNeighbor = i < GRID_SIZE - 1 ? grid[i + 1]?.[j] : null;
      return (
        cell !== null && (cell === rightNeighbor || cell === bottomNeighbor)
      );
    }),
  );

  return !hasPossibleMerge;
};
