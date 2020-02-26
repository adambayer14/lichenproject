import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '70%',
  height: '60%'
};

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [{lat: 40.44035,	lon: -111.7203},
      {lat: 40.05128,	lon: -111.5377},
      {lat: 40.51708, lon: -111.661},
      {lat: 39.90448, lon: -111.7343},
      {lat: 40.18558,	lon: -111.5654},
      {lat: 40.26498,	lon: -111.6207},
      {lat: 39.80445,	lon: -111.6944},
      {lat: 40.48597,	lon: -111.7057},
      {lat: 40.10977,	lon: -111.4343},
      {lat: 40.3294,	lon: -111.5293},
      {lat: 40.26498,	lon: -111.6207},
      {lat: 39.75353,	lon: -111.8163},
      {lat: 40.3294,	lon: -111.5293},
      {lat: 40.18558,	lon: -111.5654}
      ]
    }

  }


  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
       lat: store.latitude,
       lng: store.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 40.2338, lng: -111.6585 }}
      >

      {this.displayMarkers()}

    </Map>
    );
  }

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBI1RiUMsjw1UhbRc8wKWUt7VphFjvyNkA'
})(MapContainer);
