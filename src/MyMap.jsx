import { divIcon } from "leaflet";
import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
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
    const iconMarkup = renderToStaticMarkup(
      <span className="fa fa-compass fa-2x" title="Your location" />
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup
    });

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
            position={[
              this.props.currentLocation.lat,
              this.props.currentLocation.lng
            ]}
            title="Your location"
            alt="Your location"
            draggable={false}
            icon={customMarkerIcon}
          />

          <Marker
            onMoveend={this.hiddenItemMoved.bind(this)}
            position={[
              this.state.hiddenItemLatLng.lat,
              this.state.hiddenItemLatLng.lng
            ]}
            draggable={true}
          />
        </Map>

        <button onClick={this.hideItem.bind(this)}>Hide something</button>
        <br />
      </div>
    );
  }
}
