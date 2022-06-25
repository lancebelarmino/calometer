import { useRef, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import useStyles from './SegmentedControl.styles';

const SegmentedControl = ({ data, sx, onClick, defaultPosition }) => {
  const refs = useRef([]);
  const [width, setWidth] = useState(null);
  const [activePosition, setActivePosition] = useState({ left: -1, translateX: 0, borderRadius: '4px 0 0 4px' });
  const [activeBtn, setActiveBtn] = useState('left');
  const { classes } = useStyles();

  useEffect(() => {
    if (refs.length !== 0) {
      const width1 = refs.current[data[0].value].clientWidth;
      const width2 = refs.current[data[1].value].clientWidth;
      const largestWidth = Math.max(width1, width2);

      setWidth(largestWidth);
    }
  }, [data]);

  useEffect(() => {
    if (defaultPosition === 'right') {
      setActivePosition({ left: 0, translateX: width + 24, borderRadius: '0 4px 4px 0' });
      setActiveBtn('right');
    } else {
      setActivePosition({ left: -1, translateX: 0, borderRadius: '4px 0 0 4px' });
      setActiveBtn('left');
    }
  }, [defaultPosition, width]);

  const rowSx = () => ({
    zIndex: 199,
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
    width: width + 24,
  });

  const leftBtnClickHandler = () => {
    onClick(data[0].value);
    setActivePosition({ left: -1, translateX: 0, borderRadius: '4px 0 0 4px' });
    setActiveBtn('left');
  };

  const rightBtnClickHandler = () => {
    onClick(data[1].value);
    setActivePosition({ left: 0, translateX: width + 24, borderRadius: '0 4px 4px 0' });
    setActiveBtn('right');
  };

  return (
    <Box className={classes.root} sx={sx}>
      <div className={classes.wrapper}>
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: -1,
            left: activePosition.left,
            height: 20,
            width: 'calc(50% + 1px)',
            background: theme.colors.green[1],
            borderRadius: activePosition.borderRadius,
            transform: `translateX(${activePosition.translateX}px)`,
            transition: theme.other.transitions.all,
          })}
        />

        <Box onClick={leftBtnClickHandler} sx={rowSx}>
          <label
            ref={(node) => {
              refs.current[data[0].value] = node;
            }}
            className={`${classes.label} ${activeBtn === 'left' && classes.activeLabel}`}
            htmlFor={data[0].id}>
            {data[0].label}
          </label>
          <input id={data[0].id} className={classes.input} type="radio" name={data[0].id} />
        </Box>

        <Box onClick={rightBtnClickHandler} sx={rowSx}>
          <label
            ref={(node) => {
              refs.current[data[1].value] = node;
            }}
            className={`${classes.label} ${activeBtn === 'right' && classes.activeLabel}`}
            htmlFor={data[1].id}>
            {data[1].label}
          </label>
          <input id={data[1].id} className={classes.input} type="radio" name={data[1].id} />
        </Box>
      </div>
    </Box>
  );
};

export default SegmentedControl;
