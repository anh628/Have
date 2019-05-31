import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { store } from './store'


store.subscribe(
    throttle(() => {
    saveState({
      collection: store.getState().collection});
  
  }, 1000))


ReactDOM.render(<App />, document.getElementById('root'));

{/* <Root store={store}> will need this eventually 

    <App />  
  </Root>, document.getElementById('root')); */}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
