import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { findUserDetails } from "../actions/findUserActions";
import { createClientDetails } from "../actions/createClientActions";
import ResponsiveDrawer from "../components/ResponsiveDrawer/ResponsiveDrawer";
import NewClientFields from "../components/NewClientForm/NewClientForm";

class NewClient extends Component {
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
        //console.log('componentdid', this.props.auth.user.id)
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

            if (!data) {
                return null
            }
            else {
                return (
                    <div >
                        <ResponsiveDrawer />
                        <div>
                            <NewClientFields user={{ data }}/>
                        </div>
                    </div>

                );
            }
        }
    }
}


NewClient.propTypes = {
    createClientDetails: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    userDetails: PropTypes.object.isRequired,
    findUserDetails: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    userDetails: state.findUser.userDetails
});

export default connect(
    mapStateToProps,
    { logoutUser, createClientDetails, findUserDetails }
)(NewClient);