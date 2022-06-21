import React from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";

const NavigationComponent = (props) => {

const dynamicLink = (route, linkText) =>{
    return (
        <div className="nav-link-wrapper">
                    <NavLink activeClassName="nav-link-active" exact to= {route}>
                        { linkText }
                    </NavLink>
                    </div>
    ); 
};

const handleSignOut = () => {
    axios.delete("https://api.devcamp.space/logout", {withCredentials: true} )
    .then(response => {
        if (response.status === 200) {
            props.history.push("/");
            props.handleSuccessfulLogout();
        } 
        return response.data;
    }).catch(error => {
        console.log("error signing out", error);
    })
};

        return (

            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="nav-link-wrapper">
                        <NavLink activeClassName="nav-link-active" exact to="/">
                            Home
                        </NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                    <NavLink activeClassName="nav-link-active" exact to="/about-me">
                        About
                    </NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                    <NavLink activeClassName="nav-link-active" exact to="/contact">
                        Contact
                    </NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink activeClassName="nav-link-active" exact to="/blog">
                            Blog
                        </NavLink>

                    </div>

                    { props.loggedInStatus === "LOGGED_IN" ? dynamicLink("/portfolio-manager", "Portfolio Manager") : null}
                    
                </div>
                <div className="right-side">

                    Lee Knorpp

                    { props.loggedInStatus === 'LOGGED_IN' ? <a alt="Sign Out" onClick={handleSignOut}>
                        <FontAwesomeIcon icon="sign-out-alt"/>
                    </a> : null}
                </div>
            </div>
        );
    };

    export default withRouter (NavigationComponent);