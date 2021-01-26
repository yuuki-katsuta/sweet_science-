import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { db } from '../base';

const Chat = ({ history, match, location }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  //データ取得
  const fetchMessages = () => {
    const messages = db
      .collection('chats')
      .doc(`${location.state.room}`)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .get()
      .then((querySnapshot) => {
        let msg = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            console.log(doc.data());
            msg.push({
              message: doc.data().message,
            });
          }
        });
        return msg.reverse();
      });
    return messages;
  };

  useEffect(() => {
    let unmounted = false;
    (async () => {
      const result = await fetchMessages();

      //アンマウントされていなければステートを更新
      if (!unmounted) {
        setMessages(result);
      }
    })();
    //クリーンアップ関数を返す
    return () => {
      console.log('a¥');
      unmounted = true;
    };
    //eslint-disable-next-line
  }, []);

  //追加
  const messageAdd = () => {
    if (text === '') return;
    db.collection('chats')
      .doc(`${location.state.room}`)
      .collection('messages')
      .add({
        user: currentUser.displayName,
        message: text,
        createdAt: new Date(),
      })
      .then(async () => {
        const result = await fetchMessages();
        setMessages(result);
        setText('');
      });
  };

  return (
    <div>
      <p>chat {match.params.id}</p>
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
        return <div key={index}>{data.message}</div>;
      })}
      {/* <p>{location.state.room}</p> */}
      <button
        onClick={() => {
          history.push('/');
        }}
      >
        戻る
      </button>
    </div>
  );
};
export default Chat;
