import React from "react";
import { geolocated } from "react-geolocated";
import MapState from './MapState';

class LocationState extends React.Component {
   render() {
      if (!this.props.isGeolocationAvailable) {
         return <div>Your browser does not support Geolocation</div>;
      }

      if (!this.props.isGeolocationEnabled) {
         return <div>Geolocation is not enabled</div>;
      }

      if (!this.props.coords) {
         return <div>Getting the location data&hellip;</div>;
      }

      return (
         <MapState coords={this.props.coords} />
      );
   }
}


export default geolocated({
   positionOptions: {
      enableHighAccuracy: false
   },
   watchPosition: true,
   userDecisionTimeout: 15000
})(LocationState);