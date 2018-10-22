import "react-testing-library/cleanup-after-each";
import { renderWithLocation } from "../__test_util__/renderWithLocation";

jest.mock("../history.js");

jest.mock("react-geolocated", conf => ({
  geolocated: () => component => {
    component.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: false
    };
    return component;
  }
}));

describe("while location is disabled", () => {
  test("display error message", () => {
    const { getByText } = renderWithLocation();

    getByText("Geolocation is not enabled");
  });
});
