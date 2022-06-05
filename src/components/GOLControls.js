import Button from "react-bootstrap/Button";
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
    return pushNewBoard(copy);

    /**TODO: OPTIMIZATION
     *This function is extra slow, because it has to :
        make deep copy of array, 
        count every cell around it,
        switch(or not) cell in new array.
        set state with new array

    BUT it's working fine, didn't notice any wierd behavior even on low spec pc/mobile. 
     */
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isStopped) {
        nextGen();
      }
      if (isStopped) {
        clearTimeout(timer);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [nextGen, isStopped]);

  return (
    <div>
      <p>Controls:</p>
      <div>
        <Button bsPrefix="myButtonMenu" onClick={() => nextGen()}>
          Tick
        </Button>
      </div>
      <div>
        <Button
          bsPrefix="myButtonMenu"
          onClick={() => {
            setisStopped(false);
          }}
        >
          Start Auto Tick
        </Button>
      </div>
      <div>
        <Button
          bsPrefix="myButtonMenu"
          onClick={() => {
            setisStopped(true);
          }}
        >
          Stop Auto Tick
        </Button>
      </div>
      <p>Hints:</p>
      <div>- Left Click to place/remove living cell </div>
      <div>- Autoplay Ticks every 500 ms </div>
    </div>
  );
}

export default GOLControls;
