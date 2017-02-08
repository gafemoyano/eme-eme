import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import  firease from 'firebase';
import './index.css';
import 'normalize.css/normalize.css';

const config = {
  apiKey: "AIzaSyBrJ3MHEoebcqIzaBD-WWMGtXmUkAbv5F8",
  authDomain: "eme-eme.firebaseapp.com",
  databaseURL: "https://eme-eme.firebaseio.com",
  storageBucket: "eme-eme.appspot.com",
  messagingSenderId: "1046357356195"
};

firease.initializeApp(config)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
