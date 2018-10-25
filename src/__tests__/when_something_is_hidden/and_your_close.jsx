import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../../__test_util__/renderWithLocation";

jest.mock("react-geolocated", () => {
  return {
    geolocated: function(conf) {
      return function(component) {
        component.defaultProps = {
          ...component.defaultProps,
          isGeolocationAvailable: true,
          isGeolocationEnabled: true,
          coords: {
            accuracy: 130,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 10,
            longitude: 10,
            speed: null
          }
        };
        return component;
      };
    }
  };
});

jest.mock("react-url-query", () => ({
  addUrlProps: function(conf) {
    return function(component) {
      component.defaultProps = {
        ...component.defaultProps,
        hiddenItemLat: "21", // Encrypted and encoded value
        hiddenItemLng: "21"
      };
      return component;
    };
  },
  UrlQueryParamTypes: { number: "mocked" }
}));

describe("when something is hidden", () => {
  test("and your really close", () => {
    const { getByText } = renderWithLocation();

    getByText("Well done. You should be there!");
  });
});
