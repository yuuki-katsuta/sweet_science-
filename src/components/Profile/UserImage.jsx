import React, { useContext, useState } from 'react';
import { storage } from '../../base';
import { AuthContext } from '../../auth/AuthProvider';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const UserImage = () => {
  const { currentUser, ChangePhtoUrl, ResetPhtoUrl } = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState(currentUser.photoURL);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    image: {
      margin: '0 auto 16px',
      border: '1px solid #ccc',
      width: theme.spacing(18),
      height: theme.spacing(18),
    },
  }));
  const classes = useStyles();

  const handleImage = (event) => {
    const image = event.target.files[0];
    setImage(image);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (image === '' || image === undefined) {
      alert('ファイルが選択されていません');
      return;
    }
    // アップロード処理
    const uploadTask = storage.ref(`/images/${image.name}`).put(image);
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    );
  };
  const next = (snapshot) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + '% done');
    console.log(snapshot);
  };
  const error = (error) => {
    alert(error.message);
  };
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    storage
      .ref('images')
      .child(image.name)
      .getDownloadURL()
      .then(async (fireBaseUrl) => {
        await ChangePhtoUrl(fireBaseUrl);
        setImageUrl(currentUser.photoURL);
      });
  };

  return (
    <div className='App'>
      <div className={classes.root}>
        {currentUser.photoURL ? (
          <span
            style={{
              position: 'relative',
            }}
          >
            <Avatar alt='uploaded' src={imageUrl} className={classes.image} />
            {imageUrl !== '' && (
              <Tooltip title='Remove photo' arrow placement='right-start'>
                <IconButton
                  aria-label='delete'
                  style={{
                    position: 'absolute',
                    left: '52px',
                    bottom: '25px',
                  }}
                  onClick={() => {
                    const result = window.confirm(
                      'Are you sure you want to reset your current avatar?'
                    );
                    if (result) {
                      ResetPhtoUrl();
                      setImageUrl('');
                    } else {
                      return;
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </span>
        ) : (
          <Avatar alt='uploaded' className={classes.image} />
        )}
      </div>
      <form onSubmit={onSubmit}>
        <input type='file' onChange={handleImage} />
        <button>送信</button>
      </form>
    </div>
  );
};
export default UserImage;
