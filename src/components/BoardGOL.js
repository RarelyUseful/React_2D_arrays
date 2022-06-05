import Button from "react-bootstrap/Button";

export default function BoardGOL(props) {
  function handleClick(row, column) {
    //this only switches between Y and 0, no need to send data
    props.updateGOLBoard(Number(row), Number(column));
    /* I thought about it, and it would be better to send data.
      It's already there, because button is rendered according to it...
      so i don't need to check current state and change it - i can just change it. 
      it's 1 minute job, but i'll keep it for now. 
     */
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
