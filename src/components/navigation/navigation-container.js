import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export default class NavigationContainer extends Component {
    constructor() {
        super();
    };
    


    render() {
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
                </div>
                <div className="right-side">
                    Lee Knorpp
                </div>
            </div>
        );
    };
}