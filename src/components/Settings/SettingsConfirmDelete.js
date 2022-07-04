import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { Alert, Button, Group } from '@mantine/core';
import AuthContext from '../../context/AuthContext';
import { ReactComponent as Delete } from '../../assets/svg/settings-delete.svg';
import useStyles from './SettingsConfirmDelete.styles';

const backdropVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      ease: 'easeIn',
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 1,
    },
  },
};

const modalVariant = {
  hidden: {
    x: '-50%',
    y: '-42%',
    opacity: 0,
  },

  visible: {
    x: '-50%',
    y: '-40%',
    opacity: 1,
    transition: {
      delay: 0.1,
      ease: 'easeIn',
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.1,
    },
  },
};

const SettingsConfirmDelete = ({ isDeleting, setIsDeleting }) => {
  const { onDeleteAccount } = useContext(AuthContext);

  const { classes, cx } = useStyles();

  const closeModalHandler = () => {
    setIsDeleting(false);
  };

  const deleteAccountHandler = () => {
    onDeleteAccount();
    setIsDeleting(false);
  };

  return ReactDOM.createPortal(
    <>
      {isDeleting && (
        <>
          <motion.div
            className={classes.backdrop}
            onClick={closeModalHandler}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariant}
          />
          <motion.div className={classes.modal} initial="hidden" animate="visible" exit="exit" variants={modalVariant}>
            <Alert
              classNames={{
                message: classes.alertMessage,
              }}
              className={classes.warning}
              icon={<Delete className={classes.deleteIcon} />}
              title="Delete your account?"
              color="red">
              All boards created in this account and other data associated with it will be deleted. This cannot be
              undone.
            </Alert>

            <Group className={classes.formSubmit} position="right" spacing={24}>
              <Button className={classes.btn} variant="outline" onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>

              <Button className={cx(classes.btn, classes.deleteBtn)} onClick={deleteAccountHandler}>
                Delete
              </Button>
            </Group>
          </motion.div>
        </>
      )}
    </>,
    document.getElementById('modal')
  );
};

export default SettingsConfirmDelete;
