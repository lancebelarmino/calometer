import React, { useState, useContext } from 'react';
import { Title, Text, Group, UnstyledButton } from '@mantine/core';
import { motion } from 'framer-motion';
import BoardContext from '../../context/BoardContext';
import Meal from '../Pages/Meal';
import { ReactComponent as Delete } from '../../assets/svg/tracker-delete.svg';
import useStyles from './TrackerBoardItem.styles';

const TrackerBoardItem = ({ data, className, calculateScrollData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { setIsEdit, setBoardItem, deleteBoardItem } = useContext(BoardContext);
  const { classes, cx } = useStyles();

  const borderColor = data.time.toLowerCase();

  const itemDragEndHandler = (event, info) => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);

    if (info.offset.x < -80) {
      deleteBoardItem(data);
      calculateScrollData('delete');
    }
  };

  const modalClickHandler = () => {
    if (isDragging !== true) {
      setBoardItem({ ...data });
      setIsEdit(true);
    }
  };

  return (
    <UnstyledButton
      className={cx(classes.button, className)}
      onClick={modalClickHandler}
      component={motion.button}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.5}
      dragSnapToOrigin
      onDragStart={() => setIsDragging(true)}
      onDragEnd={itemDragEndHandler}
      layout>
      <Group className={cx(classes.item, classes[borderColor])} position="apart" align="flex-end">
        <div className={classes.details}>
          <Title className={classes.title} order={4}>
            {data.calories} cal
          </Title>
          <Text size="sm" transform="capitalize">
            {data.food}, {data.amount}
          </Text>
        </div>
        <Meal data={data.time} />
      </Group>

      <div className={classes.delete}>
        <Delete />
      </div>
    </UnstyledButton>
  );
};

export default TrackerBoardItem;
