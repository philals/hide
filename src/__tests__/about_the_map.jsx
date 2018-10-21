import React from 'react';
import {fireEvent, render} from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import history from '../history';
import MapState from '../MapState';

jest.mock ('../history.js');

jest.mock ('react-geolocated', conf => ({
  geolocated: () => component => {
    component.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
    };
    return component;
  },
}));

describe ('Map will', () => {
  describe ('while location is unavaliable', () => {
    test ('display error message', () => {
      const {getByText} = renderWithLocation (null, null, false, false);

      getByText ('Your browser does not support Geolocation');
    });
  });

  describe ('while location is disabled', () => {
    test ('display error message', () => {
      const {getByText} = renderWithLocation (null, null, true, false);

      getByText ('Geolocation is not enabled');
    });
  });

  describe ('while location is loading', () => {
    test ('display a loading message', () => {
      const {getByText} = renderWithLocation (null, null, true, true);

      getByText ('Getting the location data…');
    });
  });

  describe.only ('while location is loaded', () => {
    test ('display a marker', () => {
      const {getByAltText} = renderWithLocation (10, 10);

      getByAltText ('Your location');
    });
  });

  describe ('when hiding something', () => {
    test ('saves the state of the game', () => {
      const {getByText} = renderWithLocation (10, 10);

      fireEvent.click (getByText ('Hide something'));

      expect (
        history.push
      ).toBeCalledWith (`/?hiddenItemLat=${10}&hiddenItemLng=${10}`, {
        some: 'state',
      });
    });
  });
});

function renderWithLocation (
  long,
  lat,
  isGeolocationAvailable = true,
  isGeolocationEnabled = true
) {
  let geoProps = {
    coords: null,
    isGeolocationEnabled: isGeolocationEnabled,
    isGeolocationAvailable: isGeolocationAvailable,
    positionError: null,
  };

  if (long) {
    geoProps.coords = {
      accuracy: 130,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      latitude: long,
      longitude: lat,
      speed: null,
    };
  }

  return render (<MapState />);
}
