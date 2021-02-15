import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthProvider.js';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextInputField from './TextInputField';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    height: 'auto',
    width: '40%',
    minWidth: '300px',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Profile = () => {
  const {
    currentUser,
    changeCurrentName,
    changeCurrentEmail,
    ChangeCurrentPassword,
  } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setIsNameChanged(false);
    setIsEmailChanged(false);
    setIsPasswordChanged(false);
  };

  const Item = ({ nameSelected, emailSelected, handleOpen }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        {nameSelected && (
          <h3>
            Name:&nbsp;&nbsp;
            {!name
              ? currentUser.displayName
              : isNameChanged
              ? currentUser.displayName
              : name}
          </h3>
        )}
        {emailSelected && (
          <h3>
            Email:&nbsp;&nbsp;
            {!email
              ? currentUser.email
              : isEmailChanged
              ? currentUser.email
              : email}
          </h3>
        )}
        <IconButton
          style={{ margin: '0 0 3px auto' }}
          onClick={() => {
            nameSelected && setIsNameChanged(true);
            emailSelected && setIsEmailChanged(true);
            handleOpen();
          }}
        >
          <CreateIcon />
        </IconButton>
      </div>
    );
  };

  return (
    <div>
      <h1>Your Profile</h1>
      <h2>Here you can edit your profile</h2>
      <div
        style={{
          width: '35%',
          margin: '50px auto 0',
          textAlign: 'left',
          minWidth: '260px',
        }}
      >
        <Item nameSelected handleOpen={handleOpen} />
        <Item emailSelected handleOpen={handleOpen} />
      </div>
      <Button
        variant='outlined'
        onClick={() => {
          setIsPasswordChanged(true);
          setOpen(true);
        }}
      >
        Change Password
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {isNameChanged && (
              <>
                <h3>Please enter a new Name</h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextInputField
                    id={'standard-name-required'}
                    name={'name'}
                    type={'name'}
                    value={name}
                    setName={setName}
                    placeholder={currentUser.displayName}
                  />
                  <IconButton
                    onClick={async () => {
                      if (name === '' || name === currentUser.displayName) {
                        handleClose();
                        return;
                      }
                      handleClose();
                      await changeCurrentName(name, setName);
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                </div>
              </>
            )}
            {isEmailChanged && (
              <>
                <h3>Please enter a new Email</h3>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TextInputField
                    id={'standard-name-required'}
                    name={'email'}
                    type={'email'}
                    value={email}
                    setName={setEmail}
                    placeholder={currentUser.email}
                  />
                  <IconButton
                    onClick={async () => {
                      if (email === '' || email === currentUser.email) {
                        handleClose();
                        return;
                      }
                      handleClose();
                      await changeCurrentEmail(email, setEmail);
                    }}
                  >
                    <CreateIcon />
                  </IconButton>
                </div>
              </>
            )}
            {isPasswordChanged && (
              <>
                <h3>Please enter a new Password</h3>
                <TextInputField
                  type={'password'}
                  value={newPassword}
                  setName={setNewPassword}
                  label={'New Password'}
                  placeholder={'New Password'}
                />
                <TextInputField
                  type={'password'}
                  value={confirmPassword}
                  setName={setConfirmPassword}
                  label={'Confirim Password'}
                  placeholder={'Confirim Password'}
                />
                <IconButton
                  style={{
                    display: 'flex',
                    margin: '0 0 0 auto',
                  }}
                  onClick={async () => {
                    if (newPassword === '' || confirmPassword === '') {
                      handleClose();
                      return;
                    }
                    await ChangeCurrentPassword(confirmPassword, newPassword);
                    setNewPassword('');
                    setConfirmPassword('');
                    handleClose();
                  }}
                >
                  <CreateIcon />
                </IconButton>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default Profile;
