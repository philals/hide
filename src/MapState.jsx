import { Grid, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import copy from "copy-to-clipboard";
import geolib from "geolib";
import React from "react";
import { addUrlProps, UrlQueryParamTypes } from "react-url-query";
import { decrypt, encrypt } from "./crypto";
import MyMap from "./MyMap";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class MapState extends React.Component {
  state = {
    finderMode: false,
    newItemToHideLatLng: null
  };

  constructor(props) {
    super(props);

    if (props.hiddenItemLat) {
      this.state.finderMode = true;
    }

    this.state.newItemToHideLatLng = {
      lat: props.coords.latitude,
      lng: props.coords.longitude
    };
  }

  updateLocationOfHiddenItem(latLng) {
    this.setState({
      finderMode: this.state.finderMode,
      newItemToHideLatLng: {
        lat: latLng.lat,
        lng: latLng.lng
      }
    });
  }

  hideItem() {
    let lat = encrypt(this.state.newItemToHideLatLng.lat);
    let lng = encrypt(this.state.newItemToHideLatLng.lng);

    let newUrl =
      window.location.href.substring(0, window.location.href.lastIndexOf("/")) +
      `/?hiddenItemLat=${lat}&hiddenItemLng=${lng}`;
    copy(newUrl);
  }

  render() {
    const { classes } = this.props;

    let distanceToGo = this.state.finderMode
      ? geolib.getDistance(
          {
            latitude: this.props.coords.latitude,

            longitude: this.props.coords.longitude
          },
          {
            longitude: decrypt(this.props.hiddenItemLng),
            latitude: decrypt(this.props.hiddenItemLat)
          },
          1,
          0
        )
      : 999999;

    let topMessage = this.state.finderMode
      ? `Something is hidden for you. It's ${distanceToGo}m away. Go find
      it!`
      : `Move the blue marker around to the location you would like to
      hide something.`;

    if (distanceToGo < 10) {
      topMessage = "Well done. You should be there!";
    }

    return (
      <div>
        <Grid container justify="center">
          <Typography variant="h5" gutterBottom>
            {topMessage}
          </Typography>
          <br />
          {!this.state.finderMode ? (
            <Button
              variant="outlined"
              className={classes.button}
              color="primary"
              onClick={this.hideItem.bind(this)}
            >
              Then click here to copy this link and send to a friend
            </Button>
          ) : null}
        </Grid>
        <MyMap
          finderMode={this.state.finderMode}
          currentLocation={{
            lat: this.props.coords.latitude,
            lng: this.props.coords.longitude
          }}
          newItemToHideLatLng={this.state.newItemToHideLatLng}
          updateLocationOfHiddenItem={this.updateLocationOfHiddenItem.bind(
            this
          )}
        />
      </div>
    );
  }
}

/**
 * Specify how the URL gets decoded here. This is an object that takes the prop
 * name as a key, and a query param specifier as the value. The query param
 * specifier can have a `type`, indicating how to decode the value from the
 * URL, and a `queryParam` field that indicates which key in the query
 * parameters should be read (this defaults to the prop name if not provided).
 */
const urlPropsQueryConfig = {
  hiddenItemLng: { type: UrlQueryParamTypes.string },
  hiddenItemLat: { type: UrlQueryParamTypes.string }
};

let st = withStyles(styles)(MapState);

export default addUrlProps({ urlPropsQueryConfig })(st);
// export default located;
