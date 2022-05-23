import React, { Component } from "react";
import axios from 'axios';

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            data: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    };

    handleFilter(filter) {
        this.setState({
            data: this.state.data.filter(item=> {
                return item.category === filter;
            })
        });
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem 
                key={item.id} 
                item={item}/>;
        });
    };

    getPortfolioItems() {

        // Make a request for a user with a given ID
        axios.get('https://leeknorpp.devcamp.space/portfolio/portfolio_items')
          .then(response => {
            // handle success
            this.setState({
                data: response.data.portfolio_items
            });
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
      };

      componentDidMount() {
        this.getPortfolioItems();
      };

    render() {
        if (this.state.isLoading) {
            return <div>Loading...</div>;
        };

        return (
            <div>
                <h2>{ this.state.pageTitle }</h2>

                <button onClick={ () => this.handleFilter('eCommerce') }>eCommerce</button>
                <button onClick={ () => this.handleFilter('software') }>Software</button>
                <button onClick={ () => this.handleFilter('grocery') }>Grocery</button>

                <div className="portfolio-items-wrapper">

                    {this.portfolioItems()}

                </div>

            </div>
        );
    };
}