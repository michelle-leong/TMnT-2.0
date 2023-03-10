import React from "react";

const BoardContext = React.createContext({
  currBoardID: null,
  setCurrBoardID: () => {},
}
);


export default BoardContext;