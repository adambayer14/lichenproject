import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
//import { Redirect } from "react-router-dom";
import InfoWindowEx from "./InfoWindowEx"
//import { BrowserRouter as Router, Link} from 'react-router-dom';
//import Route from 'react-router-dom/Route';
//import { MoreInfoRender } from './MoreInfo';
import { Container, Row, Col } from 'reactstrap';
import Dropdown from 'react-bootstrap/Dropdown'



let mapStyles = {
  width: '725px',
  height:'425px'
};

let blueIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
}
let yellowIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
}
let redIcon = {
  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
}

const SERVER_ROOT = 'https://mne5wp8j5m.execute-api.us-west-2.amazonaws.com';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      showingInfoWindow: false,
      activeMarker: {},
      activeMarkerData: {},
      selectedLocation: {},
      moreInfoRedirect: false,
      element: 'None',
      elementContainer: document.getElementById('elements'),
      currentElementFilter: "None",
      currentSpeciesFilter: "None",
      minElement: '',
      maxElement: '',
      numSamples: '',
      blueMax: {"CaPERC": 2.455, "KPERC": .52, "MgPERC": .13,
        "NPERC": 1.46, "PPERC": .14, "SPERC": .129, "Al": 2100, "As": 3.2,
        "B": 14.15, "Ba": 70, "Cd": .795, "Co": 4.38, "Cr": 5.998, "Cu": 9.49,
        "Fe": 2581.5, "Mn": 113, "Mo": 1.07, "Na": 231.8, "Ni": 3.44,
        "Pb": 15.4, "Se": 1.93, "Si": 1890, "Sr": 45.347, "Ti": 229, "V": 8.3,
        "Zn": 53.98, "Cl": 1131.75, "Br": 12.2, "Rb": 15.5, "Cu.Zn": .222,
         "Fe.Ti": 16.21, "F": 160},
      yellowMax: {"CaPERC": 4.847, "KPERC": .833, "MgPERC": .213,
        "NPERC": 2.206, "PPERC": .233, "SPERC": .206, "Al": 4496, "As": 5.73,
        "B": 27, "Ba": 130, "Cd": 1.5, "Co": 10.74, "Cr": 10.44, "Cu": 21.34,
        "Fe": 5133, "Mn": 203, "Mo": 10.7, "Na": 459.5, "Ni": 6.54,
        "Pb": 31.3, "Se": 4.04, "Si": 6258, "Sr": 86.3, "Ti": 493, "V": 18.3,
        "Zn": 90.5, "Cl": 2314, "Br": 21.7, "Rb": 27.3, "Cu.Zn": 18.6,
         "Fe.Ti": 28.8, "F": 286},
    }
    this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  componentDidMount() {

    getSiteCoordinates().then(json => {
      const coords = json.data;

      const newCoords = coords.map(coord => ({ SiteCode: coord.SiteCode, latitude: coord.Lat, longitude: coord.Lng, iconColor: blueIcon }));

      this.setState({
        locations: newCoords
      });
    });
  }

  handleChange(event) {
    this.setState({
      element: event.target.value
    });
  }

  handleSubmit(event) {

    //Return all markers back to blue
    for (var i = 0; i < this.state.locations.length; i++) {
      this.state.locations[i]["iconColor"] = blueIcon;
    }

    if (this.state.element === "None") {
      setTimeout(function(){alert("Click on any map marker to apply gradient changes.")},1000);
      return;
    }

    for (var i = 0; i < this.state.locations.length; i++) {
      this.assignSiteColor(this.state.locations[i].SiteCode, i)
    }

    setTimeout(function(){alert("Click on any map marker to apply gradient changes.")},2000);
  }

  //Get each site data and assign new color
  async assignSiteColor(siteID, index) {
    getSiteData(siteID).then(json => {
      //We need to check why it's giving so many errors....
      if (typeof json === 'undefined') {
        return;
      }
      if (typeof json.data === 'undefined') {
        return;
      }
      if (typeof json.data.EAData === 'undefined') {
        return;
      }

      const eaData = json.data.EAData;

      if (eaData.length === 0) {
        return;
      }

      //Get index of highest sample
      var siteIDToIndex = {};
      for (let i = 0; i < eaData.length; i++) {
        var siteSampleNumber = parseFloat(eaData[i].Sample);
        siteIDToIndex[siteSampleNumber] = i;
      }

      var sortedSiteIndexDict = Object.keys(siteIDToIndex);

      var mostRecentSample;
      for (var i = 0; i < sortedSiteIndexDict.length; i++) {
        mostRecentSample = eaData[siteIDToIndex[sortedSiteIndexDict[i]]]
      }


      const currElementData = mostRecentSample[this.state.element]

      if (parseFloat(currElementData) < this.state.blueMax[this.state.element]) {
        this.state.locations[index]["iconColor"] = blueIcon;
      }
      else if (parseFloat(currElementData) > this.state.yellowMax[this.state.element]) {
        this.state.locations[index]["iconColor"] = redIcon;
        // console.log(siteID)
        // console.log(parseFloat(currElementData), this.state.yellowMax[this.state.element])
      }
      else {
        this.state.locations[index]["iconColor"] = yellowIcon;
      }
      return;
    });
    return;
  }


  //need to change this for our stuff
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedLocation: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
    getSiteData(this.state.selectedLocation.name).then(json => {
      const markerData = json.data;
      this.setState({activeMarkerData: markerData});
    });
  }

  //need to change this for our stuff
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        moreInfoUrl: null,
        activeMarkerData: {},
      });
    }
  };

  displayMarkers = () => {

    return this.state.locations.map((locations, index) => {
      var currentIconColor = locations.iconColor
      return <Marker key={index} id={index} icon={currentIconColor} position={{
       lat: locations.latitude,
       lng: locations.longitude
     }}
     onClick={this.onMarkerClick}
     name={locations.SiteCode}
     />
    })
  }

  handleMoreInfoClick() {
    //alert(`You are leaving.`);
    //window.location.reload();
    let moreInfoUrl = '/moreinfo/' + this.state.activeMarker.name
    this.setState({moreInfoRedirect: true});
    window.open(moreInfoUrl);
  }

  handleFilterClick() {
    //This will clear points on map
    //this.setState({locations: []});
    alert(`Filtering ${this.state.currentElementFilter}, ${this.state.currentSpeciesFilter}, ${this.state.numSamples} samples, and
      ${this.state.minElement} to ${this.state.maxElement}!`);
  }

  handleSelect(evt) {
    this.setState({
      currentElementFilter: evt
    });
  }

  handleSelectSpecies(evt) {
    this.setState({
      currentSpeciesFilter: evt
    });
  }

  handleMinChange(event) {
    this.setState({minElement: event.target.value})
  }
  handleMaxChange(event) {
    this.setState({maxElement: event.target.value})
  }
  handleSampleChange(event) {
    this.setState({numSamples: event.target.value})
  }


  render() {

    console.log(this.state.activeMarkerData)
    return (

      <div>
        <div class="header-container">
          <div class="header">
            Click on a point to investigate a sample site.
          </div>
        </div>

        <div class="main-content">
          <div class="column">
            <div class="row">
              <div class="map-container">
                <div class="map">
                  <Map
                    google={this.props.google}
                    zoom={8}
                    style={mapStyles}
                    initialCenter={{ lat: 40.44035, lng: -111.7203}}
                    >
                    {this.displayMarkers()}
                    <InfoWindowEx
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                    >
                      <div>
                        <p>{this.state.selectedLocation.name}</p>
                        <p>Collection Date: {this.state.activeMarkerData.CollectionDate}</p>
                        <p>USNF/NRA/NP: {this.state.activeMarkerData.USNF_NRA_NP}</p>
                        <button type="button" onClick={this.handleMoreInfoClick}>More Info</button>
                      </div>
                    </InfoWindowEx>
                  </Map>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="filter-container" align="center">
                <Row>
                  <Col>
                  <Dropdown drop="up">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Choose Species
                    </Dropdown.Toggle>
                    <Dropdown.Menu bsPrefix="dropdown-menu species_dropdown">
                      <Dropdown.Item eventKey="letharia" onSelect={this.handleSelectSpecies.bind(this)}>letharia</Dropdown.Item>
                      <Dropdown.Item eventKey="rhizoplaca" onSelect={this.handleSelectSpecies.bind(this)}>rhizoplaca</Dropdown.Item>
                      <Dropdown.Item eventKey="usnea" onSelect={this.handleSelectSpecies.bind(this)}>usnea</Dropdown.Item>
                      <Dropdown.Item eventKey="xanthomendoza" onSelect={this.handleSelectSpecies.bind(this)}>xanthomendoza</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>

                  <Dropdown drop="up">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Choose Element
                    </Dropdown.Toggle>
                    <Dropdown.Menu bsPrefix="dropdown-menu element_dropdown">
                      <Dropdown.Item eventKey="CaPERC" onSelect={this.handleSelect.bind(this)}>Ca</Dropdown.Item>
                      <Dropdown.Item eventKey="KPERC" onSelect={this.handleSelect.bind(this)}>K</Dropdown.Item>
                      <Dropdown.Item eventKey="MgPERC" onSelect={this.handleSelect.bind(this)}>Mg</Dropdown.Item>
                      <Dropdown.Item eventKey="NPERC" onSelect={this.handleSelect.bind(this)}>N</Dropdown.Item>
                      <Dropdown.Item eventKey="PPERC" onSelect={this.handleSelect.bind(this)}>P</Dropdown.Item>
                      <Dropdown.Item eventKey="SPERC" onSelect={this.handleSelect.bind(this)}>S</Dropdown.Item>
                      <Dropdown.Item eventKey="Al" onSelect={this.handleSelect.bind(this)}>Al</Dropdown.Item>
                      <Dropdown.Item eventKey="As" onSelect={this.handleSelect.bind(this)}>As</Dropdown.Item>
                      <Dropdown.Item eventKey="B" onSelect={this.handleSelect.bind(this)}>B</Dropdown.Item>
                      <Dropdown.Item eventKey="Ba" onSelect={this.handleSelect.bind(this)}>Ba</Dropdown.Item>
                      <Dropdown.Item eventKey="Cd" onSelect={this.handleSelect.bind(this)}>Cd</Dropdown.Item>
                      <Dropdown.Item eventKey="Co" onSelect={this.handleSelect.bind(this)}>Co</Dropdown.Item>
                      <Dropdown.Item eventKey="Cr" onSelect={this.handleSelect.bind(this)}>Cr</Dropdown.Item>
                      <Dropdown.Item eventKey="Cu" onSelect={this.handleSelect.bind(this)}>Cu</Dropdown.Item>
                      <Dropdown.Item eventKey="Fe" onSelect={this.handleSelect.bind(this)}>Fe</Dropdown.Item>
                      <Dropdown.Item eventKey="Mn" onSelect={this.handleSelect.bind(this)}>Mn</Dropdown.Item>
                      <Dropdown.Item eventKey="Mo" onSelect={this.handleSelect.bind(this)}>Mo</Dropdown.Item>
                      <Dropdown.Item eventKey="Na" onSelect={this.handleSelect.bind(this)}>Na</Dropdown.Item>
                      <Dropdown.Item eventKey="Ni" onSelect={this.handleSelect.bind(this)}>Ni</Dropdown.Item>
                      <Dropdown.Item eventKey="Pb" onSelect={this.handleSelect.bind(this)}>Pb</Dropdown.Item>
                      <Dropdown.Item eventKey="Se" onSelect={this.handleSelect.bind(this)}>Se</Dropdown.Item>
                      <Dropdown.Item eventKey="Si" onSelect={this.handleSelect.bind(this)}>Si</Dropdown.Item>
                      <Dropdown.Item eventKey="Sr" onSelect={this.handleSelect.bind(this)}>Sr</Dropdown.Item>
                      <Dropdown.Item eventKey="Ti" onSelect={this.handleSelect.bind(this)}>Ti</Dropdown.Item>
                      <Dropdown.Item eventKey="V" onSelect={this.handleSelect.bind(this)}>V</Dropdown.Item>
                      <Dropdown.Item eventKey="Zn" onSelect={this.handleSelect.bind(this)}>Zn</Dropdown.Item>
                      <Dropdown.Item eventKey="Cl" onSelect={this.handleSelect.bind(this)}>Cl</Dropdown.Item>
                      <Dropdown.Item eventKey="Br" onSelect={this.handleSelect.bind(this)}>Br</Dropdown.Item>
                      <Dropdown.Item eventKey="Rb" onSelect={this.handleSelect.bind(this)}>Rb</Dropdown.Item>
                      <Dropdown.Item eventKey="Cu.Zn" onSelect={this.handleSelect.bind(this)}>Cu.Zn</Dropdown.Item>
                      <Dropdown.Item eventKey="Fe.Ti" onSelect={this.handleSelect.bind(this)}>Fe.Ti</Dropdown.Item>
                      <Dropdown.Item eventKey="F" onSelect={this.handleSelect.bind(this)}>F</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  Number of Samples:
                  <input type="number" name="number" value={this.state.numSamples}
                    onChange={this.handleSampleChange.bind(this)}
                    style={{ width: "45px"}}/>
                  +
                </Col>

                </Row>
                <Row>
                  <Col class="text_background">
                    Species Filter: {this.state.currentSpeciesFilter}
                  </Col>
                  <Col>
                    Element Filter: {this.state.currentElementFilter}
                  </Col>
                  <Col>
                      Element range:
                      <input type="number" name="min" value={this.state.minElement}
                        onChange={this.handleMinChange.bind(this)}
                        style={{ width: "47px" }}/>
                      to
                      <input type="number" name="max" value={this.state.maxElement}
                        onChange={this.handleMaxChange.bind(this)}
                        style={{ width: "47px" }}/>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button onClick={this.handleFilterClick}>Apply Selected Filters</button>
                  </Col>
                </Row>


              </div>
            </div>
          </div>

          <div class="column" id="sidebar">
            <div class="row">
              <div class="element-container">
                <Container align="center">
                  <Row>
                    <Col>
                        <h1> Map Gradient </h1>
                        <p>Choose element to apply color gradient</p>
                    </Col>
                  </Row>
                  <Row class="element-row" style={{ margin: 10, }}>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="None" checked={this.state.element === "None"} onChange={this.handleChange}/>
                        None
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="CaPERC" checked={this.state.element === "CaPERC"} onChange={this.handleChange} />
                        Ca
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="KPERC" checked={this.state.element === "KPERC"} onChange={this.handleChange}/>
                        K
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="MgPERC" checked={this.state.element === "MgPERC"} onChange={this.handleChange}/>
                        Mg
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="NPERC" checked={this.state.element === "NPERC"} onChange={this.handleChange}/>
                        N
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="PPERC" checked={this.state.element === "PPERC"} onChange={this.handleChange}/>
                        P
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="SPERC" checked={this.state.element === "SPERC"} onChange={this.handleChange}/>
                        S
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Al" checked={this.state.element === "Al"} onChange={this.handleChange}/>
                        Al
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="As" checked={this.state.element === "As"} onChange={this.handleChange}/>
                        As
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="B" checked={this.state.element === "B"} onChange={this.handleChange}/>
                        B
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Ba" checked={this.state.element === "Ba"} onChange={this.handleChange}/>
                        Ba
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Cd" checked={this.state.element === "Cd"} onChange={this.handleChange}/>
                        Cd
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="Co" checked={this.state.element === "Co"} onChange={this.handleChange}/>
                        Co
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Cr" checked={this.state.element === "Cr"} onChange={this.handleChange}/>
                        Cr
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Cu" checked={this.state.element === "Cu"} onChange={this.handleChange}/>
                        Cu
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Fe" checked={this.state.element === "Fe"} onChange={this.handleChange}/>
                        Fe
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Mn" checked={this.state.element === "Mn"} onChange={this.handleChange}/>
                        Mn
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Mo" checked={this.state.element === "Mo"} onChange={this.handleChange}/>
                        Mo
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="Na" checked={this.state.element === "Na"} onChange={this.handleChange}/>
                        Na
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Ni" checked={this.state.element === "Ni"} onChange={this.handleChange}/>
                        Ni
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Pb" checked={this.state.element === "Pb"} onChange={this.handleChange}/>
                        Pb
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Se" checked={this.state.element === "Se"} onChange={this.handleChange}/>
                        Se
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Si" checked={this.state.element === "Si"} onChange={this.handleChange}/>
                        Si
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Sr" checked={this.state.element === "Sr"} onChange={this.handleChange}/>
                        Sr
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="Ti" checked={this.state.element === "Ti"} onChange={this.handleChange}/>
                          Ti
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="V" checked={this.state.element === "V"} onChange={this.handleChange}/>
                        V
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Zn" checked={this.state.element === "Zn"} onChange={this.handleChange}/>
                        Zn
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Cl" checked={this.state.element === "Cl"} onChange={this.handleChange}/>
                        Cl
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Br" checked={this.state.element === "Br"} onChange={this.handleChange}/>
                        Br
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Rb" checked={this.state.element === "Rb"} onChange={this.handleChange}/>
                        Rb
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="Cu.Zn" checked={this.state.element === "Cu.Zn"} onChange={this.handleChange}/>
                        Cu.Zn
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Fe.Ti" checked={this.state.element === "Fe.Ti"} onChange={this.handleChange}/>
                        Fe.Ti
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="F" checked={this.state.element === "F"} onChange={this.handleChange}/>
                        F
                        </label>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button onClick={this.handleSubmit}>Add Map Gradient</button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
            <div class="row">
              <div class="downloader-container">
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    lineHeight: 3,
                    margin: 45,
                  }}
                  >
                    <button>
                      Download Filtered Data
                    </button>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-container">
          <div class="footer">
            Color Gradient Key: Blue: low pollution, Yellow: moderate pollution, Red: high pollution
          </div>
        </div>

      </div>

    );
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyBI1RiUMsjw1UhbRc8wKWUt7VphFjvyNkA'
})(MapContainer);

function getSiteCoordinates() {
  return fetch(`${SERVER_ROOT}/dev/sites?LatLngOnly=true`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

function getAllData() {
  return fetch(`${SERVER_ROOT}/dev/sites`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

function getSiteData(siteCode) {
  return fetch(`${SERVER_ROOT}/dev/sites/${siteCode}`)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Map Code Ends Here
