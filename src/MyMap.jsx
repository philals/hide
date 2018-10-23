import React, { Component } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";

export default class MyMap extends Component {
  state = {
    hiddenItemLatLng: null,
    markers: []
  };

  constructor(props) {
    super(props);
    this.state.hiddenItemLatLng = {
      lat: this.props.currentLocation.lat,
      lng: this.props.currentLocation.lng
    };
  }

  hiddenItemMoved(what) {
    this.setState({
      hiddenItemLatLng: what.target.getLatLng()
    });
  }

  hideItem() {
    this.props.updateLocationOfHiddenItem(this.state.hiddenItemLatLng);
  }

  render() {
    return (
      <div className="map-container">
        <Map
          center={[
            this.props.currentLocation.lat,
            this.props.currentLocation.lng
          ]}
          zoom={13}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          <Marker
            onMoveend={this.hiddenItemMoved.bind(this)}
            position={[
              this.state.hiddenItemLatLng.lat,
              this.state.hiddenItemLatLng.lng
            ]}
            title="Your location"
            alt="Your location"
            draggable={true}
          />
        </Map>

        <button onClick={this.hideItem.bind(this)}>Hide something</button>
        <br />
      </div>
    );
  }
}
