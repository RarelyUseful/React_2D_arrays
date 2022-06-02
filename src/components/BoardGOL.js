import Button from "react-bootstrap/Button";

export default function BoardGOL(props) {
  function handleClick(row, column) {
    //this only switches between Y and 0
    props.updateGOLBoard(Number(row), Number(column));
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
                            bsPrefix="myButtonY"
                          >
                            {" . "}
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            onClick={() => handleClick(indexR, indexC)}
                            onContextMenu={(event) => event.preventDefault()}
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
