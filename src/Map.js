import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
//import { Redirect } from "react-router-dom";
import InfoWindowEx from "./InfoWindowEx"
//import { BrowserRouter as Router, Link} from 'react-router-dom';
//import Route from 'react-router-dom/Route';
//import { MoreInfoRender } from './MoreInfo';
import { Container, Row, Col } from 'reactstrap';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

let mapStyles = {
  width: '725px',
  height:'425px'
};

const SERVER_ROOT = 'https://mne5wp8j5m.execute-api.us-west-2.amazonaws.com';

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedLocation: {},
      moreInfoRedirect: false,
      element: 'None',
      elementContainer: document.getElementById('elements'),
      elementList: ["Ca", "K", "Mg", "N", "P", "S", "Al", "As", "B", "Ba", "Cd",
       "Co", "Cr", "Cu", "Fe", "Mn", "Mo", "Na", "Ni", "Pb", "Se", "Si", "Sr",
       "Ti", "V", "Zn", "Cl", "Br", "Rb", "Cu.Zn", "Fe.Ti", "F"],

    }
    this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    getSiteCoordinates().then(json => {
      const coords = json.data;

      const newCoords = coords.map(coord => ({ SiteCode: coord.SiteCode, latitude: coord.Lat, longitude: coord.Lng }));

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

  // Don't need this in the end. Can just update map with handleChange()
  handleSubmit(event) {
    alert(`You are choosing the element ${this.state.element}.`);
  }

  //need to change this for our stuff
  onMarkerClick = (props, marker, e) => this.setState({
    selectedLocation: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

  //need to change this for our stuff
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        moreInfoUrl: null
      });
    }
  };

  displayMarkers = () => {
    return this.state.locations.map((locations, index) => {
      return <Marker key={index} id={index} position={{
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

  render() {

    // if (this.state.moreInfoRedirect) {
    //   return (
    //   //   <Router>
    //   //     <Route path="/" exact></Route>
    //   //     <Route path="/moreinfo" exact component={MoreInfoRender}/>
    //   //     <Redirect push to="/moreinfo" />
    //   //   </Router>
    //
    //
    //
    //   );
    // }


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
                        <button type="button" onClick={this.handleMoreInfoClick}>More Info</button>
                      </div>
                    </InfoWindowEx>
                  </Map>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="filter-container" style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}>

                <Dropdown options={this.state.elementList} onChange={this._onSelect} value={this.state.elementList[0]} dropup placeholder="Select an element"  />

              </div>
            </div>
          </div>

          <div class="column" id="sidebar">
            <div class="row">
              <div class="element-container">
                <Container align="center">
                  <Row>
                    <Col>
                        <h1>Select Element</h1>
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
                          <input type="radio" value="Ca" checked={this.state.element === "Ca"} onChange={this.handleChange} />
                        Ca%
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="K" checked={this.state.element === "K"} onChange={this.handleChange}/>
                        K%
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Mg" checked={this.state.element === "Mg"} onChange={this.handleChange}/>
                        Mg%
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="N" checked={this.state.element === "N"} onChange={this.handleChange}/>
                        N%
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="P" checked={this.state.element === "P"} onChange={this.handleChange}/>
                        P%
                        </label>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <label>
                          <input type="radio" value="S" checked={this.state.element === "S"} onChange={this.handleChange}/>
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
                        CuZn
                        </label>
                      </Row>
                      <Row>
                        <label>
                          <input type="radio" value="Fe.Ti" checked={this.state.element === "Fe.Ti"} onChange={this.handleChange}/>
                        FeTi
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
                    margin: 25,
                  }}
                  >
                    <button>
                      Download Filtered Data as csv
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
