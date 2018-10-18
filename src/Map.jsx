import L from 'leaflet';
import React from 'react';

const style = {
  width: '100%',
  height: '300px',
};

class Map extends React.Component {
  state = {
    markers: [],
  };

  componentDidMount () {
    // create map
    this.map = L.map ('map', {
      center: [this.props.currentLocation.lat, this.props.currentLocation.lng],
      zoom: 1,
      layers: [
        L.tileLayer ('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });

    // add layer
    this.layer = L.layerGroup ().addTo (this.map);
    this.addCurrentLocationMarker (this.props.currentLocation);
  }

  componentDidUpdate (props) {
    this.updateMarkers ();
  }

  addCurrentLocationMarker (marker) {
    this.setState ({
      markers: [
        L.marker (marker, {
          title: 'Your location',
          alt: 'Your location',
        }),
      ],
    });
  }

  updateMarkers () {
    this.layer.clearLayers ();
    this.state.markers.forEach (marker => {
      marker.addTo (this.layer);
    });
  }

  render () {
    return <div id="map" style={style} />;
  }
}

export default Map;
