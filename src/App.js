import React, { Component } from 'react';
import './App.css';
import LocationDemo from './locationDemo';
import Map from './Map';

class App extends Component {
  state = {
    markersData: [
      { latLng: { lat: 49.8419, lng: 24.0315 }, alt: "Your location" }
    ]
  };

  render() {
    const { markersData } = this.state;
    return (
      <div>
        <Map markersData={markersData} />

        <ul>Markers data:
          {markersData.map(marker => (
            <li key={marker.title}>
              {marker.title},
              lat: {marker.latLng.lat},
              lng: {marker.latLng.lng},
            </li>
          ))}
        </ul>
        <LocationDemo />
      </div>
    );
  }
}

export default App;