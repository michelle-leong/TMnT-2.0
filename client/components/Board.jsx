import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import { useParams, useNavigate } from 'react-router-dom';
// components
import Column from './Column.jsx';
import { ColumnModal } from './Modals.jsx';

// const a = [
//   {
//     board: {
//       columns: [
//         {
//           cards: [
//             {
//               card_id: 4,
//               card_task: 'its a task',
//             },
//           ],
//           column_id: 2,
//           column_name: 'testing columns',
//         },
//         {
//           cards: [
//             {
//               card_id: 1,
//               card_task: 'task updated again and again',
//             },
//             {
//               card_id: 5,
//               card_task: 'its a task',
//             },
//             {
//               card_id: 6,
//               card_task: 'its a task',
//             },
//           ],
//           column_id: 3,
//           column_name: 'another testing column',
//         },
//       ],
//       board_id: 2,
//       board_name: 'test board',
//     },
//   },
// ];

/*
 *
 * @param {props = {board : array[0].board = board object}} param0
 * @returns
 */
const Board = () => {
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [columns, setColumns] = useState([]);
  const [counter, setCounter] = useState(1);
  const [boardName, setBoardName] = useState('');
  const [edit, setEdit] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/boards/${id}`).then((response) => {
      const currentBoard = response.data[0];
      if (!currentBoard) {
        setColumns([]);
      } else {
        setColumns(currentBoard.board.columns);
      }

      setBoardName(currentBoard.board.board_name);
    });
  }, []);

  const handleDelete = () => {
    console.log('axios deleted Board');
    axios.delete(`/api/boards/delete`, {
      data: {
        id: id,
      },
    });
    navigate('/');
  };

  // render array of column objects prop drilling column info
  const renderColumns = columns.map((columnObj) => (
    <Column
      key={columnObj.column_id}
      column={columnObj}
      setColumns={setColumns}
      setCounter={setCounter}
      counter={counter}
    />
  ));

  //logic to update state after moving a card
  const onDragEnd = (result) => {
    //every drag and drop event has a source object and destination object
    const { source, destination } = result;
    //if there is no destination object, return
    if (!destination) return;
    //if destination and source are same, return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let beginning;
    let landing;
    let beginningIndex;
    let landingIndex;

    //find the source and destination columns in state
    columns.forEach((ele, index) => {
      if (ele.column_id.toString() === source.droppableId) {
        beginning = ele;
        beginningIndex = index;
      }
      if (ele.column_id.toString() === destination.droppableId) {
        landingIndex = index;
        landing = ele;
      }
    });

    //create a copy of the card
    const cardCopy = { ...beginning.cards[source.index] };

    setColumns((prevState) => {
      //copy previous state
      const copyState = [...prevState];

      //remove card from old column
      copyState[beginningIndex].cards.splice(source.index, 1);

      //add card to new column
      copyState[landingIndex].cards.splice(destination.index, 0, cardCopy);
      return copyState;
    });

    const columnId = landing.column_id;

    //update card column in database
    axios.patch(`/api/cards/moveCard`, {
      id: cardCopy.card_id,
      columnId: columnId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className='board'>
          <div id='board-name'>
            {edit ? (
              <div>
                <input
                  type='text'
                  value={boardName}
                  onChange={(e) => setBoardName(e.target.value)}
                />
                <button>Save</button>
                <button onClick={() => setEdit(false)}>Cancel</button>
              </div>
            ) : (
              <div>
                <span>{boardName}</span>
                <button onClick={() => setEdit(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
          <div id='column-container'>
            {renderColumns}
            <button id='add-column' onClick={() => setShowColumnModal(true)}>
              Add Column
            </button>
          </div>
        </div>
        <div className='modal-box'>
          {showColumnModal && (
            <ColumnModal
              setShowColumnModal={setShowColumnModal}
              setColumns={setColumns}
              boardId={id}
            />
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;

// board should get all cols
// cols should get all its cards
// cards fill out with all their data

// delete board -> delete all columns (single query)
// delete column ->  delete all associated cards  (single query)
