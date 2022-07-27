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

  const updateBoard = async (boardId, updatedData) => {
    const newBoardsData = boardsData.map((board) => {
      if (board.id === boardId) {
        return { ...board, board_items: updatedData };
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

  const deleteBoard = async (boardId) => {
    const newBoardsData = userData.boards.filter((board) => board.id !== boardId);
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

  const createBoard = async (newBoard) => {
    let updatedBoard;

    if (boardsData !== null) {
      updatedBoard = [...boardsData, newBoard];
    } else {
      updatedBoard = [newBoard];
    }

    const newStatsData = getStatsData(updatedBoard);

    try {
      await update(ref(db, 'users/' + currentUser.uid), { boards: updatedBoard });
      setBoardsData(updatedBoard);
      setStatsData(newStatsData);
    } catch (error) {
      const errorMessage = getError(error.code);
      console.log(errorMessage);
    }
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
