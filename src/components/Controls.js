/* X and Y axis switched, X are rows, Y are columns;
Upper left corner is [0][0];
so vector[2][3] moves ball 2 down and 3 right
vector [-2][1] moves ball 2 up and 1 right */
import Button from "react-bootstrap/Button";

/**This was written in pure JS and then pasted into this project.
 * If you write something in React.js please don't copy anything from this component.
 * I'm just too lazy to write it from scratch. Don't judge me.
 */
function Controls(props) {
  class Vector {
    constructor(x = 1, y = 1) {
      this.x = x;
      this.y = y;
    }
  }

  class Ball {
    constructor(x, y, vector, gameboard, randomize = false) {
      this.x = x;
      this.y = y;
      this.gameboard = gameboard;
      this.vector = vector;
      this.randomize = randomize;
    }
    randomInt(min, max) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    isStartingPosAllowed() {
      let isUpWall = this.gameboard[this.x - 1][this.y] === "X";
      let isDownWall = this.gameboard[this.x + 1][this.y] === "X";
      let isLeftWall = this.gameboard[this.x][this.y - 1] === "X";
      let isRightWall = this.gameboard[this.x][this.y + 1] === "X";
      if ((isLeftWall || isRightWall) && (isUpWall || isDownWall)) {
        props.updateBoard(this.x, this.y, "1"); //Place ball on board
        //console.table(this.gameboard);
        // FORCE NEW VECTOR:
        if (isUpWall && isLeftWall) {
          this.vector.x = 1;
          this.vector.y = 1;
        } else if (isUpWall && isRightWall) {
          this.vector.x = 1;
          this.vector.y = -1;
        } else if (isDownWall && isLeftWall) {
          this.vector.x = -1;
          this.vector.y = 1;
        } else if (isDownWall && isRightWall) {
          this.vector.x = -1;
          this.vector.y = -1;
        }
        return true;
      } else {
        alert("Ball must be placed in corner.");
        return false;
      }
    }
    updateVector() {
      //if we stepped on Y:
      if (this.randomize) {
        let rng = this.randomInt(1, 3);

        if (rng === 1) {
          //console.log("no switching");
        } else if (rng === 2) {
          //console.log("switched y");
          this.vector.y = -this.vector.y;
        } else if (rng === 3) {
          //console.log("switched x");
          this.vector.x = -this.vector.x;
        }
        this.randomize = false;
      }

      //check if there is left/right wall
      if (this.gameboard[this.x][this.y + this.vector.y] === "X") {
        let isLeftWall = this.gameboard[this.x][this.y - 1] === "X";
        let isRightWall = this.gameboard[this.x][this.y + 1] === "X";
        if (isLeftWall) {
          this.vector.y = 1;
        } else if (isRightWall) {
          this.vector.y = -1;
        }
      }
      //check if there is up/down wall
      if (this.gameboard[this.x + this.vector.x][this.y] === "X") {
        let isUpWall = this.gameboard[this.x - 1][this.y] === "X";
        let isDownWall = this.gameboard[this.x + 1][this.y] === "X";
        if (isUpWall) {
          this.vector.x = 1;
        } else if (isDownWall) {
          this.vector.x = -1;
        }
      }
      //check if incoming spot is Y:
      if (this.gameboard[this.x + this.vector.x][this.y + this.vector.y] === "Y") {
        //console.log("next is Y");
        this.randomize = true;
      }
      // Bounce off corner only if there are no walls on X and Y axis
      else if (this.gameboard[this.x + this.vector.x][this.y + this.vector.y] === "X") {
        this.vector.x = -this.vector.x;
        this.vector.y = -this.vector.y;
      }
    }
    move() {
      //   this.gameboard[this.x][this.y] = "0";
      props.updateBoard(this.x, this.y, "0");
      this.x += this.vector.x;
      this.y += this.vector.y;
      //   this.gameboard[this.x][this.y] = "1";
      props.updateBoard(this.x, this.y, "1");

      //console.table(this.gameboard);
    }
  }

  class Game {
    constructor(ball) {
      this.board = ball.gameboard;
      this.ball = ball;

      this.startingX = ball.x;
      this.startingY = ball.y;
    }
    start() {
      this.ball.updateVector();
      let delay100 = setInterval(() => {
        this.ball.move();
        this.ball.updateVector();
        if (this.isBallBackOnStart()) {
          clearTimeout(delay100);
        }
        //console.table(this.ball.gameboard); //this prints tables with every move, kind of GIF
      }, 100);
    }
    isBallBackOnStart() {
      if (this.ball.x === this.startingX && this.ball.y === this.startingY) {
        return true;
      } else return false;
    }
  }

  function generateBall(someboard, arr) {
    //utwórz piłkę z vectorem na podstawie boardu
    let x = arr[0];
    let y = arr[1];
    let newBall = new Ball(x, y, new Vector(), someboard);
    if (newBall.isStartingPosAllowed()) {
      props.updateBoard(x, y, "1");
      //console.log("Ball generated Controls.js.");
      return newBall;
    }
  }

  return (
    <div>
      {/* <button onClick={() => (ballInstance = setBall(props.inputBoard, props.ballSpot))}>Add ball</button>
      <button onClick={() => userGame()}>NewGame+Start</button> */}
      <div>
        <p>Controls:</p>
        <Button
          bsPrefix="myButtonMenu"
          onClick={() => new Game(generateBall(props.inputBoard, props.ballSpot)).start()}
        >
          Start!
        </Button>
      </div>
      <p>Hints:</p>
      <div>- Ball must be placed in corner</div>
      <div>- Ball stops when returns to starting position</div>

      <div>- Left Click to move ball </div>
      <div>- Right Click to place/remove Randomizer</div>
    </div>
  );
}

export default Controls;
