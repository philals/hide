import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import Map from '../Map';


describe('Map will', () => {
   test('display a marker', () => {

      const data = [{ latLng: { lat: 49.8419, lng: 24.0315 }, alt: "Your location" }]

      const { getByAltText } = render(<Map markersData={data} />)

      getByAltText('Your location');
   })
})


