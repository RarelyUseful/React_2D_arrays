// X and Y axis switched, X are rows, Y are columns;
// Upper left corner is [0][0];
// so vector[2][3] moves ball 2 down and 3 right
// vector [-2][1] moves ball 2 up and 1 right

function Controls(props) {
  class Vector {
    constructor(x = 1, y = 1) {
      this.x = x;
      this.y = y;
    }
  }

  class Ball {
    constructor(x, y, vector, gameboard) {
      this.x = x;
      this.y = y;
      this.gameboard = gameboard;
      this.vector = vector;
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
        console.log("Ball can't be here at start.");
        return false;
      }
    }
    updateVector() {
      //now is never Y because we override it as 1;
      let isNowY = this.gameboard[this.x][this.y] === "Y";
      if (isNowY) {
        let rng = this.randomInt(1, 3);
        if (rng === 1) {
        } else if (rng === 2) {
          this.vector.y = -this.vector.y;
        } else if (rng === 3) {
          this.vector.x = -this.vector.x;
        }
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
    constructor(ball, state = 0) {
      this.board = ball.gameboard;
      this.ball = ball;
      this.state = state;
      this.startingX = ball.x;
      this.startingY = ball.y;
    }
    start() {
      this.ball.updateVector();
      this.state = 1;
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
      if (this.ball.x == this.startingX && this.ball.y == this.startingY) {
        this.state = 2;

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
      //props.updateBallSpot(x, y);
      console.log("Ball placed.");
      return newBall;
    } else {
      console.log("You messed up. Ball is not in corner.");
    }
  }

  // const setBall = (board, coords) => {
  //   generateBall(board, coords);
  // };
  // let ballInstance;
  // const userGame = () => {
  //   console.log("New game instanced.");
  //   return new Game(ballInstance).start();
  // };
  //UserGame.start();
  return (
    <div>
      {/* <button onClick={() => (ballInstance = setBall(props.inputBoard, props.ballSpot))}>Add ball</button>
      <button onClick={() => userGame()}>NewGame+Start</button> */}
      <button onClick={() => new Game(generateBall(props.inputBoard, props.ballSpot)).start()}>Start!</button>
    </div>
  );
}

export default Controls;