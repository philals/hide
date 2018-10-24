import { divIcon } from "leaflet";
import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Map, Marker, TileLayer } from "react-leaflet";

export default class MyMap extends Component {
  state = {
    markers: []
  };

  constructor(props) {
    super(props);
  }

  mapMoved(what) {
    this.props.updateLocationOfHiddenItem(what.target.getCenter())
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
                this.props.newItemToHideLatLng.lat,
                this.props.newItemToHideLatLng.lng
              ]}
              alt={"Hidden Item"}
              data-testid={"hidden-item"}
              draggable={false}
            />
          ) : null}
        </Map>
      </div>
    );
  }
}
