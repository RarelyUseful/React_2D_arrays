import React, { useState, useEffect } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import Controls from "./components/Controls";
import GOLControls from "./components/GOLControls";
import Board from "./components/Board";
import BoardGOL from "./components/BoardGOL";
import { board, initBoard, GOLboard, initGOLboard } from "./components/input_board";
import Footer from "./components/Footer";

function App() {
  const [currentGame, setCurrentGame] = useState("GOL");
  const [bounceBoard, setBounceBoard] = useState(board);
  const [ballSpot, setBallSpot] = useState([1, 8]);
  const [GOLBoard, setGOLBoard] = useState(GOLboard);
  //Bounce Logic:
  const updateBoard = (x, y, data) => {
    let copy = [...bounceBoard];
    copy[x][y] = data;
    setBounceBoard(copy);
  };
  const updateBallSpot = (x, y) => {
    // console.log("clicked spot x/y: " + x +"/"+ y);
    if (!(ballSpot[0] === x && ballSpot[1] === y)) {
      deleteBall();
      setBallSpot([Number(x), Number(y)]);
      addBall(x, y);
      /**TODO: FEATURE, Left click will open small pop-up where you can select type of tile you wany to put. */
    }
  };
  const deleteBall = () => {
    updateBoard(ballSpot[0], ballSpot[1], "0");
    //console.log("Deleted ball in spot " + ballSpot[0] + ballSpot[1]);
  };
  const addBall = (x, y) => {
    updateBoard(Number(x), Number(y), "1");
    //console.log("Placed ball in spot " + Number(x) + Number(y));
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
    /**TODO: BUGFIX?
     *o mobile rapid user inputs skips some of the clicks. */
  };
  const pushNewBoard = (newboard) => {
    //console.log("got new board from child");
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
                bsPrefix="myButtonHead"
                onClick={() => {
                  switchGame();
                }}
              >
                Go To Game of Life
              </Button>
              <Button
                bsPrefix="myButtonHead"
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
                bsPrefix="myButtonHead"
                onClick={() => {
                  switchGame();
                }}
              >
                Go To Bounce
              </Button>
              <Button
                bsPrefix="myButtonHead"
                onClick={() => {
                  setGOLBoard(initGOLboard);
                }}
              >
                Default Board
              </Button>
            </>
          )}
        </div>
      </header>

      <div className="columnsWrapper">
        {currentGame === "Bounce" && (
          <>
            <div className="App-game">
              <Board
                updateBallSpot={updateBallSpot}
                updateYSpot={updateYSpot}
                currentBoard={bounceBoard}
              ></Board>
            </div>
            <div className="App-controls">
              <Controls updateBoard={updateBoard} inputBoard={bounceBoard} ballSpot={ballSpot}></Controls>
            </div>
          </>
        )}
        {currentGame === "GOL" && (
          <>
            <div className="App-game">
              <BoardGOL currentBoard={GOLBoard} updateGOLBoard={updateGOLBoard}></BoardGOL>
            </div>
            <div className="App-controls">
              <GOLControls currentBoard={GOLBoard} pushNewBoard={pushNewBoard}></GOLControls>
            </div>
          </>
        )}
      </div>
      <div></div>
      <Footer></Footer>
    </div>
  );
}

export default App;
