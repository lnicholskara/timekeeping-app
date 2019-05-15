import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { findUserDetails } from "../actions/findUserActions";
import ResponsiveDrawer from "../components/ResponsiveDrawer/ResponsiveDrawer";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Dashboard extends Component {

  constructor() {
    super();
    this.state = {
      errors: {}
    };
  };

  componentDidMount() {
    const userData = {
      id: this.props.auth.user.id
    };
    console.log('componentdid', this.props.auth.user.id)
    this.props.findUserDetails(userData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    if (!this.props.userDetails) {
      return null
    }
    else {

      const { data } = this.props.userDetails;
      console.log(user);
      console.log(data)
      return (
        <div>
          <ResponsiveDrawer />

          <div className="container">
            <h1>DASHBOARD</h1>
            <div className="row">
              <div className="col s6">
                <div className="card">
                  <div className="card-header">
                    <h6>
                      Recent Acitivity
                    </h6>
                  </div>
                  <Divider />
                  <div className="card-content">
                    <ul>
                      <li>
                        Project 1
                      </li>
                      <li>
                        Project 2
                      </li>
                      <li>
                        Project 3
                      </li>
                      <li>
                        Project 4
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col s6">
                <div className="card">
                  <div className="card-header">
                    <h6>
                      Week Earnings
                  </h6>
                    <Divider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      );
    }
  }
}

Dashboard.propTypes = {
  findUserDetails: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  userDetails: state.findUser.userDetails
});

export default connect(
  mapStateToProps,
  { logoutUser, findUserDetails }
)(Dashboard);