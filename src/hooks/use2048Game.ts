import { useCallback, useEffect, useState } from 'react';

import {
  addNewNumber,
  generateEmptyGrid,
  has2048,
  isGameOver,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from '../Utils';

export type Cell = number | null;

export const use2048Game = () => {
  const [grid, setGrid] = useState<Cell[][]>(generateEmptyGrid);
  const [score, setScore] = useState(0);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    let newGrid = addNewNumber(generateEmptyGrid());
    newGrid = addNewNumber(newGrid);
    setGrid(newGrid);
  }, []);

  const updateScore = useCallback((points: number) => {
    setScore((prevScore) => prevScore + points);
  }, []);

  const checkGameEnd = useCallback((currentGrid: Cell[][]) => {
    if (has2048(currentGrid)) {
      setHasWon(true);
      setIsGameEnded(true);
      return true;
    }
    if (isGameOver(currentGrid)) {
      setIsGameEnded(true);
      return true;
    }
    return false;
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isGameEnded) return;

      let newGrid: Cell[][] = [...grid.map((row) => [...row])];
      let canMove = false;

      switch (e.key) {
        case 'ArrowLeft': {
          const leftResult = moveLeft(grid, updateScore);
          newGrid = leftResult.newGrid;
          canMove = leftResult.canMove;
          break;
        }
        case 'ArrowRight': {
          const rightResult = moveRight(grid, updateScore);
          newGrid = rightResult.newGrid;
          canMove = rightResult.canMove;
          break;
        }
        case 'ArrowUp': {
          const upResult = moveUp(grid, updateScore);
          newGrid = upResult.newGrid;
          canMove = upResult.canMove;
          break;
        }
        case 'ArrowDown': {
          const downResult = moveDown(grid, updateScore);
          newGrid = downResult.newGrid;
          canMove = downResult.canMove;
          break;
        }
        default:
          return;
      }

      if (canMove) {
        newGrid = addNewNumber(newGrid);
        setGrid(newGrid);
        checkGameEnd(newGrid);
      }
    },
    [grid, updateScore, isGameEnded, checkGameEnd],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const resetGame = () => {
    let newGrid = addNewNumber(generateEmptyGrid());
    newGrid = addNewNumber(newGrid);
    setGrid(newGrid);
    setScore(0);
    setIsGameEnded(false);
    setHasWon(false);
  };

  return { grid, score, isGameEnded, hasWon, resetGame };
};
