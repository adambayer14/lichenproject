import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
//import {RadioColorGradient} from './RadioButtons'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { MoreInfoRender } from './MoreInfo';

//npm i react-router@4.3.1

ReactDOM.render(
  <Router>
    <Route path="/" exact>
      <Map/>

    </Route>
    <Route path="/moreinfo/:sitecode" exact component = {MoreInfoRender}></Route>
  </Router>,
  document.getElementById('root'));


// ReactDOM.render(
//   <Router>
//     <Route path="/" exact>
//       <Map/>
//     </Route>
//   </Router>,
//   document.getElementById('map-container'));
//
// ReactDOM.render(
//   <Router>
//     <Route path="/" exact>
//       <RadioColorGradient/>
//     </Route>
//   </Router>,
//   document.getElementById('elements'));
//
// ReactDOM.render(
//   <Router>
//     <Route path="/moreinfo" exact>
//       <MoreInfoRender/>
//     </Route>
//   </Router>,
//   document.getElementById('more-info-content'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
