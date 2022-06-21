import React, { Component } from 'react';
import axios from 'axios';
import PortfolioSideBarList from '../portfolio/portfolio-sidebar-list';
import PortfolioForm from '../portfolio/portfolio-form';

export default class PortfolioManager extends Component {

    constructor(props) {
        super(props);

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
}

clearPortfolioToEdit() {
    this.setState({
        portfolioToEdit: {}
    })
}

handleEditClick(portfolioItem) {
    this.setState({
        portfolioToEdit: portfolioItem
    })
}

    handleDeleteClick(portfolioItem) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true }
        ).then(response => {
            this.setState({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })

            return response.data;
        }).catch(error => {
            console.log("error from delete:", error);
        });
    }

    handleNewFormSubmission(portfolioItem) { //update page to add item from form
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleEditFormSubmission() {
        this.getPortfolioItems();
    }

    handleFormSubmissionError(error) {
        console.log("handleFormSubmissionError error", error);
    }

    getPortfolioItems() { //call portfolio items from api
        axios.get("https://leeknorpp.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items] //update portfolioItems state (set in constructor) to have response data
            })
        }).catch(error =>{
            console.log("error in getPortfolioItems", error);
        })
    }

    componentDidMount(){ //call above function (getPortfolioItems) when the page loads
        this.getPortfolioItems();
    }

    render() {

        return (
            <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                    handleNewFormSubmission={this.handleNewFormSubmission}
                    handleEditFormSubmission={this.handleEditFormSubmission}
                    handleFormSubmissionError={this.handleFormSubmissionError}
                    clearPortfolioToEdit={this.clearPortfolioToEdit}
                    portfolioToEdit={this.state.portfolioToEdit}
                    />
                </div>
                <div className='right-column'>
                    <PortfolioSideBarList 
                    handleDeleteClick={this.handleDeleteClick} //Gives this class access to the fuction, so you don't need parens.
                    data={this.state.portfolioItems} 
                    handleEditClick={this.handleEditClick}
                    />
                </div>
            </div>
        )
    }
}