import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

import Controls from "./components/Controls";
import GOLControls from "./components/GOLControls";
import Board from "./components/Board";
import BoardGOL from "./components/BoardGOL";

import { board, initBoard, GOLboard, initGOLboard } from "./components/input_board";

function App() {
  const [currentGame, setCurrentGame] = useState("GOL");
  const [bounceBoard, setBounceBoard] = useState(board);
  const [ballSpot, setBallSpot] = useState([1, 13]);
  const [GOLBoard, setGOLBoard] = useState(GOLboard);
  //Bounce Logic:
  const updateBoard = (x, y, data) => {
    let copy = [...bounceBoard];
    copy[x][y] = data;
    setBounceBoard(copy);
    // console.log("Board updated");
  };
  const updateBallSpot = (x, y) => {
    deleteBall();
    // console.log("clicked xy: " + x + y);
    if (!(ballSpot[0] === x && ballSpot[1] === y)) {
      setBallSpot([Number(x), Number(y)]);
      addBall(x, y);
    }
  };
  const deleteBall = () => {
    updateBoard(ballSpot[0], ballSpot[1], "0");
    console.log("Deleted ball in spot " + ballSpot[0] + ballSpot[1]);
  };
  const addBall = (x, y) => {
    updateBoard(Number(x), Number(y), "1");
    console.log("Placed ball in spot " + Number(x) + Number(y));
  };
  const updateYSpot = (x, y) => {
    if (bounceBoard[x][y] === "0") {
      updateBoard(x, y, "Y");
    } else if (bounceBoard[x][y] === "Y") {
      updateBoard(x, y, "0");
    }
  };
  // GOL Logic:
  const updateGOLBoard = (x, y) => {
    let copy = [...GOLBoard];
    if (copy[x][y] === "1") {
      copy[x][y] = "0";
    } else if (copy[x][y] !== "1") {
      copy[x][y] = "1";
    }
    setGOLBoard(copy);
  };
  const pushNewBoard = (newboard) => {
    console.log("got new board from child");
    setGOLBoard(newboard);
  };
  //Switching game logic:
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
  //Use effect to force rerenders
  useEffect(() => {}, [currentGame, bounceBoard, GOLBoard]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          {" "}
          {currentGame === "Bounce" && (
            <>
              <Button
                bsPrefix="myButtonMenu"
                onClick={() => {
                  switchGame();
                }}
              >
                Go To Game of Life
              </Button>
              <Button
                bsPrefix="myButtonMenu"
                onClick={() => {
                  setBounceBoard(initBoard);
                }}
              >
                Default Bounce Board
              </Button>
            </>
          )}
          {currentGame === "GOL" && (
            <>
              <Button
                bsPrefix="myButtonMenu"
                onClick={() => {
                  switchGame();
                }}
              >
                Go To Bounce
              </Button>
              <Button
                bsPrefix="myButtonMenu"
                onClick={() => {
                  setGOLBoard(initGOLboard);
                }}
              >
                Default GOL Board
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="columnsWrapper">
        {currentGame === "Bounce" && (
          <>
            <body className="App-game">
              <Board
                updateBallSpot={updateBallSpot}
                updateYSpot={updateYSpot}
                currentBoard={bounceBoard}
              ></Board>
            </body>
            <body className="App-controls">
              <Controls updateBoard={updateBoard} inputBoard={bounceBoard} ballSpot={ballSpot}></Controls>
            </body>
          </>
        )}
        {currentGame === "GOL" && (
          <>
            <body className="App-game">
              <BoardGOL currentBoard={GOLBoard} updateGOLBoard={updateGOLBoard}></BoardGOL>
            </body>
            <body className="App-controls">
              <GOLControls currentBoard={GOLBoard} pushNewBoard={pushNewBoard}></GOLControls>
            </body>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
