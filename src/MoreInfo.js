import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Img from 'react-image'


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
            <h3>Site ID: ACCTP_1</h3>
              <div class="sample-info" id="sample-1520">
                Sample #: 1520
                <br></br>
                Species: xanthoparmelia
                <br></br>
                Year: 2015
                <br></br>
                Analysis Method: ICP
              </div>
              <div class="sample-info" id="sample-1521">
                Sample #: 1521
                <br></br>
                Species: usnea
                <br></br>
                Year: 2015
                <br></br>
                Analysis Method: ICP
              </div>
              <div class="sample-info" id='sample-1522'>
                Sample #: 1522
                <br></br>
                Species: usnea
                <br></br>
                Year: 2015
                <br></br>
                Analysis Method: ICP
              </div>
            </div>
            <div class="site-info-download">
              <button>Download Site Data</button>
            </div>
            <br></br>
            <div class="graph-download">
              <button>Download Graph</button>
            </div>
          </div>
          <div class="info-display-row">
            Info Display Row
            <div class="graph-container">
              <div class="percentage">
                <img className="sitepercent" src="/images/ACCTP_1_percent.jpeg" />
              </div>
              <hr></hr>
              <div class="ppm">
                <img className="siteppm" src="/images/ACCTP_1_ppm.jpeg" />
              </div>
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
