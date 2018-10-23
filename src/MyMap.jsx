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

  hideItem() {
    this.props.updateLocationOfHiddenItem(this.state.hiddenItemLatLng);
  }

  mapMoved(what) {
    this.setState({
      hiddenItemLatLng: what.target.getCenter()
    });
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
          onMove={this.mapMoved.bind(this)}
          center={[
            this.props.currentLocation.lat,
            this.props.currentLocation.lng
          ]}
          zoom={13}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

          {/* //TODO: Offset this lcon */}
          <Marker
            position={[
              this.props.currentLocation.lat,
              this.props.currentLocation.lng
            ]}
            draggable={false}
            icon={customMarkerIcon}
          />

          <Marker
            position={[
              this.state.hiddenItemLatLng.lat,
              this.state.hiddenItemLatLng.lng
            ]}
            alt={"Hidden Item"}
            draggable={true}
          />
        </Map>

        <button onClick={this.hideItem.bind(this)}>Hide something</button>
        <br />
      </div>
    );
  }
}
