import React from 'react';
import {geolocated} from 'react-geolocated';
import history from './history';
import Map from './Map';

export class MapState extends React.Component {
  // state = {
  //   locationOfHiddenItem: null,
  // };

  updateLocationOfHiddenItem (latLng) {
    // const newState = update (this.state, {
    //   locationOfHiddenItem: {$set: latLng},
    // });

    // this.setState (newState);

    let newUrl = `/?hiddenItemLat=${latLng.lat}&hiddenItemLng=${latLng.lng}`;
    history.push (newUrl, {some: 'state'});
  }

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
                currentLocation={{
                  lat: this.props.coords.latitude,
                  lng: this.props.coords.longitude,
                }}
                updateLocationOfHiddenItem={this.updateLocationOfHiddenItem.bind (
                  this
                )}
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
}) (MapState);
