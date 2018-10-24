import { divIcon } from "leaflet";
import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Map, Marker, TileLayer } from "react-leaflet";

export default class MyMap extends Component {
  state = {
    newItemToHideLatLng: null,
    markers: []
  };

  constructor(props) {
    super(props);
    this.state.newItemToHideLatLng = {
      lat: this.props.currentLocation.lat,
      lng: this.props.currentLocation.lng
    };
  }

  hideItem() {
    this.props.updateLocationOfHiddenItem(this.state.newItemToHideLatLng);
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
          {!this.props.finderMode ? (
            <Marker
              position={[
                this.state.newItemToHideLatLng.lat,
                this.state.newItemToHideLatLng.lng
              ]}
              alt={"Hidden Item"}
              data-testid={"hidden-item"}
              draggable={true}
            />
          ) : <button
            data-testid={"hide-button"}
            onClick={this.hideItem.bind(this)}
          >
              Hide something
        </button>}
        </Map>
        {!this.props.finderMode ? (
          null
        ) : null}
        <br />
      </div>
    );
  }
}
