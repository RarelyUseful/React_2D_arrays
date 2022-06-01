import { useEffect, useState } from "react";

function GOLControls(props) {
  const { currentBoard, pushNewBoard } = props;
  const [isStopped, setisStopped] = useState(true);
  const nextGen = () => {
    let copy = currentBoard.map((e) => e.slice());
    // [...currentBoard] makes reference, not copy :(
    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        let cellsAround = [
          Number(currentBoard[i - 1]?.[j - 1]),
          Number(currentBoard[i - 1]?.[j - 0]),
          Number(currentBoard[i - 1]?.[j + 1]),
          Number(currentBoard[i - 0]?.[j - 1]),
          Number(currentBoard[i - 0]?.[j + 1]),
          Number(currentBoard[i + 1]?.[j - 1]),
          Number(currentBoard[i + 1]?.[j - 0]),
          Number(currentBoard[i + 1]?.[j + 1]),
        ];
        // count how many cells are alive (because in my array alive = "1", dead = "0")
        let aliveAround = cellsAround.reduce((s, v) => {
          return s + (v || 0);
        }, 0);

        if (currentBoard[i][j] === "0" && aliveAround === 3) {
          copy[i][j] = "1";
          //console.log("cell ressurects");
        } else if (currentBoard[i][j] === "1" && (aliveAround < 2 || aliveAround > 3)) {
          copy[i][j] = "0";
          //console.log("Cell dies");
        }
      }
    }
    //console.log("current:");
    //console.table(currentBoard);
    //console.log("pushed:");
    //    console.table(copy);
    //console.log(currentBoard);

    return pushNewBoard(copy);
  };
  const delayTick = () =>
    setTimeout(() => {
      nextGen();
      autoTick();
    }, 1000);

  const autoTick = () => {
    if (isStopped == true) {
      // clearInterval(delayTick);
      console.log("game should be stopped");
      return;
    } else if (isStopped == false) {
      console.log("autoplay still on");
      nextGen();
      autoTick();
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isStopped) {
        nextGen();
      }
      if (isStopped) {
        clearTimeout(timer);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentBoard, isStopped]);
  //useEffect(() => {}, [currentBoard, isStopped]);

  return (
    <div>
      {/* <button onClick={() => (ballInstance = setBall(props.inputBoard, props.ballSpot))}>Add ball</button>
          <button onClick={() => userGame()}>NewGame+Start</button> */}
      <p>
        <button onClick={() => nextGen()}>Tick</button>
      </p>
      <p>
        <button
          onClick={() => {
            setisStopped(false);
            //autoTick();
          }}
        >
          Start Auto Tick
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            setisStopped(true);
            //autoTick();
          }}
        >
          Stop Auto Tick
        </button>
      </p>
    </div>
  );
}

export default GOLControls;
