/* global google */

import canUseDOM from "can-use-dom";

import raf from "raf";

import {
  default as React,
  Component,
} from "react";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

import 'whatwg-fetch';

const containerStyle = {
  display: 'inline-block', 
  height: '250px',
  width: '250px',
  padding: '10px'
}

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation : 
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const RandomCity = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={12}
    center={props.center}
  >

    <Marker
      position={props.center}
      title={props.name}
    />
    <h1>{props.name}</h1>
  </GoogleMap>
));

/*
 * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class RandomCityMap extends Component {

  state = {
    center: null,
    name: null
  };


  isUnmounted = false;

  componentDidMount() {
  console.log(this)
	  
    fetch('/api/randomcity')
      .then((response) => {
	      console.log(response) 
        return response.json()
      })
      .then((city) => {
        this.setState({
          center: {
            lat: city.lat,
            lng: city.lon,
          },
          name: city.city,
        })
      })
      .catch((err) => {
        console.log(err);
      });

    // geolocation.getCurrentPosition((position) => {
    //   if (this.isUnmounted) {
    //     return;
    //   }
    //   this.setState({
    //     center: {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     }
    //   });

    // }, (reason) => {
    //   if (this.isUnmounted) {
    //     return;
    //   }
    //   this.setState({
    //     center: {
    //       lat: 60,
    //       lng: 105,
    //     }
    //   });
    // });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    return (
		    
		    
	<div>

        <RandomCity
          containerElement={
            <div style={containerStyle} />
          }
          mapElement={
            <div style={{ height: `250px`, width: `250px` }} />
          }
          center={this.state.center}
          name={this.state.name}
	  onClick={this.props.sup}
        >
        </RandomCity>
	</div>

    );
  }
}
