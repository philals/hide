import { withStyles } from "@material-ui/core/styles";
import React from "react";
import GitHubForkRibbon from 'react-github-fork-ribbon';
import LocationState from "./LocationState";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  githubBanner: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  }
});

class App extends React.Component {
  render() {
    let { classes } = this.props;
    return <div>
      <GitHubForkRibbon href="https://github.com/philals/hide"
        target="_blank"
        className={classes.githubBanner}
        position="right">Fork me</GitHubForkRibbon>
      <LocationState />
    </div>;
  }
}

export default withStyles(styles)(App);
