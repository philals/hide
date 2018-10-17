import L from 'leaflet';
import React from 'react';

const style = {
  width: '100%',
  height: '300px',
};

class Map extends React.Component {
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

  // componentDidUpdate({markersData}) {
  //   // check if data has changed
  //   if (this.props.markersData !== markersData) {
  //     this.updateMarkers (this.props.markersData);
  //   }
  // }

  addCurrentLocationMarker (marker) {
    this.layer.clearLayers ();
    L.marker (marker, {
      title: 'Your location',
      alt: 'Your location',
    }).addTo (this.layer);
  }

  // updateMarkers (markersData) {
  //   // var myIcon = L.icon ({
  //   //   iconUrl: 'https://unpkg.com/leaflet@1.3.4/dist/images/marker-icon.png',
  //   //   // iconSize: [38, 95],
  //   //   // iconAnchor: [22, 94],
  //   //   // popupAnchor: [-3, -76],
  //   //   // // shadowUrl: 'my-icon-shadow.png',
  //   //   // shadowSize: [68, 95],
  //   //   // shadowAnchor: [22, 94],
  //   // });

  //   this.layer.clearLayers ();
  //   markersData.forEach (marker => {
  //     L.marker (marker.latLng, {
  //       title: marker.title,
  //       alt: marker.alt,
  //     }).addTo (this.layer);
  //   });
  // }

  render () {
    return <div id="map" style={style} />;
  }
}

export default Map;
