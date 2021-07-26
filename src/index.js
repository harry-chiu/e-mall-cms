import React from 'react';
import { render } from 'react-dom';
import firebase from 'firebase/app';
import App from 'containers/App';
import 'regenerator-runtime';
import 'firebase/auth';
import 'firebase/database';
import 'antd/dist/antd.css';

if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const element = <App />;
const container = document.getElementById('root');

render(element, container);

if (ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js');
}
