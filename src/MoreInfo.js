import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';


// More info page

class MoreInfoRender extends React.Component {
  constructor(props) {
    super(props)

    this.containerMoreInfo = document.createElement('div');
    this.externalWindow = null;
  }



  render() {
    return(
      <Router>
        <div>
          <Route path="/moreinfo" exact render={
            () => {
              return(<p>Did it Work?</p>);
            }
          }/>
        </div>
      </Router>
    );
  }

  onComponentMount() {
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');
    this.externalWindow.document.body.appendChild(this.containerMoreInfo);
  }

  onComponentUnmount() {
    this.externalWindow.close();
  }

}


export {MoreInfoRender}
