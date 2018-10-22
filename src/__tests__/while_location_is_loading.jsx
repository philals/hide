import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../__test_util__/renderWithLocation";

jest.mock("../history.js");

jest.mock("react-geolocated", conf => ({
  geolocated: () => component => {
    component.defaultProps = {
      coords: null,
      isGeolocationAvailable: true,
      isGeolocationEnabled: true
    };
    return component;
  }
}));

describe("while location is loading", () => {
  test("display a loading message", () => {
    const { getByText } = renderWithLocation();

    getByText("Getting the location data…");
  });
});
