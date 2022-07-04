import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { motion } from 'framer-motion';
import SettingsConfirmDelete from './SettingsConfirmDelete';
import useStyles from './SettingsDelete.styles';

const SettingsDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { classes } = useStyles();

  return (
    <>
      <SettingsConfirmDelete isDeleting={isDeleting} setIsDeleting={setIsDeleting} />

      <Button
        classNames={{
          label: classes.btnLabel,
        }}
        className={classes.btn}
        variant="outline"
        fullWidth
        onClick={() => setIsDeleting(true)}
        component={motion.button}
        layout="position">
        Delete Account
      </Button>
    </>
  );
};

export default SettingsDelete;
