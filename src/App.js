import React, { useState, useEffect } from "react";
import "./App.css";
import Controls from "./components/Controls";
import Board from "./components/Board";
import { board, initBoard } from "./input_board";

function App() {
  //let objectBoard = board;
  // for (let x = 0; x < objectBoard.length; x++) {
  //   for (let y = 0; y < objectBoard[x].length; y++) {
  //     objectBoard[x][y] = Blocks(objectBoard[x][y]);
  //   }
  // }
  //const [inputBoard, setInputBoard] = useState(board);
  const [currentBoard, setCurrentBoard] = useState(board);
  const [ballSpot, setBallSpot] = useState([1, 1]);

  const updateBoard = (x, y, data) => {
    let copy = [...currentBoard];
    copy[x][y] = data;
    setCurrentBoard(copy);
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

  useEffect(() => {
    updateBoard(ballSpot[0], ballSpot[1], "1");
  }, [initBoard]);
  return (
    <div className="App">
      <header className="App-header">
        <button
          onClick={() => {
            setCurrentBoard(initBoard);
          }}
        >
          ResetBoard
        </button>
        <div>
          <Board currentBoard={currentBoard} updateBallSpot={updateBallSpot}></Board>
        </div>
        <Controls
          updateBoard={updateBoard}
          inputBoard={currentBoard}
          ballSpot={ballSpot}
          //updateBallSpot={updateBallSpot}
        ></Controls>
      </header>
    </div>
  );
}

export default App;
