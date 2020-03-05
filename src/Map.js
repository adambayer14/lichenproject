import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Redirect } from "react-router-dom";
import InfoWindowEx from "./InfoWindowEx"
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { MoreInfoRender } from './MoreInfo';
import { Container, Row, Col } from 'reactstrap';

let mapStyles = {
  width: '600px',
  height:'400px'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: getListCoordinates(),
      showingInfoWindow: false,
      activeMarker: {},
      selectedLocation: {},
      moreInfoRedirect: false,

    }
    this.handleMoreInfoClick = this.handleMoreInfoClick.bind(this);
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
     name={locations.latitude}
     />
    })
  }

  handleMoreInfoClick() {
    //alert(`You are leaving.`);
    //window.location.reload();
    this.setState({moreInfoRedirect: true});
    window.open('/moreinfo');
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
              <div class="filter-container">
                Filters
              </div>
            </div>
          </div>

          <div class="column" id="sidebar">
            <div class="row">
              <div class="element-container">
              <Container>
                <Row>
                  <Col>
                      <h1>Select Element</h1>
                  </Col>
                </Row>
                <Row>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="None" checked={this.state.element === "None"} onChange={this.handleChange}/>
                      None
                      </label>
                      <label>
                        <input type="radio" value="Ca" checked={this.state.element === "Ca"} onChange={this.handleChange} />
                      Ca%
                      </label>
                      <label>
                        <input type="radio" value="K" checked={this.state.element === "K"} onChange={this.handleChange}/>
                      K%
                      </label>
                      <label>
                        <input type="radio" value="Mg" checked={this.state.element === "Mg"} onChange={this.handleChange}/>
                      Mg%
                      </label>
                      <label>
                        <input type="radio" value="N" checked={this.state.element === "N"} onChange={this.handleChange}/>
                      N%
                      </label>
                      <label>
                        <input type="radio" value="P" checked={this.state.element === "P"} onChange={this.handleChange}/>
                      P%
                      </label>
                    </Col>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="S" checked={this.state.element === "S"} onChange={this.handleChange}/>
                      S
                      </label>
                      <label>
                        <input type="radio" value="Al" checked={this.state.element === "Al"} onChange={this.handleChange}/>
                      Al
                      </label>
                      <label>
                        <input type="radio" value="As" checked={this.state.element === "As"} onChange={this.handleChange}/>
                      As
                      </label>
                      <label>
                        <input type="radio" value="B" checked={this.state.element === "B"} onChange={this.handleChange}/>
                      B
                      </label>
                      <label>
                        <input type="radio" value="Ba" checked={this.state.element === "Ba"} onChange={this.handleChange}/>
                      Ba
                      </label>
                      <label>
                        <input type="radio" value="Cd" checked={this.state.element === "Cd"} onChange={this.handleChange}/>
                      Cd
                      </label>
                    </Col>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="Co" checked={this.state.element === "Co"} onChange={this.handleChange}/>
                      Co
                      </label>
                      <label>
                        <input type="radio" value="Cr" checked={this.state.element === "Cr"} onChange={this.handleChange}/>
                      Cr
                      </label>
                      <label>
                        <input type="radio" value="Cu" checked={this.state.element === "Cu"} onChange={this.handleChange}/>
                      Cu
                      </label>
                      <label>
                        <input type="radio" value="Fe" checked={this.state.element === "Fe"} onChange={this.handleChange}/>
                      Fe
                      </label>
                      <label>
                        <input type="radio" value="Mn" checked={this.state.element === "Mn"} onChange={this.handleChange}/>
                      Mn
                      </label>
                      <label>
                        <input type="radio" value="Mo" checked={this.state.element === "Mo"} onChange={this.handleChange}/>
                      Mo
                      </label>
                    </Col>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="Na" checked={this.state.element === "Na"} onChange={this.handleChange}/>
                      Na
                      </label>
                      <label>
                        <input type="radio" value="Ni" checked={this.state.element === "Ni"} onChange={this.handleChange}/>
                      Ni
                      </label>
                      <label>
                        <input type="radio" value="Pb" checked={this.state.element === "Pb"} onChange={this.handleChange}/>
                      Pb
                      </label>
                      <label>
                        <input type="radio" value="Se" checked={this.state.element === "Se"} onChange={this.handleChange}/>
                      Se
                      </label>
                      <label>
                        <input type="radio" value="Si" checked={this.state.element === "Si"} onChange={this.handleChange}/>
                      Si
                      </label>
                      <label>
                        <input type="radio" value="Sr" checked={this.state.element === "Sr"} onChange={this.handleChange}/>
                      Sr
                      </label>
                    </Col>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="Ti" checked={this.state.element === "Ti"} onChange={this.handleChange}/>
                      Ti
                      </label>
                      <label>
                        <input type="radio" value="V" checked={this.state.element === "V"} onChange={this.handleChange}/>
                      V
                      </label>
                      <label>
                        <input type="radio" value="Zn" checked={this.state.element === "Zn"} onChange={this.handleChange}/>
                      Zn
                      </label>
                      <label>
                        <input type="radio" value="Cl" checked={this.state.element === "Cl"} onChange={this.handleChange}/>
                      Cl
                      </label>
                      <label>
                        <input type="radio" value="Br" checked={this.state.element === "Br"} onChange={this.handleChange}/>
                      Br
                      </label>
                      <label>
                        <input type="radio" value="Rb" checked={this.state.element === "Rb"} onChange={this.handleChange}/>
                      Rb
                      </label>
                    </Col>
                    <Col xs='2'>
                      <label>
                        <input type="radio" value="Cu.Zn" checked={this.state.element === "Cu.Zn"} onChange={this.handleChange}/>
                      CuZn
                      </label>
                      <label>
                        <input type="radio" value="Fe.Ti" checked={this.state.element === "Fe.Ti"} onChange={this.handleChange}/>
                      FeTi
                      </label>
                      <label>
                        <input type="radio" value="F" checked={this.state.element === "F"} onChange={this.handleChange}/>
                      F
                      </label>
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
                Download
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
}

function getListCoordinates() {
  var listCoords = [{latitude: 40.44035,	longitude: -111.7203},
      {latitude: 40.05128,	longitude: -111.5377},
      {latitude: 40.51708, longitude: -111.661},
      {latitude: 39.90448, longitude: -111.7343},
      {latitude: 40.18558,	longitude: -111.5654},
      {latitude: 40.26498,	longitude: -111.6207},
      {latitude: 39.80445,	longitude: -111.6944},
      {latitude: 40.48597,	longitude: -111.7057},
      {latitude: 40.10977,	longitude: -111.4343},
      {latitude: 40.3294,	longitude: -111.5293},
      {latitude: 40.26498,	longitude: -111.6207},
      {latitude: 39.75353,	longitude: -111.8163},
      {latitude: 40.3294,	longitude: -111.5293},
      {latitude: 40.18558,	longitude: -111.5654}
      ]
  return listCoords
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBI1RiUMsjw1UhbRc8wKWUt7VphFjvyNkA'
})(MapContainer);


// Map Code Ends Here
