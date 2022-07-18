import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Group, Title, Button, UnstyledButton, ScrollArea, Menu } from '@mantine/core';
import { motion, AnimatePresence, LayoutGroup, useAnimation } from 'framer-motion';
import { BoardContextProvider } from '../../context/BoardContext';
import { v4 as uuid4 } from 'uuid';
import dayjs from 'dayjs';
import useBoard from '../../hooks/useBoard';
import getCalories from '../../utils/getCalories';
import debounce from '../../utils/debounce';
import Section from '../../components/Pages/Section';
import Card from '../../components/Pages/Card';
import LineChart from '../../components/Chart/LineChart';
import TrackerBoard from '../../components/Tracker/TrackerBoard';
import { ReactComponent as Statistics } from '../../assets/svg/tracker-statistics.svg';
import { ReactComponent as Sort } from '../../assets/svg/tracker-sort.svg';
import { ReactComponent as New } from '../../assets/svg/tracker-new.svg';
import { sectionVariant } from '../../utils/framer-variants';
import useStyles from './Tracker.styles';

const dropdownMenu = ['time', 'recent', 'highest', 'lowest'];

export const Tracker = () => {
  const hasDefaultSettings = localStorage.getItem('board_settings') !== null;

  const scrollRef = useRef();
  const scrollElementRef = useRef();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSettingsUpdated, setIsSettingsUpdated] = useState(false);
  const [sortAllBy, setSortAllBy] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('board_settings'));

    if (hasDefaultSettings) {
      return settings.sortAllBy;
    }

    return null;
  });
  const boardCardControls = useAnimation();
  const { boardsData, statsData, updateBoard, deleteBoard, createBoard } = useBoard();
  const { classes, cx } = useStyles();

  const newBoardHandler = async () => {
    const newBoard = {
      id: uuid4(),
      date: dayjs().format(),
      board_items: [],
    };
    const newBoardItemDate = dayjs(newBoard.date).format('YYYY-MM-DD');

    if (boardsData.length !== 0) {
      const lastBoardItem = [...boardsData].pop();
      const lastBoardItemDate = dayjs(lastBoardItem.date).format('YYYY-MM-DD');

      if (lastBoardItemDate === newBoardItemDate) {
        await scrollToRight('promise');
        showExistingBoard();
        return;
      }
    }

    createBoard(newBoard);
    scrollToRight();
  };

  const sortAllItemsHandler = (value) => {
    setSortAllBy(value);
    setIsSettingsUpdated(true);

    const defaultSettings = { sortAllBy: value };

    if (hasDefaultSettings) {
      const settings = JSON.parse(localStorage.getItem('board_settings'));
      settings.sortAllBy = value;
      localStorage.setItem('board_settings', JSON.stringify(settings));
      return;
    }

    localStorage.setItem('board_settings', JSON.stringify(defaultSettings));
  };

  const showExistingBoard = async () => {
    boardCardControls.start({
      borderColor: ['#F0F0F0', '#6ED47C', '#F0F0F0', '#6ED47C', '#F0F0F0'],
    });
  };

  const scrollToRight = (type, position) => {
    if (type === 'promise') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth });
          resolve();
        }, 500);
      });
    } else if (type === 'onload') {
      setTimeout(
        () => scrollRef.current.scrollTo({ left: position ?? scrollRef.current.scrollWidth, behavior: 'smooth' }),
        200
      );
    }
  };

  const scrollPositionChangeHandler = (position) => {
    localStorage.setItem('board_scroll_position', JSON.stringify({ x: position.x }));
  };

  const debouncedScrollPositionChangeHandler = useMemo(() => debounce(scrollPositionChangeHandler, 200), []);

  const boardsList = boardsData?.map((item, index) => (
    <BoardContextProvider
      key={index}
      boardData={item}
      onUpdateBoard={updateBoard}
      onDeleteBoard={deleteBoard}
      defaultSort={sortAllBy}>
      <TrackerBoard
        sortAllBy={sortAllBy}
        isSettingsUpdated={isSettingsUpdated}
        setIsSettingsUpdated={setIsSettingsUpdated}
        {...(index === boardsData.length - 1 && { boardCardControls: boardCardControls })}
      />
    </BoardContextProvider>
  ));

  const dropdownMenuList = dropdownMenu.map((item, index) => (
    <Menu.Item
      key={index}
      className={cx({ [classes.settingsDropdownItemActive]: sortAllBy === item })}
      onClick={() => sortAllItemsHandler(item)}>
      {item}
    </Menu.Item>
  ));

  useEffect(() => {
    if (scrollElementRef.current) {
      scrollElementRef.current.children[3].style.display = 'none';
    }
  });

  useEffect(() => {
    if (isFirstLoad && boardsData !== null) {
      const position = JSON.parse(localStorage.getItem('board_scroll_position'));

      if (position) {
        scrollToRight('onload', position.x);
      } else {
        scrollToRight();
      }

      setIsFirstLoad(false);
    }
  }, [isFirstLoad, boardsData]);

  return (
    <Section className={classes.section}>
      <LayoutGroup id="tracker">
        <Group className={classes.header} position="apart" component={motion.div} layout="position">
          <Title order={4}>Tracker</Title>
          <Button
            className={cx(classes.statisticsBtn, { [classes.statisticsBtnActive]: isStatsOpen })}
            leftIcon={<Statistics />}
            variant="outline"
            onClick={() => setIsStatsOpen((prevData) => !prevData)}>
            View Statistics
          </Button>
        </Group>

        <AnimatePresence exitBeforeEnter>
          {isStatsOpen && (
            <motion.div
              className={classes.stats}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={sectionVariant}
              layout="position">
              <Card>
                <Group position="apart">
                  <div className={classes.statsChart}>
                    <LineChart
                      data={statsData.averageCaloriesPerDay}
                      title="Average Calories"
                      subtitle="Per Day"
                      callback={getCalories.average}
                      borderColor="#FF743C"
                      backgroundColor={['rgba(255, 116, 60, 0.6)', 'rgba(255, 116, 60, 0.01)']}
                    />
                  </div>
                  <div className={classes.statsChart}>
                    <LineChart
                      data={statsData.totalCaloriesToday}
                      title="Total Calories"
                      subtitle="Today"
                      callback={getCalories.total}
                      borderColor="#D5E155"
                      backgroundColor={['rgba(213, 225, 85, 0.6)', 'rgba(213, 225, 85, 0.01)']}
                    />
                  </div>
                  <div className={classes.statsChart}>
                    <LineChart
                      data={statsData.highestCalorie}
                      title="Highest Calorie"
                      subtitle="This Week"
                      callback={getCalories.highest}
                      borderColor="#D5E155"
                      backgroundColor={['rgba(213, 225, 85, 0.6)', 'rgba(213, 225, 85, 0.01)']}
                    />
                  </div>
                </Group>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <Group className={classes.settings} position="right" component={motion.div} layout="position">
          <Menu
            classNames={{
              root: classes.settingsDropdownRoot,
              body: classes.settingsDropdownItemBody,
              item: classes.settingsDropdownItem,
              itemHovered: classes.settingsDropdownItemHovered,
              itemBody: classes.settingsDropdownItemBody,
            }}
            control={
              <UnstyledButton className={classes.settingsBtn}>
                <Group spacing={8}>
                  <Sort />
                  <span>Sort All {hasDefaultSettings && `(${sortAllBy})`}</span>
                </Group>
              </UnstyledButton>
            }>
            {dropdownMenuList}
          </Menu>

          <UnstyledButton className={classes.settingsBtn} onClick={newBoardHandler}>
            <Group spacing={8}>
              <New />
              <span>New Board</span>
            </Group>
          </UnstyledButton>
        </Group>

        {boardsData && (
          <motion.div className={classes.board} layout="position">
            <ScrollArea
              ref={scrollElementRef}
              viewportRef={scrollRef}
              className={classes.boardArea}
              type="auto"
              offsetScrollbars
              onScrollPositionChange={debouncedScrollPositionChangeHandler}
              component={motion.div}
              initial={false}
              layout>
              <Group align="flex-start" spacing={40} noWrap component={motion.div} layout="position">
                {boardsData && boardsList}

                <Button
                  className={classes.boardBtn}
                  variant="outline"
                  onClick={newBoardHandler}
                  component={motion.button}
                  layout="position">
                  <Group>
                    <New />
                    <span>New Board</span>
                  </Group>
                </Button>
              </Group>
            </ScrollArea>
          </motion.div>
        )}
      </LayoutGroup>
    </Section>
  );
};
