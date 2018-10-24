import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../../__test_util__/renderWithLocation";

jest.mock("../../history.js");

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
        hiddenItemLat: 10.32,
        hiddenItemLng: 10.45
      };
      return component;
    };
  },
  UrlQueryParamTypes: { number: "mocked" }
}));

describe("while location is loaded", () => {
  test("it displays your location marker", () => {
    const { getByTitle } = renderWithLocation();

    getByTitle("Your location");
  });

  describe("when something is hidden", () => {
    test("it does not display hidden item marker", () => {
      const { queryByTestId } = renderWithLocation();

      expect(queryByTestId("hidden-item")).toBeNull();
    });
  });
});
