const geolocated = conf => ({
  geolocated: () => component => {
    component.defaultProps = {
      isGeolocationAvailable: true,
      isGeolocationEnabled: true,
    };
    return () => component;
  },
});

export {geolocated};
