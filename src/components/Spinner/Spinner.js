import React from 'react';
import { GooSpinner } from 'react-spinners-kit';
import { motion, AnimatePresence } from 'framer-motion';
import { spinnerVariant } from '../../utils/framer-variants';
import useStyles from './Spinner.styles';

const Spinner = () => {
  const { classes } = useStyles();

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className={classes.spinner}
        key="spinner"
        variants={spinnerVariant}
        initial="hidden"
        animate="visible"
        exit="exit">
        <GooSpinner size={160} color="#6ED47C" />
      </motion.div>
    </AnimatePresence>
  );
};

export default Spinner;
