import geolib from 'geolib';
import React from "react";
import { addUrlProps, UrlQueryParamTypes } from "react-url-query";
import history from "./history";
import MyMap from "./MyMap";

class MapState extends React.Component {
  state = {
    finderMode: false,
    newItemToHideLatLng: null
  };

  constructor(props) {
    super(props);

    if (props.hiddenItemLat) {
      this.state.finderMode = true;
    }

    this.state.newItemToHideLatLng = {
      lat: props.coords.latitude,
      lng: props.coords.longitude
    }
  }

  updateLocationOfHiddenItem(latLng) {
    this.setState({
      finderMode: this.state.finderMode,
      newItemToHideLatLng: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    })
  }

  hideItem() {
    let newUrl = `/?hiddenItemLat=${this.state.newItemToHideLatLng.lat}&hiddenItemLng=${this.state.newItemToHideLatLng.lng}`;
    history.push(newUrl, { some: "state" });
  }

  render() {
    return (
      <div>
        {this.state.finderMode ? <p data-test-id="distance-helper">Distance to hidden item: {
          geolib.getDistance({
            latitude: this.props.coords.latitude,
            longitude: this.props.coords.longitude
          }, {
              longitude: this.props.hiddenItemLng,
              latitude: this.props.hiddenItemLat
            }, 1, 0)} m</p> : <button onClick={this.hideItem.bind(this)}>Hide something</button>}
        <MyMap
          finderMode={this.state.finderMode}
          currentLocation={{
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
          }}
          newItemToHideLatLng={this.state.newItemToHideLatLng}
          updateLocationOfHiddenItem={this.updateLocationOfHiddenItem.bind(
            this
          )}
        />
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

export default addUrlProps({ urlPropsQueryConfig })(MapState);
// export default located;
