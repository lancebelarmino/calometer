import { useState, useContext, useEffect } from 'react';
import { ref, update } from 'firebase/database';
import { db } from '../firebase-config';
import useAuth from '../hooks/useAuth';
import AuthContext from '../context/AuthContext';
import getError from '../utils/getError';
import getStatsData from '../utils/getStatsData';

const useBoard = () => {
  const { userData } = useContext(AuthContext);
  const [boardsData, setBoardsData] = useState(null);
  const [statsData, setStatsData] = useState({
    formattedBoardsThisWeek: [0, 0, 0, 0, 0, 0, 0],
    averageCaloriesPerDay: [0, 0, 0, 0, 0, 0, 0],
    totalCaloriesToday: [0, 0, 0, 0, 0, 0, 0],
    highestCalorie: [0, 0, 0, 0, 0, 0, 0],
  });
  const currentUser = useAuth();

  const updateBoard = async (boardId, newData) => {
    const newBoardsData = boardsData.map((board) => {
      if (board.id === boardId) {
        if (board.board_items !== undefined) {
          const itemIndex = board.board_items.findIndex((item) => item.id === newData.id);

          /**
           * Update Item
           */
          if (itemIndex !== -1) {
            const newBoardItems = [...board.board_items];
            newBoardItems[itemIndex] = newData;
            return { ...board, board_items: newBoardItems };
          }
        }

        /**
         * New Item
         */
        return { ...board, board_items: [...(board.board_items ?? []), newData] };
      }
      return board;
    });
    const newStatsData = getStatsData(newBoardsData);

    try {
      await update(ref(db, 'users/' + currentUser.uid), { boards: newBoardsData });
      setBoardsData(newBoardsData);
      setStatsData(newStatsData);
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  const deleteBoard = async (boardId, filteredBoardItems) => {
    const newBoardsData = boardsData.map((board) => {
      if (board.id === boardId) {
        return { ...board, board_items: filteredBoardItems };
      }
      return board;
    });
    const newStatsData = getStatsData(newBoardsData);

    try {
      await update(ref(db, 'users/' + currentUser.uid), { boards: newBoardsData });
      setBoardsData(newBoardsData);
      setStatsData(newStatsData);
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
  };

  const createBoard = (newBoard) => {
    const updatedBoard = [...boardsData, newBoard];
    const newStatsData = getStatsData(updatedBoard);

    /**
     * Note: Does not adding board in database unless user added a item
     */
    setBoardsData(updatedBoard);
    setStatsData(newStatsData);
  };

  useEffect(() => {
    if (userData !== null) {
      const statsData = getStatsData(userData.boards);

      if (userData.boards === undefined) {
        setBoardsData([]);
      } else {
        setBoardsData(userData.boards);
      }

      setStatsData({ ...statsData });
    }
  }, [userData]);

  return { boardsData, statsData, updateBoard, deleteBoard, createBoard };
};

export default useBoard;
