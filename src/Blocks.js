import React from "react";

function Blocks(data) {
  if (data === "X") {
    return {
      id: "X",
      isBall: false,
      isBounceable: true,
      isBreakable: false,
      isRandomizing: false,
      isCorner: false,
      isStartingPos: false,
      isEditable: true,
    };
  } else if (data === "0") {
    return {
      id: "0",
      isBall: false,
      isBounceable: false,
      isBreakable: false,
      isRandomizing: false,
      isCorner: false,
      isStartingPos: false,
      isEditable: true,
    };
  } else if (data === "Y") {
    return {
      id: "Y",
      isBall: false,
      isBounceable: false,
      isBreakable: false,
      isRandomizing: true,
      isCorner: false,
      isStartingPos: false,
      isEditable: true,
    };
  } else if (data === "B") {
    return {
      id: "B",
      isBall: false,
      isBounceable: true,
      isBreakable: true,
      isRandomizing: false,
      isCorner: false,
      isStartingPos: false,
      isEditable: true,
    };
  }
}

// return <button onClick={props.click}>{props.name}</button>;

// class Spot {
//   constructor(
//     row,
//     column,
//     isBall = false,
//     isBounceable = false,
//     isBreakable = false,
//     isRandomizing = false,
//     isCorner = false,
//     isStartingPos = false,
//     backimg = "",
//     isEditable = true
//   ) {
//     this.row = row;
//     this.column = column;
//     this.isBall = isBall;
//     this.isBounceable = isBounceable;
//     this.isBreakable = isBreakable;
//     this.isRandomizing = isRandomizing;
//     this.isCorner = isCorner;
//     this.isStartingPos = isStartingPos;
//     this.backimg = backimg;
//     this.isEditable = isEditable;
//   }
// }

export default Blocks;
