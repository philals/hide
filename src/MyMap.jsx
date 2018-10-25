import { divIcon } from "leaflet";
import React, { Component } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Map, Marker, TileLayer } from "react-leaflet";

export default class MyMap extends Component {
  state = {
    markers: [],
    center: null
  };

  constructor(props) {
    super(props);
    this.state.center = [
      this.props.currentLocation.lat,
      this.props.currentLocation.lng
    ];
  }

  mapMoved(what) {
    this.props.updateLocationOfHiddenItem(what.target.getCenter());
  }

  render() {
    const iconMarkup = renderToStaticMarkup(
      <span className="fa fa-compass fa-2x" title="Your location" />
    );
    const customMarkerIcon = divIcon({
      html: iconMarkup
    });

    let mapLink = '<a href="https://www.esri.com/">Esri</a>';
    let wholink =
      "i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community";

    return (
      <div className="map-container">
        <Map
          onMove={this.mapMoved.bind(this)}
          center={this.state.center}
          zoom={13}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution={"&copy; " + mapLink + ", " + wholink}
            // maxZoom={1}
          />

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
