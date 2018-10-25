import { LinearProgress, Typography } from "@material-ui/core";
import React from "react";
import { geolocated } from "react-geolocated";
import MapState from "./MapState";

class LocationState extends React.Component {
  render() {
    if (!this.props.isGeolocationAvailable) {
      return (
        <Typography component="h2" variant="h1" gutterBottom>
          Your browser does not support Geolocation
        </Typography>
      );
    }

    if (!this.props.isGeolocationEnabled) {
      return (
        <Typography component="h2" variant="h1" gutterBottom>
          Geolocation is not enabled
        </Typography>
      );
    }

    if (!this.props.coords) {
      return (
        <div>
          <LinearProgress />
          <Typography component="h2" variant="h1" gutterBottom>
            Getting your location data&hellip;
          </Typography>
        </div>
      );
    }

    return <MapState coords={this.props.coords} />;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  watchPosition: true,
  userDecisionTimeout: 15000
})(LocationState);
