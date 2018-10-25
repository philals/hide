import copy from "copy-to-clipboard";
import { fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../__test_util__/renderWithLocation";

jest.mock("copy-to-clipboard");

jest.mock("react-geolocated", conf => ({
  geolocated: () => component => {
    component.defaultProps = {
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
  }
}));

describe("while location is loaded", () => {
  test("it displays your location marker", () => {
    const { getByTitle } = renderWithLocation();

    getByTitle("Your location");
  });

  describe("when hiding something", () => {
    test("it displays your location marker", () => {
      const { getByAltText } = renderWithLocation();

      getByAltText("Hidden Item");
    });

    test("allows user to copy game url", () => {
      const { getByText } = renderWithLocation();

      fireEvent.click(getByText("Hide something, and copy this link to a friend"));

      expect(copy).toBeCalledWith(
        `http://localhost/?hiddenItemLat=10&hiddenItemLng=10`
      );
    });

  });
});
