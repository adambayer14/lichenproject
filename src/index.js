import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import {RadioColorGradient} from './RadioButtons'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<div>
  <Map/>
  <RadioColorGradient/>
</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
