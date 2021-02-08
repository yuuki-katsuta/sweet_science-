import React, { useState } from 'react';
import { db } from '../base';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

const AddMatchInformation = ({ getMatcheInformation, setMatchData }) => {
  const [fighter1, setFighter1] = useState('');
  const [fighter2, setFighter2] = useState('');
  const [division, setiDvision] = useState('');
  const [date, setDate] = useState('');
  const [url, setUrl] = useState('');
  const [venue, setVenue] = useState('');
  const [overview, setOverview] = useState('');

  const useStyles = makeStyles((theme) => ({
    titleFont: {
      fontFamily: 'Arimo',
    },
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '30ch',
      },
      margin: '16px 0 0',
    },
    fab: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  //追加
  const addChat = () => {
    if (fighter1 && fighter2 && division && date && venue) {
      //urlから動画のIdを取得
      const videoId = url ? url.split('v=')[1] : null;
      db.collection('chats')
        .doc(`${fighter1} vs ${fighter2}`)
        .set({
          title: `${fighter1} vs ${fighter2}`,
          fighter1: fighter1,
          fighter2: fighter2,
          division: division,
          date: date,
          videoId: videoId,
          createdAt: new Date(),
          venue: venue,
          overview: overview,
        })
        .then(async () => {
          const matchInformation = await getMatcheInformation();
          setMatchData(matchInformation);
          setFighter1('');
          setFighter2('');
          setiDvision('');
          setDate('');
          setUrl('');
          setVenue('');
          setOverview('');
        });
    } else {
      alert('item is not entered');
    }
  };

  return (
    <>
      <h1 className={classes.titleFont}>Add Match</h1>
      <form className={classes.root} noValidate autoComplete='off'>
        <TextField
          id='fighter1'
          label='fighter'
          color='secondary'
          value={fighter1}
          onChange={(e) => {
            setFighter1(e.target.value);
          }}
        />
        <TextField
          id='fighter2'
          label='fighter'
          color='secondary'
          value={fighter2}
          onChange={(e) => {
            setFighter2(e.target.value);
          }}
        />
        <TextField
          id='division'
          label='division'
          color='secondary'
          value={division}
          onChange={(e) => {
            setiDvision(e.target.value);
          }}
        />
        <TextField
          id='date'
          label='date'
          color='secondary'
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          id='url'
          label='video url'
          color='secondary'
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          id='venue'
          label='venue'
          color='secondary'
          value={venue}
          onChange={(e) => {
            setVenue(e.target.value);
          }}
        />
        <TextField
          fullWidth={true}
          id='standard-multiline-static'
          label='write overview...'
          multiline
          rows={2}
          value={overview}
          onChange={(e) => {
            setOverview(e.target.value);
          }}
        />
      </form>
      <div style={{ display: 'flex', justifyContent: 'flex-End' }}>
        <Tooltip title='Add' aria-label='add'>
          <Fab
            color='primary'
            className={classes.fab}
            size='small'
            onClick={() => {
              addChat();
            }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </>
  );
};
export default AddMatchInformation;
