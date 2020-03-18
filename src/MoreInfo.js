import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';


// More info page

class MoreInfoRender extends React.Component {
  constructor(props) {
    super(props)
  }



  render() {
    return(
      <div class="more-info-container">
        <div class="header-container">
          <div class="header">
            Info for Site Number:
          </div>
        </div>

        <div class="more-info-content">

          <div class="info-selector-row">
            Info Selector Row
            <div class="site-info">
              Site ID:
              <br></br>
              Species:
              <br></br>
              Year Sampled:
              <br></br>
              Analysis Method:
              <br></br>
              Latitude:
              <br></br>
              Longitude:
            </div>
            <div class="site-info-download">
              <button>Download Site Data</button>
            </div>
          </div>
          <div class="info-display-row">
            Info Display Row
            <div class="graph-container">
              <div class="percentage">
                <img className="sitepercent" src="/images/ACCTP_1_percent.jpeg" />
              </div>
              <div class="ppm">
                <img className="siteppm" src="/images/ACCTP_1_ppm.jpeg" />
              </div>
            </div>
            <div class="graph-download">
              <button>Download Graph</button>
            </div>
          </div>
        </div>


        <div class="footer-container">
          <div class="footer">
            Footer
          </div>
        </div>
      </div>



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
