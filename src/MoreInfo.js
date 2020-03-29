import React, { Component } from 'react';
import { CSVLink, CSVDownload } from "react-csv";

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
      this.setState({
        data: siteData
      });
    });

  }

  render() {
    let activeSite = this.props.match.params.sitecode
    let htmlSideContainer;
    htmlSideContainer = renderSidePanel(this.state.data);
    let htmlDescriptionContainer;
    htmlDescriptionContainer = renderSiteDescription(this.state.data)
    let percentBoxPlot = "/images/" + activeSite + "_percent.jpeg"
    let ppmBoxPlot = "/images/" + activeSite + "_ppm.jpeg"
    let csvData = formatCSV(this.state.data)
    console.log(csvData)
    
    return(
      <div class="more-info-container">
        <div class="header-container">
          <div class="header">
            Information on Site: {activeSite}
          </div>
        </div>

        <div class="more-info-content">

          <div class="info-selector-row">
            <div class="site-info">
            <h3>Elemental Analysis</h3>
                <div>
                  {htmlSideContainer}
                </div>
            </div>
            <div class="site-info-download">
              {/* <CSVLink data={csvData}>Download me</CSVLink>; */}
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
            <div>
              {htmlDescriptionContainer}
            </div>
            <div class="graph-container">
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

function formatCSV(data) {
  if (data.length === 0) {
    return
  }
  var myList = [[
    "sample number","species","year collected","year published","analysis method",
    "Ca","K","Mg","N","P","S","Al","As","B","Ba","Cd","Co","Cr","Cu","Fe","Mn","Mo",
    "Na","Ni","Pb","Se","Si","Sr","Ti","V","Zn","Cl","Br","Rb","CuZn","FeTi","F"
  ]];
  var allEAData = data.EAData;

  var siteIDToIndex = {};
  for (let i = 0; i < allEAData.length; i++) {
    var siteSampleNumber = parseFloat(allEAData[i].Sample);
    siteIDToIndex[siteSampleNumber] = i;
  }

  var sortedSiteIndexDict = Object.keys(siteIDToIndex);

  for (var i = 0; i < sortedSiteIndexDict.length; i++) {
    var currentSampleDict = allEAData[siteIDToIndex[sortedSiteIndexDict[i]]]
    myList.push([
        String(sortedSiteIndexDict[i]),
        String(currentSampleDict["Species"]),
        String(currentSampleDict["ycollect"]),
        String(currentSampleDict["ypublish"]),
        String(currentSampleDict["tech"]),
        String(currentSampleDict["CaPERC"]),
        String(currentSampleDict["KPERC"]),
        String(currentSampleDict["MgPERC"]),
        String(currentSampleDict["NPERC"]),
        String(currentSampleDict["PPERC"]),
        String(currentSampleDict["SPERC"]),
        String(currentSampleDict["Al"]),
        String(currentSampleDict["As"]),
        String(currentSampleDict["B"]),
        String(currentSampleDict["Ba"]),
        String(currentSampleDict["Cd"]),
        String(currentSampleDict["Co"]),
        String(currentSampleDict["Cr"]),
        String(currentSampleDict["Cu"]),
        String(currentSampleDict["Fe"]),
        String(currentSampleDict["Mn"]),
        String(currentSampleDict["Mo"]),
        String(currentSampleDict["Na"]),
        String(currentSampleDict["Ni"]),
        String(currentSampleDict["Pb"]),
        String(currentSampleDict["Se"]),
        String(currentSampleDict["Si"]),
        String(currentSampleDict["Sr"]),
        String(currentSampleDict["Ti"]),
        String(currentSampleDict["V"]),
        String(currentSampleDict["Zn"]),
        String(currentSampleDict["Cl"]),
        String(currentSampleDict["Br"]),
        String(currentSampleDict["Rb"]),
        String(currentSampleDict["Cu_Zn"]),
        String(currentSampleDict["Fe_Ti"]),
        String(currentSampleDict["F"])
      ])
  }
  console.log(typeof(myList))
  console.log(myList.constructor===Array)
  console.log(myList);
  return myList
}

function renderSidePanel(activeSiteData) {

  if (activeSiteData.length === 0) {
    return
  }

  var myList = [];
  var allEAData = activeSiteData.EAData;


  var siteIDToIndex = {};
  for (let i = 0; i < allEAData.length; i++) {
    var siteSampleNumber = parseFloat(allEAData[i].Sample);
    siteIDToIndex[siteSampleNumber] = i;
  }



  var sortedSiteIndexDict = Object.keys(siteIDToIndex);

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
          <Collapsible trigger='View Data'>
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
          <h4>Site Description:</h4>
      </div>
      <div class="description-body">
        {siteData.DetailedLocalityData}<br/>
        {siteData.USNF_NRA_NP}, {siteData.WildernessArea}<br/>
        {siteData.County}, {siteData.State}, {siteData.Country}<br/>
        Lat/Long: ({siteData.Lat},{siteData.Lng})<br/>
        Elevation (meters): {siteData.Elevation}<br/>
        Collection date: {siteData.CollectionDate}

        {/* Country: {siteData.Country};
        State: {siteData.State};
        County: {siteData.County};
        Collection Data: {siteData.CollectionDate}
        <br/>
        USNF/NRA/NP: {siteData.USNF_NRA_NP};
        Wilderness Area/unit: {siteData.WildernessArea}
        <br/>
        Detailed Locality Data: {siteData.DetailedLocalityData}.
        <br/>
        Latitude: {siteData.Lat};
        Longitude: {siteData.Lng};
        Elevation (meters): {siteData.Elevation} */}
        <br/>
      </div>
    </div>
  );
  return endHTML;

}


export {MoreInfoRender}


function getSiteData(siteCode) {
  return fetch(`${SERVER_ROOT}/dev/sites/${siteCode}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}


