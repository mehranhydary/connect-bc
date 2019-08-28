import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { listRegions, getRegion } from "../../actions/regionActions";
import QRCode from 'qrcode.react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import RegionMapForManage from './RegionMapForManage';

import { withStyles } from '@material-ui/core/styles';

const useStyles = (theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  root: {
    // flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  map: {
    // width: '200%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  card: {
    // minWidth: 275,
  },
}));

class RegionSpecific extends Component {
  constructor() {
    super()
    this.state = {
      countryName: ''
    }
  }
  componentWillMount = () => {
    const { countryName } = this.props.match.params
    this.setState({
      countryName
    })
    this.getRegion(countryName)
  }
  getRegion = (regionName) => {
    this.props.getRegion(regionName)
  }
  
  render() {
    console.log(this.props)
    const { classes } = this.props;
    return (
        <div className={classes.root}>
            <div className={classes.paper}>
            <Typography component='h1' variant='h5'>
                Details for {this.state.countryName}
            </Typography>
            <Typography component='h3' variant='body1'>
                See the funding and connectivity details for this region.
            </Typography>
            <Typography component='h3' variant='body1'>
                <Link href="/manage-regions" variant="body2">
                Go back to view information for another region.
                </Link>
            </Typography>
            <Grid container spacing={0}>
                <Grid container xs={12}sm={6}md={4}lg={4}>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Donations raised
                            </Typography>
                            <Typography variant="h5" component="h2">
                                500 ETH
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                since 8 Aug 2019
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Number of donors
                            </Typography>
                            <Typography variant="h5" component="h2">
                                30
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                individuals from around the world
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    <Card elevation={0} className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Country public address 
                            </Typography>
                            {/* <Typography variant="h5" component="h2"> */}
                              <QRCode value={this.props.region.contractAddress ? this.props.region.contractAddress : "0x1092361f4eAfDC6e4555Ee761E87Ef9c67b9e42f"} />
                            {/* </Typography> */}
                            <Typography className={classes.pos} color="textSecondary">
                              Donate to this region
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button href='#' style={{fontFamily:['Red Hat Text']}} size="small">{this.props.region.contractAddress}</Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid container xs={12}sm={12}md={8}lg={8}>
                    <RegionMapForManage 
                        key={this.state.countryName}
                        countryName={this.state.countryName}
                    />
                </Grid>
            </Grid>


            </div>
        </div>
    );
  }
}

RegionSpecific.propTypes = {
  auth: PropTypes.object.isRequired,
  region: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  listRegions: PropTypes.func.isRequired,
  getRegion: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  region: state.region
});

export default connect(
  mapStateToProps,
  { listRegions, getRegion }
) (withStyles(useStyles)(RegionSpecific));