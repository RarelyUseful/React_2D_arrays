import React, { useState } from "react";
import "./App.css";
//import Blocks from "./Blocks.js";
import Controls from "./components/Controls";
import Board from "./components/Board";
import { board } from "./input_board";

function App() {
  //let objectBoard = board;
  // for (let x = 0; x < objectBoard.length; x++) {
  //   for (let y = 0; y < objectBoard[x].length; y++) {
  //     objectBoard[x][y] = Blocks(objectBoard[x][y]);
  //   }
  // }
  const [inputBoard, setInputBoard] = useState(board);
  const [currentBoard, setCurrentBoard] = useState(inputBoard);
  const [ballSpot, setBallSpot] = useState([1, 2]);

  const updateBoard = (x, y, data) => {
    let copy = [...currentBoard];
    copy[x][y] = data;
    setCurrentBoard(copy);
  };
  const updateBallSpot = (x, y) => {
    updateBoard(ballSpot[0], ballSpot[1], "0");
    setBallSpot([x, y]);
    updateBoard(ballSpot[0], ballSpot[1], "1");
  };
  //const userBall = () => Controls.generateBall(currentBoard, 1, 1);
  //let UserGame = new Game(UserBall);
  //UserGame.start(); {
  // new Controls.Game(Controls.generateBall(currentBoard, 1, 1)).start();

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => {}}>bruteMain</button>
        <div>
          <Board currentBoard={currentBoard}></Board>
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
