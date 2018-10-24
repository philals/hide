import geolib from 'geolib';
import React from "react";
import { geolocated } from "react-geolocated";
import { addUrlProps, UrlQueryParamTypes } from "react-url-query";
import history from "./history";
import MyMap from "./MyMap";

class MapState extends React.Component {
  state = {
    finderMode: false
  };

  constructor(props) {
    super(props);

    if (props.hiddenItemLat) {
      this.state.finderMode = true;
    }
  }

  updateLocationOfHiddenItem(latLng) {
    // const newState = update (this.state, {
    //   locationOfHiddenItem: {$set: latLng},
    // });

    // this.setState (newState);

    let newUrl = `/?hiddenItemLat=${latLng.lat}&hiddenItemLng=${latLng.lng}`;
    history.push(newUrl, { some: "state" });
  }

  render() {
    if (!this.props.isGeolocationAvailable) {
      return <div>Your browser does not support Geolocation</div>;
    }

    if (!this.props.isGeolocationEnabled) {
      return <div>Geolocation is not enabled</div>;
    }

    return (
      <div>
        {this.props.coords ? (
          <div>
            <MyMap
              finderMode={this.state.finderMode}
              currentLocation={{
                lat: this.props.coords.latitude,
                lng: this.props.coords.longitude
              }}
              updateLocationOfHiddenItem={this.updateLocationOfHiddenItem.bind(
                this
              )}
            />

            {this.state.finderMode ? <p data-test-id="distance-helper">Distance to hidden item: {
              geolib.getDistance({
                latitude: this.props.coords.latitude,
                longitude: this.props.coords.longitude
              }, {
                  longitude: this.props.hiddenItemLng,
                  latitude: this.props.hiddenItemLat
                }, 1, 0)} m</p> : null}
          </div>
        ) : (
            <div>Getting the location data&hellip;</div>
          )}
      </div>
    );
  }
}

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 */
const urlPropsQueryConfig = {
  hiddenItemLng: { type: UrlQueryParamTypes.number },
  hiddenItemLat: { type: UrlQueryParamTypes.number }
};

let located = geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  watchPosition: true,
  userDecisionTimeout: 15000
})(MapState);

export default addUrlProps({ urlPropsQueryConfig })(located);
// export default located;
