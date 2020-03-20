import React, { Component } from 'react';
import {
  CollapsibleComponent,
  CollapsibleHead,
  CollapsibleContent
} from "react-collapsible-component";
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Collapsible from 'react-collapsible';
import axios from 'axios';


// More info page

class MoreInfoRender extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    let activeSite = this.props.match.params.sitecode
    let htmlContainer;
    htmlContainer = renderSidePanel();
    let percentBoxPlot = "/images/" + activeSite + "_percent.jpeg"
    let ppmBoxPlot = "/images/" + activeSite + "_ppm.jpeg"

    return(
      <div class="more-info-container">
        <div class="header-container">
          <div class="header">
            Info for Site Number: {activeSite}
          </div>
        </div>

        <div class="more-info-content">

          <div class="info-selector-row">
            <div class="site-info">
            <h3>Site ID: {activeSite}</h3>
                <div>
                  {htmlContainer}
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
            <div class="graph-container">
              <div class="percentage">
                <img className="sitepercent" src={percentBoxPlot} />
              </div>
              <hr></hr>
              <div class="ppm">
                <img className="siteppm" src={ppmBoxPlot} />
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

function renderSidePanel() {

  let val = 10;
  let myList = [];
  let idList = ["sample-1520", "sample-1521", "sample-1522"]
  let sampleNum = ["1520", "1521", "1522"]
  let speciesList = ["xanthoparmelia", "usnea", "usnea"]

  for (let i = 0; i < val; i++) {
    let idNum = i + 1
    let myId = "sample-" + idNum

    myList.push(
      <div class="sample-info" id={myId}>
        Sample #: "Test"
        <br></br>
        Species: "Test"
        <br></br>
        Year: 2015
        <br></br>
        Analysis Method: ICP
          <Collapsible trigger='View Numerical Data'>
                <div class='content'>
                    Ca: 1.89<br/>
                    K:  0.32<br/>
                    Mg: 0.07<br/>
                    N:  0.84<br/>
                    P:  0.1<br/>
                    S:  0.08<br/>
                    Al: 1667<br/>
                    As: 1.37<br/>
                    B:  0.12<br/>
                    Ba: 14.3<br/>
                    Cd: 0.59<br/>
                    Co: 0.87<br/>
                    Cr: 3.52<br/>
                    Cu: 13.6<br/>
                    Fe: 1836<br/>
                    Mn: 53.5<br/>
                    Mo: 0.61<br/>
                    Na: 442<br/>
                    Ni: 2.1<br/>
                    Pb: 9.8<br/>
                    Se: 0.09<br/>
                    Si: 484.7<br/>
                    Sr: 23.3<br/>
                    Ti: 164<br/>
                    V:  0.005<br/>
                    Zn: 28.9<br/>
                    Cl: NA<br/>
                    Br: NA<br/>
                    Rb: NA<br/>
                    Cu.Zn:  NA<br/>
                    Fe.Ti:  NA<br/>
                    F:  NA<br/>
                </div>
          </Collapsible>
        </div>
      );
  }

  return myList
}


export {MoreInfoRender}


function getSiteData(siteCode) {
  return fetch(`https://kt68o8tnw3.execute-api.us-west-2.amazonaws.com/dev/sites?SiteCode=${siteCode}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}
