import React, { Component } from 'react';
// import {
//   CollapsibleComponent,
//   CollapsibleHead,
//   CollapsibleContent
// } from "react-collapsible-component";
//import { Container, Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
//import Route from 'react-router-dom/Route';
import Collapsible from 'react-collapsible';
//import axios from 'axios';

const SERVER_ROOT = 'https://mne5wp8j5m.execute-api.us-west-2.amazonaws.com';


// More info page

class MoreInfoRender extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  componentDidMount() {

    getSiteData(this.props.match.params.sitecode).then(json => {
      const siteData = json.data;
      console.log(siteData);
      this.setState({
        data: siteData
      });
    });

  }

  // prepareCSV() {
  //   var csv = ''//'Name,Title\n';
  //   this.state.data.forEach(function(row) {
  //           csv += row.join(',');
  //           csv += "\n";
  //   });
  
  //   console.log(csv);
  //   var hiddenElement = document.createElement('a');
  //   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  //   hiddenElement.target = '_blank';
  //   hiddenElement.download = 'people.csv';
  //   hiddenElement.click();
  
  // }


  render() {
    let activeSite = this.props.match.params.sitecode
    let htmlSideContainer;
    htmlSideContainer = renderSidePanel(this.state.data);
    let htmlDescriptionContainer;
    htmlDescriptionContainer = renderSiteDescription(this.state.data)
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
                  {htmlSideContainer}
                </div>
            </div>
            <div class="site-info-download">
              <button>Download Site Data</button>
            </div>
            <br></br>
            <div class="graph-download">
              <button>
                <Link class="graph-link" to={percentBoxPlot} target="_blank" download>Download Percent Graph</Link>
              </button>
            </div>
            <br></br>
            <div class="graph-download">
              <button>
                <Link class="graph-link" to={ppmBoxPlot} target="_blank" download>Download ppm Graph</Link>
              </button>
            </div>
            <br></br>
          </div>
          <div class="info-display-row">
            <div class="graph-container">
              <div>
                {htmlDescriptionContainer}
              </div>
              <div class="percentage">
                <img className="sitepercent" src={percentBoxPlot} alt="Error Displaying Graph" />
              </div>
              <hr></hr>
              <div class="ppm">
                <img className="siteppm" src={ppmBoxPlot} alt="Error Displaying Graph" />
              </div>
            </div>
          </div>
        </div>


        <div class="footer-container">
          <div class="footer">
            Note: Box Plots are based off of all elemental analysis samples
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



function renderSidePanel(activeSiteData) {

  if (activeSiteData.length === 0) {
    return
  }

  var myList = [];
  var allEAData = activeSiteData.EAData;


  var siteIDToIndex = {};
  for (let i = 0; i < allEAData.length; i++) {
    siteIDToIndex[allEAData[i].Sample] = i;
  }



  var sortedSiteIndexDict = Object.keys(siteIDToIndex).sort();

  var j = 1;



  for (var i = 0; i < sortedSiteIndexDict.length; i++) {

    let myId = "sample-" + j

    var currentSampleDict = allEAData[siteIDToIndex[sortedSiteIndexDict[i]]]

    myList.push(
      <div class="sample-info" id={myId}>
        Sample #: {sortedSiteIndexDict[i]}
        <br></br>
        Species: {currentSampleDict["Species"]}
        <br></br>
        Year Collected: {currentSampleDict["ycollect"]}
        <br></br>
        Year Published: {currentSampleDict["ypublish"]}
        <br></br>
        Analysis Method: {currentSampleDict["tech"]}
          <Collapsible trigger='View Numerical Data'>
                <div class='content'>
                    Ca: {currentSampleDict["CaPERC"]}%<br/>
                    K:  {currentSampleDict["KPERC"]}%<br/>
                    Mg: {currentSampleDict["MgPERC"]}%<br/>
                    N:  {currentSampleDict["NPERC"]}%<br/>
                    P:  {currentSampleDict["PPERC"]}%<br/>
                    S:  {currentSampleDict["SPERC"]}%<br/>
                    Al: {currentSampleDict["Al"]}<br/>
                    As: {currentSampleDict["As"]}<br/>
                    B:  {currentSampleDict["B"]}<br/>
                    Ba: {currentSampleDict["Ba"]}<br/>
                    Cd: {currentSampleDict["Cd"]}<br/>
                    Co: {currentSampleDict["Co"]}<br/>
                    Cr: {currentSampleDict["Cr"]}<br/>
                    Cu: {currentSampleDict["Cu"]}<br/>
                    Fe: {currentSampleDict["Fe"]}<br/>
                    Mn: {currentSampleDict["Mn"]}<br/>
                    Mo: {currentSampleDict["Mo"]}<br/>
                    Na: {currentSampleDict["Na"]}<br/>
                    Ni: {currentSampleDict["Ni"]}<br/>
                    Pb: {currentSampleDict["Pb"]}<br/>
                    Se: {currentSampleDict["Se"]}<br/>
                    Si: {currentSampleDict["Si"]}<br/>
                    Sr: {currentSampleDict["Sr"]}<br/>
                    Ti: {currentSampleDict["Ti"]}<br/>
                    V:  {currentSampleDict["V"]}<br/>
                    Zn: {currentSampleDict["Zn"]}<br/>
                    Cl: {currentSampleDict["Cl"]}<br/>
                    Br: {currentSampleDict["Br"]}<br/>
                    Rb: {currentSampleDict["Rb"]}<br/>
                  Cu.Zn:  {currentSampleDict["Cu_Zn"]}<br/>
                Fe.Ti:  {currentSampleDict["Fe_Ti"]}<br/>
                    F:  {currentSampleDict["F"]}<br/>
                </div>
          </Collapsible>
        </div>
      );
    j++;
  }

  return myList

}

function renderSiteDescription(siteData) {

  var endHTML = [];

  if (siteData.length === 0) {
    return
  }
 endHTML.push(
   <div class="site_description">
      <div class="description_head">
          Site Description:<br/>
      </div>
      <div>
        Country: {siteData.Country};
        State: {siteData.State};
        County: {siteData.County};
        Collection Data: {siteData.CollectionDate}
        <br/>
        USNF/NRA/NP: {siteData.USNF_NRA_NP};
        Wilderness Area/unit: {siteData.WildernessArea}
        <br/>
        Detailed Locality Data: {siteData.DetailedLocalityData}.
        <br/>
        Lat: {siteData.Lat};
        Long: {siteData.Lng};
        Elevation (meters): {siteData.Elevation}
        <br/>
      </div>
    </div>
  );

  console.log(siteData)

  return endHTML;

}


export {MoreInfoRender}


function getSiteData(siteCode) {
  return fetch(`${SERVER_ROOT}/dev/sites/${siteCode}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}
