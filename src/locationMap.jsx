import React from 'react';
import {geolocated} from 'react-geolocated';
import Map from './Map';

export class LocationMap extends React.Component {
  render () {
    if (!this.props.isGeolocationAvailable) {
      return <div>Your browser does not support Geolocation</div>;
    }

    if (!this.props.isGeolocationEnabled) {
      return <div>Geolocation is not enabled</div>;
    }

    return (
      <div>

        {this.props.coords
          ? <div>
              <Map
                markersData={[
                  {
                    latLng: {
                      lat: this.props.coords.latitude,
                      lng: this.props.coords.longitude,
                    },
                    alt: 'Your location',
                  },
                ]}
              />
              <table>
                <tbody>
                  <tr>
                    <td>latitude</td>
                    <td>{this.props.coords.latitude}</td>
                  </tr>
                  <tr>
                    <td>longitude</td>
                    <td>{this.props.coords.longitude}</td>
                  </tr>
                  <tr>
                    <td>altitude</td>
                    <td>{this.props.coords.altitude}</td>
                  </tr>
                  <tr>
                    <td>heading</td><td>{this.props.coords.heading}</td>
                  </tr>
                  <tr>
                    <td>speed</td><td>{this.props.coords.speed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          : <div>Getting the location data&hellip;</div>}
      </div>
    );
  }
}

export default geolocated ({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 15000,
}) (LocationMap);
