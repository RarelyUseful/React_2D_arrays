import Button from "react-bootstrap/Button";

export default function Board(props) {
  function handleClick(row, column) {
    props.updateBallSpot(Number(row), Number(column));
  }
  function handleRightClick(event, row, column) {
    event.preventDefault();
    props.updateYSpot(Number(row), Number(column));
  }

  return (
    <table cellPadding={"0px"} cellSpacing={"0px"}>
      {props.currentBoard.map((rows, indexR) => {
        return (
          <tbody key={indexR}>
            <tr height={"15px"}>
              {rows.map((spot, indexC) => {
                return (
                  <td key={indexC} width={"15px"}>
                    {(() => {
                      if (spot === "1") {
                        return (
                          <Button
                            onClick={() => handleClick(indexR, indexC)}
                            onContextMenu={(event) => event.preventDefault()}
                            key={indexR + " " + indexC}
                            bsPrefix="myButton1"
                          >
                            {" . "}
                          </Button>
                        );
                      } else if (spot === "Y") {
                        return (
                          <Button
                            onClick={() => handleClick(indexR, indexC)}
                            onContextMenu={(event) => handleRightClick(event, indexR, indexC)}
                            key={indexR + " " + indexC}
                            bsPrefix="myButtonY"
                          >
                            {" . "}
                          </Button>
                        );
                      } else if (spot === "X") {
                        return (
                          <Button
                            onContextMenu={(event) => event.preventDefault()}
                            key={indexR + " " + indexC}
                            bsPrefix="myButtonX"
                          >
                            {" . "}
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            onClick={() => handleClick(indexR, indexC)}
                            onContextMenu={(event) => handleRightClick(event, indexR, indexC)}
                            key={indexR + " " + indexC}
                            bsPrefix="myButton0"
                          >
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
