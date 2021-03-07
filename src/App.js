import React, { useEffect, useState } from 'react';
import { FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import Logo from './images/logo.png';


function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  const name = () => {
      let enterName = '';
      while (!enterName || enterName.length > 16) {
          enterName = prompt('Please enter your name');
      }
      return enterName;
  }

  useEffect(() => {
      setUsername(name)
  }, [])

  useEffect(() => {
      db.collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
              setMessages(snapshot.docs.map(doc => ({ id: doc.id, message: doc.data() })))
          })
  }, [])

  const updateInput = (e) => {
      setInput(e.target.value)
  }

  const sendMessage = (e) => {
      e.preventDefault();

      db.collection('messages').add({
          message: input,
          username: username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      setInput('');
  }
  return (
    <div className="app">
      <h1><img src={Logo} className="logo" alt="React Messenger" /> React Messenger</h1>
      <h1> Hello Programmer </h1>
      <h3>Welcome <span className="bold">{username}</span> !</h3>


      <form className="app__form" onSubmit={sendMessage}>
                    <FormControl className="app__formControl">
                        <InputLabel value={input} onChange={updateInput}>Type a message...</InputLabel>
                        <Input className="app__input" color="primary" value={input} onChange={(e) => setInput(e.target.value)} />
                        <IconButton className="app__button" disabled={!input} color="primary" variant="contained" type="submit" onClick={sendMessage}><SendIcon /></IconButton>
                    </FormControl>
            </form>

            <div className="app__messageContainer">
                <FlipMove>
                    {
                        messages.map(({ id, message }) => (
                            <Message key={id} username={username} message={message} />
                        ))
                    }
                </FlipMove>
            </div>
        </div>
    );
}

export default App;
