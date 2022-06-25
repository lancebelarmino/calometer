import { motion } from 'framer-motion';
import useStyles from './Card.styles';

const Card = ({ children, className, ...others }) => {
  const { classes, cx } = useStyles();

  return (
    <motion.div className={cx(classes.card, className)} {...others}>
      {children}
    </motion.div>
  );
};

export default Card;
