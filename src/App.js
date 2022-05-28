import React, { useState, useEffect } from "react";
import "./App.css";
import Controls from "./components/Controls";
import GOLControls from "./components/GOLControls";
import Board from "./components/Board";
import BoardGOL from "./components/BoardGOL";

import { board, initBoard, GOLboard, initGOLboard } from "./input_board";

function App() {
  //let objectBoard = board;
  // for (let x = 0; x < objectBoard.length; x++) {
  //   for (let y = 0; y < objectBoard[x].length; y++) {
  //     objectBoard[x][y] = Blocks(objectBoard[x][y]);
  //   }
  // }
  //const [inputBoard, setInputBoard] = useState(board);
  const [currentGame, setCurrentGame] = useState("GOL");
  const [bounceBoard, setBounceBoard] = useState(board);
  const [ballSpot, setBallSpot] = useState([1, 1]);
  // GOL Logic:
  const [GOLBoard, setGOLBoard] = useState(GOLboard);

  const updateBoard = (x, y, data) => {
    let copy = [...bounceBoard];
    copy[x][y] = data;
    setBounceBoard(copy);
    // console.log("Board updated");
  };
  const updateBallSpot = (x, y) => {
    deleteBall();
    // console.log("clicked xy: " + x + y);
    setBallSpot([Number(x), Number(y)]);
    addBall(x, y);
  };
  const deleteBall = () => {
    updateBoard(ballSpot[0], ballSpot[1], "0");
    console.log("Deleted ball in spot " + ballSpot[0] + ballSpot[1]);
  };
  const addBall = (x, y) => {
    updateBoard(Number(x), Number(y), "1");
    console.log("Placed ball in spot " + Number(x) + Number(y));
  };

  const updateGOLBoard = (x, y) => {
    let copy = [...GOLBoard];
    if (copy[x][y] === "Y") {
      copy[x][y] = "0";
    } else if (copy[x][y] !== "Y") {
      copy[x][y] = "Y";
    }
    setGOLBoard(copy);
  };
  const switchGame = () => {
    if (currentGame === "Bounce") {
      setCurrentGame("GOL");
      setGOLBoard(GOLboard);
      //updateGOLBoard(0, 0);
    } else if (currentGame === "GOL") {
      setCurrentGame("Bounce");
      setBounceBoard(board);
      updateBoard(ballSpot[0], ballSpot[1], "1");
    }
  };
  useEffect(() => {}, [currentGame, bounceBoard, GOLBoard]);
  return (
    <div className="App">
      <header className="App-header">
        {currentGame === "Bounce" && (
          <>
            <button
              onClick={() => {
                switchGame();
              }}
            >
              Go To Game of Life
            </button>
            <button
              onClick={() => {
                setBounceBoard(initBoard);
              }}
            >
              Default Bounce Board
            </button>
          </>
        )}
        {currentGame === "GOL" && (
          <>
            <button
              onClick={() => {
                switchGame();
              }}
            >
              Go To Bounce
            </button>
            <button
              onClick={() => {
                setGOLBoard(initGOLboard);
              }}
            >
              Default GOL Board
            </button>
          </>
        )}

        {currentGame === "Bounce" && (
          <>
            <Board
              updateBallSpot={updateBallSpot}
              currentBoard={bounceBoard}
              //updateGOLBoard={updateGOLBoard}
            ></Board>
            <Controls
              updateBoard={updateBoard}
              inputBoard={bounceBoard}
              ballSpot={ballSpot}
              //updateBallSpot={updateBallSpot}
            ></Controls>
          </>
        )}
        {currentGame === "GOL" && (
          <>
            <BoardGOL currentBoard={GOLBoard} updateGOLBoard={updateGOLBoard}></BoardGOL>
            <GOLControls></GOLControls>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
