import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Redirect } from "react-router-dom";
import InfoWindowEx from "./InfoWindowEx"
import { BrowserRouter as Router, Link} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import { MoreInfoRender } from './MoreInfo';

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
