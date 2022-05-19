import { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Board(props) {
  return (
    <table cellPadding={"0px"} cellSpacing={"0px"}>
      {props.currentBoard.map((rows, indexR) => {
        return (
          <tbody>
            <tr height={"15px"}>
              {rows.map((spot, indexC) => {
                return (
                  <td width={"15px"}>
                    {(() => {
                      if (spot === "1") {
                        return (
                          <Button id={indexR + " " + indexC} bsPrefix="myButton1">
                            {" . "}
                          </Button>
                        );
                      } else if (spot === "Y") {
                        return (
                          <Button id={indexR + " " + indexC} bsPrefix="myButtonY">
                            {" . "}
                          </Button>
                        );
                      } else if (spot === "X") {
                        return (
                          <Button id={indexR + " " + indexC} bsPrefix="myButtonX">
                            {" . "}
                          </Button>
                        );
                      } else {
                        return (
                          <Button id={indexR + " " + indexC} bsPrefix="myButton0">
                            {" . "}
                          </Button>
                        );
                      }
                    })()}
                  </td>
                );
              })}
            </tr>
          </tbody>
        );
      })}
    </table>
  );
}
