export const linkVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.06,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
      delay: 0.1,
    },
  },
};

export const mobileLinkVariant = {
  hidden: {
    opacity: 0,
    y: -4,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
    },
  },

  exit: {
    opacity: 0,
    y: -4,
    transition: {
      ease: 'easeInOut',
      duration: 0.3,
    },
  },
};

export const backdropVariant = {
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

export const modalVariant = {
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

export const trackerEditorModalVariant = {
  hidden: {
    y: -8,
    x: '-50%',
    opacity: 0,
  },

  visible: {
    x: '-50%',
    y: 0,
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

export const sectionVariant = {
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
  },
};

export const spinnerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

export const revealVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
};

export const editorVariant = {
  hidden: {
    y: -4,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      ease: 'easeIn',
      duration: 0.1,
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

export const contentVariant = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: (i) => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeInOut',
        duration: 0.4,
        delay: i * 0.05,
      },
    };
  },

  exit: (i) => {
    return {
      y: 10,
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.2,
        delay: i * 0.05,
      },
    };
  },
};

export const buttonVariant = {
  hidden: {
    x: 0,
  },
  hover: { x: 6 },
};

export const deleteButtonVariant = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.1,
    },
  },
};
