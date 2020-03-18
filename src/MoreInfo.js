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
                <CollapsibleComponent>
                    <CollapsibleHead>
                      View Numerical Data
                    </CollapsibleHead>
                    <CollapsibleContent isExpanded={true}>
                      <div class="sample-data">
                        <div class="percent-data">
                          Ca: 1.89
                          K:  0.32
                          Mg: 0.07
                          N:  0.84
                          P:  0.1
                          S:  0.08
                        </div>
                        <div class="ppm-data">
                          Al: 1667
                          As: 1.37
                          B:  0.12	
                          Ba: 14.3
                          Cd: 0.59
                          Co: 0.87
                          Cr: 3.52
                          Cu: 13.6
                          Fe: 1836
                          Mn: 53.5
                          Mo: 0.61
                          Na: 442	
                          Ni: 2.1	
                          Pb: 9.8
                          Se: 0.09
                          Si: 484.7
                          Sr: 23.3
                          Ti: 164
                          V:  0.005
                          Zn: 28.9
                          Cl: NA
                          Br: NA
                          Rb: NA
                          Cu.Zn:  NA
                          Fe.Ti:  NA
                          F:  NA             
                        </div>
                      </div>
                    </CollapsibleContent>
                </CollapsibleComponent>
                            
              </div>
              <div class="sample-info" id="sample-1521">
                Sample #: 1521
                <br></br>
                Species: usnea
                <br></br>
                Year: 2015
                <br></br>
                Analysis Method: ICP
                <CollapsibleComponent>
                    <CollapsibleHead>
                      View Numerical Data
                    </CollapsibleHead>
                    <CollapsibleContent>
                      <div class="sample-data">
                        <div class="percent-data">
                          Ca: 1.89
                          K:  0.32
                          Mg: 0.07
                          N:  0.84
                          P:  0.1
                          S:  0.08
                        </div>
                        <div class="ppm-data">
                          Al: 1667
                          As: 1.37
                          B:  0.12	
                          Ba: 14.3
                          Cd: 0.59
                          Co: 0.87
                          Cr: 3.52
                          Cu: 13.6
                          Fe: 1836
                          Mn: 53.5
                          Mo: 0.61
                          Na: 442	
                          Ni: 2.1	
                          Pb: 9.8
                          Se: 0.09
                          Si: 484.7
                          Sr: 23.3
                          Ti: 164
                          V:  0.005
                          Zn: 28.9
                          Cl: NA
                          Br: NA
                          Rb: NA
                          Cu.Zn:  NA
                          Fe.Ti:  NA
                          F:  NA             
                        </div>
                      </div>
                    </CollapsibleContent>
                </CollapsibleComponent>
              </div>
            
              <div class="sample-info" id='sample-1522'>
                Sample #: 1522
                <br></br>
                Species: usnea
                <br></br>
                Year: 2015
                <br></br>
                Analysis Method: ICP
                <CollapsibleComponent>
                    <CollapsibleHead className="additionalClassForHead">
                      View Numerical Data
                    </CollapsibleHead>
                    <CollapsibleContent className="additionalClassForContent">
                      <div class="sample-data">
                        <div class="percent-data">
                          Ca: 1.89
                          K:  0.32
                          Mg: 0.07
                          N:  0.84
                          P:  0.1
                          S:  0.08
                        </div>
                        <div class="ppm-data">
                          Al: 1667
                          As: 1.37
                          B:  0.12	
                          Ba: 14.3
                          Cd: 0.59
                          Co: 0.87
                          Cr: 3.52
                          Cu: 13.6
                          Fe: 1836
                          Mn: 53.5
                          Mo: 0.61
                          Na: 442	
                          Ni: 2.1	
                          Pb: 9.8
                          Se: 0.09
                          Si: 484.7
                          Sr: 23.3
                          Ti: 164
                          V:  0.005
                          Zn: 28.9
                          Cl: NA
                          Br: NA
                          Rb: NA
                          Cu.Zn:  NA
                          Fe.Ti:  NA
                          F:  NA             
                        </div>
                      </div>
                    </CollapsibleContent>
                </CollapsibleComponent>
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
