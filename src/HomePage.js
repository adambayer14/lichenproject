import React from 'react';
import ReactDOM from 'react-dom';
import Map from './Map';
import {RadioColorGradient} from './RadioButtons'

class HomePageRender extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return (
      ReactDOM.render(<Map/>, document.getElementById('map-container')),
      ReactDOM.render(<RadioColorGradient/>, document.getElementById('elements'))
    );
  }

}


export {HomePageRender}
