import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { Redirect } from 'react-router-dom';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const Chat = ({ history, location }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  //データ取得
  const getMessages = () => {
    if (!location.state) return;
    return db
      .collection('chats')
      .doc(`${location.state.title}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            msg.push({
              message: doc.data().message,
              user: doc.data().user,
            });
          }
        });
        //配列の要素を反転
        return msg.reverse();
      });
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const messages = await getMessages();
      if (!unmounted) {
        setMessages(messages);
      }
    })();
    return () => {
      unmounted = true;
    };
    //eslint-disable-next-line
  }, []);

  //追加
  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${location.state.title}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        createdAt: new Date(),
      })
      .then(async () => {
        const result = await getMessages();
        setMessages(result);
        setText('');
      });
  };

  const useStyles = makeStyles({
    movieInner: {
      position: 'relative',
      paddingTop: '56.25%',
    },
    videoWrapper: {
      width: '90%',
      margin: '0 auto',
    },
    video: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '100%',
      height: '100%',
    },
  });
  const classes = useStyles();

  return location.state ? (
    <div style={{ margin: '0  0 100px' }}>
      <Container maxWidth='md'>
        <h1>{location.state.title}</h1>
        {location.state.id ? (
          <div>
            <div className={classes.videoWrapper}>
              <div className={classes.movieInner}>
                <iframe
                  className={classes.video}
                  title={location.state.title}
                  width='560'
                  height='315'
                  src={`https://www.youtube.com/embed/${location.state.id}`}
                  frameBorder='1'
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <h4>I'm sorry, there is no video...</h4>
        )}
      </Container>
      <Container maxWidth='lg'>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          onClick={() => {
            messageAdd();
          }}
        >
          送信
        </button>

        {messages.map((data, index) => {
          return (
            <div key={index}>
              {data.user}: {data.message}
            </div>
          );
        })}
        <button
          onClick={() => {
            history.push('/');
          }}
        >
          戻る
        </button>
      </Container>
    </div>
  ) : (
    <Redirect to={'/'} />
  );
};
export default Chat;
