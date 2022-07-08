import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';
import { Alert, Button, Group } from '@mantine/core';
import AuthContext from '../../context/AuthContext';
import { ReactComponent as Delete } from '../../assets/svg/settings-delete.svg';
import useStyles from './SettingsConfirmDelete.styles';
import { backdropVariant, modalVariant } from '../../utils/framer-variants';

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
