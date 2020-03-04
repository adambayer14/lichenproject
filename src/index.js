import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import {RadioColorGradient} from './RadioButtons'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { MoreInfoRender } from './MoreInfo';
import { HomePageRender } from './HomePage';

// ReactDOM.render(
//   <Router>
//     <Route path="/" exact>
//       <HomePageRender
//     </Route>
//     <Route path="/moreinfo" exact>
//       <MoreInfoRender/>
//     </Route>
//   </Router>,
//   document.getElementById('root'));


// ReactDOM.render(
//   <Router>
//     <Route path="/" exact>
//       <Map/>
//       <RadioColorGradient/>
//     </Route>
//     <Route path="/moreinfo" exact>
//       <MoreInfoRender/>
//     </Route>
//   </Router>,
//   document.getElementById('root'));


ReactDOM.render(
  <Router>
    <Route path="/" exact>
      <Map/>
    </Route>
  </Router>,
  document.getElementById('map-container'));

ReactDOM.render(
  <Router>
    <Route path="/" exact>
      <RadioColorGradient/>
    </Route>
  </Router>,
  document.getElementById('elements'));

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
