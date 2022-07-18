import { useState, useEffect, useRef, useMemo } from 'react';
import debounce from '../utils/debounce';

const useScrollPosition = () => {
  const viewport = useRef();
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [scrollData, setScrollData] = useState({
    scrollHeight: 0,
    clientHeight: 0,
  });
  const [isPosition, setIsPosition] = useState({ top: true, bottom: false });

  const calculateScrollData = (type) => {
    const { scrollHeight, clientHeight } = viewport.current;

    if (type === 'add') {
      setScrollData({ scrollHeight: scrollHeight + 25, clientHeight });
    } else if (type === 'delete') {
      setScrollData({ scrollHeight: scrollHeight - 25, clientHeight });
    } else {
      setScrollData({ scrollHeight, clientHeight });
    }
  };

  const scrollPositionChangeHandler = ({ x, y }) => {
    setScrollPosition({ x, y });
  };

  const debouncedScrollPositionChangeHandler = useMemo(() => debounce(scrollPositionChangeHandler, 100), []);

  useEffect(() => {
    if (viewport.current) {
      const { scrollTop } = viewport.current;

      if (scrollPosition.y > 0) {
        setIsPosition((prevData) => ({ ...prevData, top: false }));
      } else if (scrollPosition.y === 0) {
        setIsPosition((prevData) => ({ ...prevData, top: true }));
      }

      if (scrollTop + scrollData.clientHeight === scrollData.scrollHeight) {
        setIsPosition((prevData) => ({ ...prevData, bottom: true }));
      } else {
        setIsPosition((prevData) => ({ ...prevData, bottom: false }));
      }
    }
  }, [scrollPosition.y, scrollData.clientHeight, scrollData.scrollHeight]);

  useEffect(() => {
    let timer = setTimeout(() => calculateScrollData(), 250);
    return () => clearTimeout(timer);
  }, []);

  return {
    viewport,
    isPosition,
    calculateScrollData,
    debouncedScrollPositionChangeHandler,
  };
};

export default useScrollPosition;
