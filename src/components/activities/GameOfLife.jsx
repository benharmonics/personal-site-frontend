import { useEffect, useRef, useState } from 'react';
import { PageTitle } from '../PageTitle';
import { useNavigate } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

export default function GameOfLifePage() {
  const navigate = useNavigate();

  return (
    <div>
      <PageTitle title="Game of Life" />
      <button
        className="text-white flex pl-2 md:pl-10 py-1"
        onClick={() => navigate(-1)}
      >
        <ArrowUturnLeftIcon className="w-4 h-4" />
      </button>
      <GameOfLifeBoard width={50} />
    </div>
  );
}

/**
 *
 * @param {number} width
 */
function GameOfLifeBoard({ width }) {
  const initialBoard = Array(width * width).fill(false);
  const [board, setBoard] = useState(initialBoard);
  const [iterating, setIterating] = useState(false);
  const savedBoard = useRef(null);

  useEffect(() => setBoard(Array(width * width).fill(false)), [width]);
  useEffect(() => {
    if (iterating) {
      setTimeout(() => setBoard(prev => nextState(prev, width)), 100 / 3);
    }
  });

  const rows = [...Array(width).keys()]; // [0, 1, ..., width - 1]

  return (
    <>
      {/* Buttons */}
      <div className="flex justify-center">
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-bittersweet text-white hover:opacity-80"
          onClick={() => setIterating(prev => !prev)}
        >
          {iterating ? 'Stop' : 'Run'}
        </button>
        <div className="px-1" />
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-chambray text-white hover:opacity-80"
          onClick={() => setBoard(prev => nextState(prev, width))}
        >
          Next
        </button>
        <div className="px-1 sm:px-2 md:px-4" />
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-chambray text-white hover:opacity-80"
          onClick={() => {
            savedBoard.current = board;
            toast.success('Saved');
          }}
        >
          Save
        </button>
        <div className="px-1" />
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-chambray text-white hover:opacity-80"
          onClick={() => {
            if (!savedBoard.current) {
              toast.error('No saved board', { duration: 2000 });
              return;
            }
            setIterating(false);
            setBoard(savedBoard.current);
          }}
        >
          Load
        </button>
        <div className="px-1 sm:px-4 md:px-10" />
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-chambray text-white hover:opacity-80"
          onClick={() => {
            setIterating(false);
            setBoard(prev => Array(prev.length).fill(false));
          }}
        >
          Clear
        </button>
      </div>
      {/* Board */}
      <div className="p-5 grid">
        <div className="grid justify-center">
          {rows.map(r => {
            const rowActiveState = i => board.slice(i * width, (i + 1) * width);
            const rowOfButtons = [];
            for (const [i, active] of rowActiveState(r).entries()) {
              rowOfButtons.push(
                <button
                  key={i}
                  className={`p-2 ${
                    active ? 'bg-bittersweet' : 'bg-gainsboro'
                  }`}
                  onClick={() =>
                    setBoard(prev => {
                      const next = [...prev];
                      next[i + width * r] = !next[i + width * r];
                      return next;
                    })
                  }
                />
              );
            }
            return (
              <div key={r} className="flex">
                {rowOfButtons}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/**
 * @description - Iterates the board in Conway's "Game of Life"
 * @param {[]bool} board
 * @param {number} width
 */
function nextState(board, width) {
  const ret = [];
  // For each cell, count its neighbors, then determine whether it's
  // alive or dead in the next iteration.
  // https://en.wikipedia.org/wiki/Conway's_Game_of_Life
  for (let i = 0; i < board.length; i++) {
    const [firstRow, lastRow] = [i < width, i >= width * (width - 1)];
    const [firstCol, lastCol] = [i % width === 0, i % width === width - 1];
    let count = 0;
    if (firstRow && firstCol) {
      count = board[i + 1] + board[i + width] + board[i + width + 1];
    } else if (firstRow && lastCol) {
      count = board[i - 1] + board[i + width] + board[i + width - 1];
    } else if (lastRow && firstCol) {
      count = board[i + 1] + board[i - width + 1] + board[i - width];
    } else if (lastRow && lastCol) {
      count = board[i - 1] + board[i - width - 1] + board[i - width];
    } else if (firstRow) {
      count =
        board[i - 1] +
        board[i + 1] +
        board[i + width - 1] +
        board[i + width] +
        board[i + width + 1];
    } else if (firstCol) {
      count =
        board[i - width] +
        board[i - width + 1] +
        board[i + 1] +
        board[i + width] +
        board[i + width + 1];
    } else if (lastRow) {
      count =
        board[i + 1] +
        board[i - 1] +
        board[i - width - 1] +
        board[i - width] +
        board[i - width + 1];
    } else if (lastCol) {
      count =
        board[i + width] +
        board[i + width - 1] +
        board[i - 1] +
        board[i - width] +
        board[i - width - 1];
    } else {
      count =
        board[i - width] +
        board[i - width - 1] +
        board[i - width + 1] +
        board[i + 1] +
        board[i - 1] +
        board[i + width] +
        board[i + width - 1] +
        board[i + width + 1];
    }
    if (board[i]) {
      ret.push(2 <= count && count <= 3);
    } else {
      ret.push(count === 3);
    }
  }
  return ret;
}
