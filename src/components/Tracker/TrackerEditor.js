import React, { useRef, useContext } from 'react';
import { TextInput, NumberInput, Select, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import useStyles from './TrackerEditor.styles';
import BoardContext from '../../context/BoardContext';

const TrackerEditor = ({ className, onSubmit, onCancel, onDelete, btnText, formType, ...others }) => {
  const selectRef = useRef();
  const { boardItem } = useContext(BoardContext);
  const form = useForm({
    initialValues: {
      food: boardItem ? boardItem.food : '',
      amount: boardItem ? boardItem.amount : '',
      calories: boardItem ? +boardItem.calories : null,
      time: boardItem ? boardItem.time : null,
    },

    validate: {
      time: (value) => (value === null ? true : null),
    },
  });
  const { classes, cx } = useStyles();

  const isAddForm = formType === 'add';
  const isEditForm = formType === 'edit';

  const submitHandler = (values) => {
    onSubmit(values);
  };

  return (
    <motion.div className={cx(classes.editor, className)} {...others}>
      <form className={classes.form} onSubmit={form.onSubmit(submitHandler)}>
        <TextInput
          className={cx(classes.input, { [classes.inputEditVariant]: formType === 'edit' })}
          value={form.values.food}
          placeholder="Food Name"
          required
          {...form.getInputProps('food')}
          {...(isEditForm && { label: 'Food Name' })}
        />

        <TextInput
          className={cx(classes.input, { [classes.inputEditVariant]: formType === 'edit' })}
          value={form.values.amount}
          placeholder="Amount"
          required
          {...form.getInputProps('amount')}
          {...(isEditForm && { label: 'Amount' })}
        />

        <NumberInput
          className={cx(classes.input, { [classes.inputEditVariant]: formType === 'edit' })}
          value={form.values.calories}
          placeholder="Total Calories"
          hideControls
          required
          {...form.getInputProps('calories')}
          {...(isEditForm && { label: 'Calories' })}
        />

        <Select
          ref={selectRef}
          classNames={{
            input: classes.selectInput,
          }}
          className={cx(classes.input, classes.selectInput, { [classes.inputEditVariant]: formType === 'edit' })}
          value={form.values.time}
          placeholder="Time"
          data={[
            { value: 'breakfast', label: 'Breakfast' },
            { value: 'lunch', label: 'Lunch' },
            { value: 'dinner', label: 'Dinner' },
            { value: 'snack', label: 'Snack' },
          ]}
          onDropdownClose={() => setTimeout(() => selectRef.current.blur(), 1)}
          required
          {...form.getInputProps('time')}
          {...(isEditForm && { label: 'Time' })}
        />

        <div className={cx({ [classes.buttons]: isEditForm })}>
          {isEditForm && (
            <Button className={classes.deleteBtn} variant="subtle" onClick={() => onDelete()}>
              Delete
            </Button>
          )}

          <div>
            {isEditForm && (
              <Button
                className={cx(classes.editBtn, classes.cancelBtn)}
                variant="outline"
                onClick={() => onCancel(false)}>
                Cancel
              </Button>
            )}

            <Button
              className={cx({ [classes.editBtn]: isEditForm })}
              type="submit"
              {...(isAddForm && { fullWidth: true })}>
              {btnText.confirm}
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default TrackerEditor;
