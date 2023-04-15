import React from 'react';

const BoardPage = () => {
  const [currBoardID, setCurrBoardID] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, setUser } = useContext(UserContext);

  return (
    <BoardContext.Provider value={{ currBoardID, setCurrBoardID }}>
      <div className={`homeCont ${isDarkMode ? 'dark-mode' : ''}`}>
        {/* <ErrorBoundary> */}
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        {/* </ErrorBoundary> */}
        <div className={`boardDisplay ${isDarkMode ? 'dark-mode' : ''}`}>
          <Board />
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default BoardPage;
