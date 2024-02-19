import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PageTitle } from '../PageTitle';
import { useNavigate } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

// eslint-disable-next-line
Number.prototype.mod = function (n) {
  return ((this % n) + n) % n;
};

export default function SnakePage() {
  const navigate = useNavigate();
  return (
    <div>
      <PageTitle title="Snake" />
      <button
        className="text-white flex pl-2 md:pl-10 py-1"
        onClick={() => navigate(-1)}
      >
        <ArrowUturnLeftIcon className="w-4 h-4" />
      </button>
      <SnakeGame width={25} />
    </div>
  );
}

/**
 *
 * @param {number} width
 */
function SnakeGame({ width }) {
  const widthSquared = width * width;
  const [running, setRunning] = useState(false);
  const [head, setHead] = useState(3 + width);
  const tail = useRef([head - 2, head - 1]);
  const vx = useRef(1);
  const vy = useRef(0);
  const apple = useRef(Math.floor(Math.random() * widthSquared));
  const growing = useRef(false);
  const gameOver = useRef(false);
  const rows = [...Array(width).keys()];
  const cols = rows;

  function resetGame() {
    setHead(3 + width);
    tail.current = [width + 2, width + 1];
    vx.current = 1;
    vy.current = 0;
    gameOver.current = false;
  }

  let snake = useMemo(() => [...tail.current, head], [tail, head]);

  function gridPieceColor(row, col) {
    const loc = col + width * row;
    if (snake.includes(loc)) {
      return 'bg-bittersweet';
    } else if (loc === apple.current) {
      return 'bg-midnight';
    }
    return 'bg-gainsboro';
  }

  window.addEventListener('keydown', event => {
    switch (event.key) {
      case 'ArrowRight':
      case 'd':
        if (vx.current === -1) {
          break;
        }
        vx.current = 1;
        vy.current = 0;
        break;
      case 'ArrowLeft':
      case 'a':
        if (vx.current === 1) {
          break;
        }
        vx.current = -1;
        vy.current = 0;
        break;
      case 'ArrowUp':
      case 'w':
        if (vy.current === 1) {
          break;
        }
        vx.current = 0;
        vy.current = -1;
        break;
      case 'ArrowDown':
      case 's':
        if (vy.current === -1) {
          break;
        }
        vx.current = 0;
        vy.current = 1;
        break;
      default:
    }
  });

  const getApple = useCallback(() => {
    let nextLocation = Math.floor(Math.random() * widthSquared);
    while (snake.includes(nextLocation)) {
      nextLocation = Math.floor(Math.random() * widthSquared);
    }
    apple.current = nextLocation;
    growing.current = true;
  }, [apple, growing, snake, widthSquared]);

  const advance = useCallback(() => {
    let move;
    if (vx.current > 0) {
      move = (head + vx.current) % width === 0 ? 1 - width : vx.current;
    } else if (vx.current < 0) {
      move = head % width === 0 ? width - 1 : vx.current;
    } else if (vy.current) {
      move = vy.current * width;
    }
    tail.current = [...tail.current.slice(growing.current ? 0 : 1), head];
    growing.current = false;
    setHead(curr => {
      const newHead =
        (((curr + move) % widthSquared) + widthSquared) % widthSquared;
      if (tail.current.includes(newHead)) {
        setRunning(false);
        gameOver.current = true;
        return newHead;
      }
      if (newHead === apple.current) {
        getApple();
      }
      return newHead;
    });
  }, [head, width, getApple, widthSquared]);

  useEffect(() => {
    if (running) {
      setTimeout(advance, 1000 / 20);
    }
  }, [advance, running]);

  return (
    <>
      {/* Buttons */}
      <div className="flex justify-center">
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-bittersweet text-white hover:opacity-80"
          onClick={() => !gameOver.current && setRunning(prev => !prev)}
        >
          {running ? 'Pause' : 'Play'}
        </button>
        <div className="px-4" />
        <button
          className="text-xs sm:text-sm md:text-md w-16 font-semibold px-2 py-1 rounded bg-gainsboro text-midnight hover:opacity-80"
          onClick={resetGame}
        >
          Reset
        </button>
      </div>
      {/* Board */}
      <div className="p-5 grid">
        <div className="grid justify-center">
          {rows.map(row => (
            <div key={row} className="flex">
              {cols.map(col => (
                <div key={col} className={`p-2 ${gridPieceColor(row, col)}`} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <GameOver gameOver={gameOver.current} />
    </>
  );
}

/**
 * @param {bool} gameOver
 * @returns {JSX.Element}
 */
function GameOver({ gameOver }) {
  if (!gameOver) {
    return null;
  }
  return <div className="text-gainsboro font-semibold text-lg">Game Over!</div>;
}
