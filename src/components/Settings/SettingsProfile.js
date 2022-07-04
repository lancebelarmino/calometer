import { useState, useRef, useContext, useEffect } from 'react';
import { Title, Text, Divider, Group, Button, Avatar, SimpleGrid, TextInput, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import AuthContext from '../../context/AuthContext';
import Card from '../../components/Pages/Card';
import SegmentedControl from '../../components/Input/SegmentedControl';
import { ReactComponent as Upload } from '../../assets/svg/settings-upload.svg';
import { ReactComponent as Delete } from '../../assets/svg/settings-delete.svg';
import getInitials from '../../utils/getInitials';
import { getLocalItem, setLocalItem } from '../../utils/localStorage';
import useStyles from './SettingsProfile.styles';

const sectionVariant = {
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

const SettingsProfile = ({ ...props }) => {
  const selectRef = useRef();

  const { userData, onUpdateSettings, onImageUpload } = useContext(AuthContext);

  const [isFirstRender, setIsFirstRender] = useState(true);
  const [lifestyle, setLifestyle] = useState(() => (userData ? userData.profile.lifestyle : null));
  const [weightUnit, setWeightUnit] = useState(() => (userData ? userData.profile.weightUnit : 'lbs'));
  const [heightUnit, setHeightUnit] = useState(() => (userData ? userData.profile.heightUnit : 'm'));
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(() => {
    const profilePicture = getLocalItem('profile_picture');

    if (profilePicture) {
      return {
        image: null,
        url: profilePicture.url,
        defaultColor: profilePicture.defaultColor,
        initials: profilePicture.initials,
      };
    }

    return { image: null, url: null, defaultColor: null, initials: null };
  });

  const form = useForm({
    initialValues: {
      firstName: userData ? userData.firstName : '',
      lastName: userData ? userData.lastName : '',
      birthday: userData ? userData.profile.birthday : '',
      weight: userData ? userData.profile.weight : '',
      height: userData ? userData.profile.height : '',
    },

    validate: {
      birthday: (value) => (value === '' ? 'Cannot be blank' : null),
      weight: (value) => (/^[0-9]*(\.[0-9]{0,2})?$/.test(value) ? null : 'Invalid weight'),
      height: (value) =>
        value === ''
          ? null
          : heightUnit === 'm'
          ? /^[0-9]*(\.[0-9]{0,2})?$/.test(value)
            ? null
            : `Invalid height, E.g. 1.5`
          : /^[3-7]'(?:\s*(?:1[01]|[0-9])(''|"))?$/.test(value)
          ? null
          : `Invalid height, E.g. 5'11"`,
    },
  });

  const { classes, cx } = useStyles();

  const fileUploadHandler = (e) => {
    const [file] = e.target.files;

    if (file.size > 5000000) {
      form.setFieldError('profilePicture', 'File exceeds 5mb');
      return;
    }

    setProfilePicture((prevData) => ({ ...prevData, url: URL.createObjectURL(file), image: file }));

    if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const inputChangeHandler = (e) => {
    form.setFieldValue(e.target.id, e.target.value);

    if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const dateChangeHandler = (value) => {
    form.setFieldValue('birthday', value);

    if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const inputBlurHandler = (e) => {
    form.validateField(e.target.id);
  };

  const selectChangeHandler = (value) => {
    setLifestyle(value);

    if (isEditing === false) {
      setIsEditing(true);
    }
  };

  const submitFormHandler = (value) => {
    onImageUpload(profilePicture.image);

    const newProfile = {
      lifestyle: lifestyle,
      birthday: dayjs(value.birthday).format('YYYY-MM-DD'),
      height: value.height,
      heightUnit: heightUnit,
      weight: value.weight,
      weightUnit: weightUnit,
    };

    let updates = {};
    updates['/profile'] = newProfile;
    updates['/firstName'] = value.firstName;
    updates['/lastName'] = value.lastName;

    onUpdateSettings(updates);

    let localStorageProfilePicture = getLocalItem('profile_picture');
    localStorageProfilePicture.initials = getInitials(value.firstName, value.lastName);
    setLocalItem('profile_picture', localStorageProfilePicture);

    setIsEditing(false);
  };

  const cancelEditHandler = () => {
    setIsEditing(false);
    form.reset();
  };

  useEffect(() => {
    if (userData && isFirstRender) {
      form.setValues({
        firstName: userData.firstName,
        lastName: userData.lastName,
        birthday: userData.profile.birthday,
        weight: userData.profile.weight,
        height: userData.profile.height,
      });

      setLifestyle(userData.profile.lifestyle);
      setIsFirstRender(false);
    }
  }, [userData, isFirstRender]);

  return (
    <Card {...props} layout="size">
      <motion.div className={classes.header} layout="position">
        <Title className={classes.headerTitle} order={5}>
          Profile
        </Title>
        <Text>Update your photo and personal details</Text>
      </motion.div>

      <Divider className={classes.divider} component={motion.div} layout="position" />

      <motion.form className={classes.form} onSubmit={form.onSubmit(submitFormHandler)} layout="position">
        <Group className={classes.avatar} spacing={28} component={motion.div} layout="position">
          <Avatar src={profilePicture.url} alt="LB" size={100} radius={100} color={profilePicture.defaultColor}>
            {profilePicture.initials}
          </Avatar>
          <Group className={classes.avatarButtons} spacing={16}>
            <div className={classes.inputFile}>
              <input
                type="file"
                id="file"
                className={classes.inputFileInput}
                onChange={fileUploadHandler}
                accept="image/png, image/jpeg"
              />
              <label htmlFor="file">
                <Button className={classes.uploadPhotoBtn} component="div" leftIcon={<Upload />} variant="outline">
                  Upload Photo
                </Button>
              </label>
            </div>

            <Button className={classes.deletePhotoBtn} leftIcon={<Delete />} variant="outline">
              Delete Photo
            </Button>

            {form.errors.profilePicture && <div className={classes.avatarError}>{form.errors.profilePicture}</div>}
          </Group>
        </Group>

        <SimpleGrid
          className={cx({ [classes.formInputs]: isEditing })}
          cols={2}
          spacing={40}
          breakpoints={[{ maxWidth: 1024, cols: 1, spacing: 40 }]}>
          <motion.div className={classes.formRow} layout="position">
            <TextInput
              id="firstName"
              label="First Name"
              value={form.values.firstName}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </motion.div>

          <motion.div className={classes.formRow} layout="position">
            <TextInput
              id="lastName"
              label="Last Name"
              value={form.values.lastName}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
            />
          </motion.div>

          <motion.div className={classes.formRow} layout="position">
            <Select
              ref={selectRef}
              classNames={{
                input: classes.selectInput,
              }}
              className={classes.lifestyle}
              label="Lifestyle"
              data={[
                { value: 'lightly active', label: 'Lightly Active' },
                { value: 'moderately active', label: 'Moderately Active' },
                { value: 'very active', label: 'Very Active' },
              ]}
              value={lifestyle}
              onChange={selectChangeHandler}
            />
          </motion.div>

          <motion.div className={classes.formRow} layout="position">
            <DatePicker
              id="birthday"
              placeholder="Pick date"
              label="Birthday"
              clearable={false}
              value={dayjs(form.values.birthday).toDate()}
              onChange={dateChangeHandler}
            />
          </motion.div>

          <motion.div className={classes.formRow} layout="position">
            <TextInput
              id="weight"
              label="Weight"
              placeholder={weightUnit === 'lbs' ? `E.g. 136` : 'E.g. 62'}
              value={form.values.weight}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              error={form.errors.weight}
              required
            />
            <SegmentedControl
              data={[
                { id: 'lbs', label: 'lbs', value: 'lbs' },
                { id: 'kg', label: 'kg', value: 'kg' },
              ]}
              defaultPosition={weightUnit === 'lbs' ? 'left' : 'right'}
              onClick={setWeightUnit}
              sx={() => ({
                position: 'absolute',
                top: 2,
                right: 0,
              })}
            />
          </motion.div>

          <motion.div className={classes.formRow} layout="position">
            <TextInput
              id="height"
              label="Height"
              placeholder={heightUnit === 'm' ? 'E.g. 1.5' : `E.g. 5'11"`}
              value={form.values.height}
              onChange={inputChangeHandler}
              onBlur={inputBlurHandler}
              error={form.errors.height}
              required
            />
            <SegmentedControl
              data={[
                { id: 'm', label: 'm', value: 'm' },
                { id: 'ft', label: 'ft', value: 'ft' },
              ]}
              defaultPosition={heightUnit === 'm' ? 'left' : 'right'}
              onClick={setHeightUnit}
              sx={() => ({
                position: 'absolute',
                top: 2,
                right: 0,
              })}
            />
          </motion.div>
        </SimpleGrid>

        {isEditing && (
          <Group
            className={classes.formSubmit}
            position="right"
            spacing={40}
            component={motion.div}
            variants={sectionVariant}
            initial="hidden"
            animate="visible"
            layout="position">
            <Button
              className={cx(classes.formBtn, classes.formCancelBtn)}
              onClick={cancelEditHandler}
              variant="outline">
              Cancel
            </Button>
            <Button className={classes.formBtn} type="submit">
              Save
            </Button>
          </Group>
        )}
      </motion.form>
    </Card>
  );
};

export default SettingsProfile;
