import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../__test_util__/renderWithLocation";

jest.mock("react-geolocated", conf => ({
  geolocated: () => component => {
    component.defaultProps = {
      isGeolocationAvailable: false,
      isGeolocationEnabled: true
    };
    return component;
  }
}));

describe("Map will", () => {
  describe("while location is unavaliable", () => {
    test("display error message", () => {
      const { getByText } = renderWithLocation();

      getByText("Your browser does not support Geolocation");
    });
  });
});
