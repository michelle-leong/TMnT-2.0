import React, { Component } from "react";
import { useState, useEffect, useContext } from "react";
import { ColumnModal, CardModal } from "../components/Modals.jsx";
import Board from "../components/Board.jsx";
import Navbar from "../components/Navbar.jsx";
import ErrorBoundary from "../components/ErrorBoundary.jsx";
import BoardContext from "./BoardContext.js";
import UserContext from "../UserContext.jsx";

/**
 * we want this to have a navbar holding multiple board buttons
 *  board buttons should get by board _id
 *
 * board component should
 */

function HomePage() {
  // state to render a column creation modal
  const [showColumnModal, setShowColumnModal] = useState(false);
  // state to render a card creation modal
  const [showCardModal, setShowCardModal] = useState(false);
  // const [columnsState, setColumns] = useState(null);
  const [ boardData, setBoardData ] = useState([]);
  // temp setting as board 2 for testing
  const [ currBoardID, setCurrBoardID] = useState(6);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let renderColumns = [];

  // useEffect(() => {
  //   // TODO we have user id at this endpoint
  //     // should be a get method using user id (cookies)
  //     // load first board in board array?
  //   fetch('/api', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({username: user})
  //   }).then((res) => res.json())
  //   .then((data) => {
  //     setBoardData(data);
  //     setCurrBoardID(data[0]._id)
  //   })
  //   .catch((error) => {
  //     console.log('Error fetching boardData in APP.jsx:', error)
  //   })
  // },[isLoggedIn])

  console.log("user", user);
  console.log("BOARD DATA", boardData);

  if (boardData.length !== 0) {
    renderColumns = boardData[0].columns.map((column, index) => {
      return (
        <Column
          key={index}
          columnName={column.columnName}
          cards={column.cards}
          setShowCardModal={setShowCardModal}
        />
      );
    });
  }
  let overlay = null;

  if (showColumnModal || showCardModal)
    overlay = <div className="overlay"></div>;
  else overlay = null;

  return (
    <div className={`homeCont ${isDarkMode ? "dark-mode" : ""}`}>
      <ErrorBoundary>
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} currBoardID={currBoardID} setCurrBoardID={setCurrBoardID} />
      </ErrorBoundary>

      <div className={`boardDisplay ${isDarkMode ? "dark-mode" : ""}`}>
        <div className="modal-box">
          {/* when showModal is set to true a column modal will render */}
          {/* having issues with page re-rendering when state is updated. modal does not stay up */}
          {/* {showColumnModal && <ColumnModal showColumnModal={showColumnModal} setShowColumnModal={setShowColumnModal} />} */}
          {showColumnModal ? (
            <ColumnModal
              showColumnModal={showColumnModal}
              setShowColumnModal={setShowColumnModal}
              showCardModal={showCardModal}
              setShowCardModal={setShowCardModal}
              boardData={boardData}
              currBoardID={currBoardID}
              setBoardData={setBoardData} />) 
              : (<></>)
            }
            {showCardModal ? (<CardModal 
              showCardModal={showCardModal} 
              setShowCardModal={setShowCardModal} />) 
              : (<></>)
            }
          </div>
          <Board currBoardID={currBoardID} />
        </div>
      </div>
  );
}

export default HomePage;

// navbar
// user id from cookie
// axios getAllBoardsByUserID => []
// buttons display name of board
// button gets by board by id

// homepage displays the board from the navbar onclick = board_id
// axios get request by board_id => boardObj{}
