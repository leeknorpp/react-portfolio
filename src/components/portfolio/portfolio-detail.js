import React, { Component } from "react";
import PortfolioItem from "./portfolio-item";
import axios from "axios";

export default class PortfolioDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portfolioItem: {},
    };

    this.getPortfolioItemDetails = this.getPortfolioItemDetails.bind(this);
  }

  getPortfolioItemDetails() {
    axios
      .get(
        `https://leeknorpp.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`
      )
      .then((response) => {
        // handle success
        this.setState({
          portfolioItem: response.data.portfolio_item,
        });
      })
      .catch((error) => {
        // handle error
        console.log("Get Portfolio Item Details error", error);
      });
  }

  componentDidMount() {
    this.getPortfolioItemDetails();
  }

  render() {
    const {
      banner_image_url,
      category,
      description,
      logo_url,
      name,
      thumb_image_url,
      url,
    } = this.state.portfolioItem;
    return (
      <div className="portfolio-detail-wrapper">
        <div
          className="banner"
          style={{
            background: "url(" + banner_image_url + ") no-repeat",
          }}
        >
          <img src={logo_url} />
        </div>

        <div className="portfolio-detail-description-wrapper">
          <div className="description">{description}</div>
        </div>

        <div className="bottom-content-wrapper">
          <a href={url} className="site-link" target="_blank">
            Visit {name}!
          </a>
        </div>
      </div>
    );
  }
}
