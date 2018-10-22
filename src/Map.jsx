import L from "leaflet";
import React from "react";

const style = {
  width: "100%",
  height: "300px"
};

class Map extends React.Component {
  state = {
    currentLocationMarker: null,
    markers: []
  };

  componentDidMount() {
    // create map
    this.map = L.map("map", {
      center: [this.props.currentLocation.lat, this.props.currentLocation.lng],
      zoom: 1,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        })
      ]
    });

    // add layer
    this.layer = L.layerGroup().addTo(this.map);
    this.addCurrentLocationMarker(this.map.getCenter());

    // this.map.on(
    //   "move",
    //   function() {
    //     this.addCurrentLocationMarker(this.map.getCenter());
    //   }.bind(this)
    // );
  }

  componentDidUpdate(props) {
    this.updateMarkers();
  }

  addCurrentLocationMarker(latLng) {
    this.setState({
      currentLocationMarker: L.marker(latLng, {
        title: "Your location",
        alt: "Your location"
        // draggable: true,
      })
    });
  }

  updateMarkers() {
    this.layer.clearLayers();
    this.state.markers.forEach(marker => {
      marker.addTo(this.layer);
    });
    this.state.currentLocationMarker.addTo(this.layer);
  }

  clicky() {
    this.props.updateLocationOfHiddenItem(
      this.state.currentLocationMarker.getLatLng()
    );
  }

  render() {
    return (
      <div>
        <div id="map" style={style} />
        <button onClick={this.clicky.bind(this)}>Hide something</button>
      </div>
    );
  }
}

export default Map;
