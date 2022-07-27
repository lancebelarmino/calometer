import React, { useState, useRef, useEffect, useContext, useCallback } from 'react';
import { Group, Text, Title, Select, ScrollArea, UnstyledButton } from '@mantine/core';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import BoardContext from '../../context/BoardContext';
import useScrollPosition from '../../hooks/useScrollPosition';
import Card from '../Pages/Card';
import TrackerEditorModal from '../../components/Tracker/TrackerEditorModal';
import TrackerBoardItem from './TrackerBoardItem';
import TrackerEditor from './TrackerEditor';
import { ReactComponent as Delete } from '../../assets/svg/tracker-board-delete.svg';
import { ReactComponent as Sort } from '../../assets/svg/tracker-sort.svg';
import { ReactComponent as Empty } from '../../assets/svg/tracker-empty.svg';
import { revealVariant, editorVariant, deleteButtonVariant } from '../../utils/framer-variants';
import useStyles from './TrackerBoard.styles';

const TrackerBoard = ({ boardCardControls, sortAllBy, isSettingsUpdated, setIsSettingsUpdated }) => {
  const scrollRef = useRef();
  const selectRef = useRef();
  const [isAdd, setIsAdd] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const { sortBy, sortBoardItem, addBoardItem, sortedData, deleteBoard } = useContext(BoardContext);
  const { viewport, isPosition, calculateScrollData, debouncedScrollPositionChangeHandler } = useScrollPosition();
  const boardItemsControls = useAnimation();
  const { classes, cx } = useStyles();

  const isBoardListEmpty = sortedData.list.length === 0;

  const sortItemsHandler = (type) => {
    if (type !== sortBy) {
      sortBoardItem(type);
      animateItems();
    }

    setTimeout(() => selectRef.current.blur(), 1);
  };

  const addItemHandler = (newItem) => {
    addBoardItem(newItem);
    calculateScrollData('add');
    setIsAdd(false);
  };

  const deleteBoardHandler = () => {
    deleteBoard();
  };

  const animateItems = useCallback(() => {
    boardItemsControls.set({ opacity: 0 });
    boardItemsControls.start({
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    });
  }, [boardItemsControls]);

  const boardItems = sortedData.list.map((item) => (
    <TrackerBoardItem
      key={item.id}
      className={classes.boardItem}
      data={item}
      calculateScrollData={calculateScrollData}
    />
  ));

  // Update all boards on settings update
  useEffect(() => {
    if (isSettingsUpdated) {
      sortBoardItem(sortAllBy);
      animateItems();
      setIsSettingsUpdated(false);
    }
  }, [isSettingsUpdated, setIsSettingsUpdated, animateItems, sortAllBy, sortBoardItem]);

  // Remove horizontal scroll
  useEffect(() => {
    if (scrollRef.current.children[2]) {
      scrollRef.current.children[2].style.display = 'none';
    }
  });

  return (
    <>
      <TrackerEditorModal />

      <Card
        className={classes.card}
        onMouseEnter={() => setIsHoveringDelete(true)}
        onMouseLeave={() => setIsHoveringDelete(false)}
        animate={boardCardControls}
        layout
        data-testid="tracker-board">
        <AnimatePresence>
          {isHoveringDelete && (
            <UnstyledButton
              className={classes.deleteBtn}
              component={motion.button}
              variants={deleteButtonVariant}
              onClick={deleteBoardHandler}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid="board-delete">
              <Delete />
            </UnstyledButton>
          )}
        </AnimatePresence>

        <Group className={classes.header} position="apart" align="flex-end" component={motion.div} layout>
          <div>
            <Text className={classes.headerDate} size="md">
              {sortedData.date.dayMonth}
            </Text>
            <Title order={4}>{sortedData.date.dayWeek}</Title>
          </div>

          <Select
            ref={selectRef}
            classNames={{
              rightSection: classes.sortRightSection,
            }}
            className={classes.sort}
            placeholder="Sort By"
            data={[
              { value: 'time', label: 'Time' },
              { value: 'recent', label: 'Recent' },
              { value: 'highest', label: 'Highest' },
              { value: 'lowest', label: 'Lowest' },
            ]}
            icon={<Sort />}
            value={sortBy}
            onChange={sortItemsHandler}
          />
        </Group>

        <ScrollArea
          ref={scrollRef}
          viewportRef={viewport}
          className={classes.list}
          classNames={{
            scrollbar: classes.scrollbar,
            corner: classes.scrollCorner,
            thumb: classes.scrollThumb,
          }}
          type="auto"
          onScrollPositionChange={debouncedScrollPositionChangeHandler}
          component={motion.div}
          layout>
          <AnimatePresence>
            {!isPosition.top && (
              <motion.span
                key="revealTop"
                className={cx(classes.reveal, classes.revealTop)}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={revealVariant}
              />
            )}

            {isBoardListEmpty && (
              <motion.div
                className={classes.notif}
                variants={revealVariant}
                initial={false}
                animate={{ opacity: [0, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}>
                <Empty className={classes.notifIcon} />
                <Text size="md">Your board is empty...</Text>
              </motion.div>
            )}

            <motion.div key="board-items" animate={boardItemsControls} variants={revealVariant} layout="position">
              {boardItems}
            </motion.div>

            {!isPosition.bottom && (
              <motion.span
                key="revealBottom"
                className={cx(classes.reveal, classes.revealBottom)}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={revealVariant}
              />
            )}
          </AnimatePresence>
        </ScrollArea>

        <AnimatePresence>
          {isAdd && (
            <TrackerEditor
              className={classes.editor}
              btnText={{ confirm: 'Add' }}
              formType="add"
              onSubmit={addItemHandler}
              variants={editorVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout="position"
            />
          )}
        </AnimatePresence>

        <Group className={classes.footer} position="apart" align="flex-end" component={motion.div} layout="position">
          <UnstyledButton onClick={() => setIsAdd((prevData) => !prevData)} data-testid="board-add">
            <svg
              className={classes.footerAdd}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle r="19.2" transform="matrix(-1 0 0 1 20 20)" stroke="#F0F0F0" strokeWidth="1.6" />
              <AnimatePresence>
                {!isAdd && (
                  <motion.path
                    d="M19 13C19 12.4477 19.4477 12 20 12C20.5523 12 21 12.4477 21 13V27C21 27.5523 20.5523 28 20 28C19.4477 28 19 27.5523 19 27V13Z"
                    fill="#939295"
                    initial={false}
                    animate={{ rotate: [-90, 0] }}
                    exit={{ rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <path
                d="M27 19C27.5523 19 28 19.4477 28 20C28 20.5523 27.5523 21 27 21L13 21C12.4477 21 12 20.5523 12 20C12 19.4477 12.4477 19 13 19L27 19Z"
                fill="#939295"
              />
            </svg>
          </UnstyledButton>

          <div>
            <Title className={classes.footerTitle} order={4}>
              {sortedData.total}
            </Title>
            <Text>Total Calories</Text>
          </div>
        </Group>
      </Card>
    </>
  );
};

export default TrackerBoard;
