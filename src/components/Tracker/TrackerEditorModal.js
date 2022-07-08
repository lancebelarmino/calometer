import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { Title, Divider, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import BoardContext from '../../context/BoardContext';
import TrackerEditor from './TrackerEditor';
import { backdropVariant, trackerEditorModalVariant } from '../../utils/framer-variants';
import useStyles from './TrackerEditorModal.styles';

const TrackerEditorModal = () => {
  const { isEdit, setIsEdit, sortedData, boardItem, setBoardItem, updateBoardItem, deleteBoardItem } =
    useContext(BoardContext);
  const { classes } = useStyles();

  const closeModalHandler = () => {
    setBoardItem(null);
    setIsEdit(false);
  };

  const updateItemHandler = (values) => {
    const updatedItem = { ...boardItem, ...values };

    updateBoardItem(updatedItem);
    setBoardItem(null);
    setIsEdit(false);
  };

  const deleteItemHandler = () => {
    deleteBoardItem(boardItem);
    setBoardItem(null);
    setIsEdit(false);
  };

  return ReactDOM.createPortal(
    <>
      {isEdit && (
        <>
          <motion.div
            className={classes.backdrop}
            onClick={closeModalHandler}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariant}
          />
          <motion.div
            className={classes.modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={trackerEditorModalVariant}>
            <Group className={classes.modalHeader} position="apart">
              <Title order={6} className={classes.modalTitle}>
                Edit Item
              </Title>

              <Title order={6} className={classes.modalDate}>
                {sortedData.date.dayMonth} - {sortedData.date.dayWeek}
              </Title>
            </Group>

            <Divider className={classes.modalDivider} />
            <TrackerEditor
              btnText={{ confirm: 'Save' }}
              formType="edit"
              onSubmit={updateItemHandler}
              onCancel={setIsEdit}
              onDelete={deleteItemHandler}
            />
          </motion.div>
        </>
      )}
    </>,
    document.getElementById('modal')
  );
};

export default TrackerEditorModal;
