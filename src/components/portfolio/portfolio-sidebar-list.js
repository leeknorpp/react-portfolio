import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PortfolioSideBarList = (props) =>{ // Props in this case being the portfolio Items
    const portfolioList = props.data.map(portfolioItem => { //.map iterates over all the items in the array
        return (
            <div key={ portfolioItem.id } className="portfolio-item-thumb">
                <div className="portfolio-thumb-img">
                    <img src={ portfolioItem.thumb_image_url }/>
                </div>
                <div className="title-delete-wrapper">
                    <h1 className="title">{ portfolioItem.name }</h1>
                    <div className="actions">
                    <a onClick={() => props.handleEditClick(portfolioItem)}>
                            <FontAwesomeIcon icon="edit" className="action-icon"/>
                        </a>

                        <a onClick={() => props.handleDeleteClick(portfolioItem)}>
                            <FontAwesomeIcon icon="trash" className="action-icon"/>
                        </a>
                    </div>
                </div>

            </div>
        )
    })

    return (
        <div className="portfolio-sidebar-list-wrapper">{ portfolioList }</div>
    );
}

export default PortfolioSideBarList;