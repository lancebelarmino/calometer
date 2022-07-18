import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { getTotalCalories } from '../utils/getCalories';
import getFormattedDate from '../utils/getFormattedDate';
import toSort from '../utils/toSort';

const BoardContext = React.createContext({
  sortBoardItem: (sortType) => {},
  addBoardItem: (newItem) => {},
  updateBoardItem: (updatedItem) => {},
  deleteBoardItem: (itemToDelete) => {},
});

export const BoardContextProvider = ({ children, boardData, onUpdateBoard, onDeleteBoard, defaultSort }) => {
  const isEmptyBoard = boardData?.board_items === undefined;

  const [isEdit, setIsEdit] = useState(false);
  const [sortBy, setSortBy] = useState(defaultSort);
  const [sortedData, setSortedData] = useState({
    total: isEmptyBoard ? 0 : getTotalCalories(boardData.board_items),
    list: isEmptyBoard ? [] : toSort(boardData.board_items, defaultSort),
    date: getFormattedDate(boardData.date),
  });
  const [boardItem, setBoardItem] = useState(null);

  const sortBoardItem = (sortType) => {
    const sortedList = toSort(sortedData.list, sortType);
    const totalCal = getTotalCalories(sortedData.list);

    setSortBy(sortType);
    setSortedData((prevData) => ({ ...prevData, total: totalCal, list: sortedList }));
  };

  const addBoardItem = (newItem) => {
    const currentDate = dayjs().format();
    const newId = uuidv4();

    const newItemObj = { id: newId, ...newItem, date: currentDate };
    const updatedList = [...sortedData.list, newItemObj];
    const sortedList = toSort(updatedList, sortBy);
    const totalCal = getTotalCalories(sortedList);

    setSortedData((prevData) => ({ ...prevData, total: totalCal, list: sortedList }));
    onUpdateBoard(boardData.id, updatedList);
  };

  const updateBoardItem = async (updatedItem) => {
    const updatedList = sortedData.list.map((item) => {
      if (item.id === updatedItem.id) {
        return { ...updatedItem };
      }
      return item;
    });
    const sortedList = toSort(updatedList, sortBy);
    const totalCal = getTotalCalories(sortedList);

    setSortedData((prevData) => ({ ...prevData, total: totalCal, list: sortedList }));
    onUpdateBoard(boardData.id, updatedList);
  };

  const deleteBoardItem = (itemToDelete) => {
    const updatedList = sortedData.list.filter((item) => item.id !== itemToDelete.id);
    const totalCal = getTotalCalories(updatedList);

    setSortedData((prevData) => ({ ...prevData, total: totalCal, list: updatedList }));
    onUpdateBoard(boardData.id, updatedList);
  };

  const deleteBoard = () => {
    onDeleteBoard(boardData.id);
  };

  return (
    <BoardContext.Provider
      value={{
        isEdit,
        setIsEdit,
        sortBy,
        sortedData,
        boardItem,
        setBoardItem,
        sortBoardItem,
        addBoardItem,
        updateBoardItem,
        deleteBoardItem,
        deleteBoard,
      }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
