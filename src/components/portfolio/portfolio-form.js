import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "eCommerce",
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: "",
      editMode: false,
      apiUrl: "https://leeknorpp.devcamp.space/portfolio/portfolio_items",
      apiAction: "post",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djgConfig = this.djsConfig.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);
    this.deleteImage = this.deleteImage.bind(this);

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();
  }

  deleteImage(imageType) {
    axios
      .delete(
        `https://api.devcamp.space/portfolio/delete-portfolio-image/${this.state.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          [`${imageType}_url`]: "",
        });
      })
      .catch((error) => {
        console.log("deleteImage error!", error);
      });
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        id,
        name,
        description,
        category,
        position,
        url,
        thumb_image_url,
        banner_image_url,
        logo_url,
      } = this.props.portfolioToEdit; //Store all those pieces of portfolioToEdit in variables

      this.props.clearPortfolioToEdit();

      this.setState({
        id: id,
        name: name || "", //Check if there's a name. if there's a name, put in the name. if not, put in an empty string.
        description: description || "",
        category: category || "eCommerce",
        position: position || "",
        url: url || "",
        editMode: true,
        apiUrl: `https://leeknorpp.devcamp.space/portfolio/portfolio_items/${id}`,
        apiAction: "patch", //Tell it to edit instead of make a new one
        thumb_image_url: thumb_image_url || "",
        banner_image_url: banner_image_url || "",
        logo_url: logo_url || "",
      });
    }
  }

  handleThumbDrop() {
    return {
      addedfile: (file) => this.setState({ thumb_image: file }),
    };
  }

  handleBannerDrop() {
    return {
      addedfile: (file) => this.setState({ banner_image: file }),
    };
  }

  handleLogoDrop() {
    return {
      addedfile: (file) => this.setState({ logo: file }),
    };
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value, //Get name from this.state array
    });
  }

  //Dropzone config
  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post", //Because dropzone wants to automatically upload the file, we are bypassing that with a mock url that will always return true
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  //End dz config

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name); //Passes it into the API, check API documentation for syntax in the parenthesis!
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);

    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }

    return formData;
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      withCredentials: true,
    })
      .then((response) => {
        if (this.state.editMode) {
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data.portfolio_item);
        }

        this.setState({
          name: "",
          description: "",
          category: "eCommerce",
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: "",
          editMode: false,
          apiUrl: "https://leeknorpp.devcamp.space/portfolio/portfolio_items",
          apiAction: "post",
        }); //Clear form

        [this.thumbRef, this.bannerRef, this.logoRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles(); //Clear dz files on submit
        });
      })
      .catch((error) => {
        console.log("portfolio form handleSubmit error", error);
      });

    //this.buildForm(); uses Axios to submit data
    event.preventDefault(); // stop page from refreshing on submit
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="Url"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>
        <div className="two-column">
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />

          <select
            name="category"
            value={this.state.category}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>

        <div className="one-column">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders three-column">
          {this.state.thumb_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.thumb_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("thumb_image")}>
                  <FontAwesomeIcon icon="trash" className="action-icon" />{" "}
                  Remove File
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.thumbRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleThumbDrop()}
            >
              <div className="dz-message">Drop thumbnail image here</div>
            </DropzoneComponent>
          )}

          {this.state.banner_image_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.banner_image_url} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("banner_image")}>
                  {" "}
                  <FontAwesomeIcon icon="trash" className="action-icon" />{" "}
                  Remove File
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.bannerRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleBannerDrop()}
            >
              <div className="dz-message">Drop banner image here</div>
            </DropzoneComponent>
          )}

          {this.state.logo_url && this.state.editMode ? (
            <div className="portfolio-manager-image-wrapper">
              <img src={this.state.logo_url} />
              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("logo")}>
                  <FontAwesomeIcon icon="trash" className="action-icon" />{" "}
                  Remove File
                </a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.logoRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleLogoDrop()}
            >
              <div className="dz-message">Drop logo image here</div>
            </DropzoneComponent>
          )}
        </div>

        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
