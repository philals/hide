import { fireEvent } from "react-testing-library";
import "react-testing-library/cleanup-after-each";
import history from "../history";
import { renderWithLocation } from "../__test_util__/renderWithLocation";

jest.mock("../history.js");

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
  test("display a marker", () => {
    const { getByTitle } = renderWithLocation();

    getByTitle("Your location");
  });

  describe("when hiding something", () => {
    test("saves the state of the game", () => {
      const { getByText } = renderWithLocation();

      fireEvent.click(getByText("Hide something"));

      expect(history.push).toBeCalledWith(
        `/?hiddenItemLat=${10}&hiddenItemLng=${10}`,
        {
          some: "state"
        }
      );
    });
  });
});
