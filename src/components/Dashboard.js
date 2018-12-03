import React, { Component } from "react";
import axios from "axios";
import "./Dashboard.css";
import Pagination from "react-js-pagination";
import { Button } from "reactstrap";
import { WithContext as ReactTags } from "react-tag-input";
import { Link } from "react-router-dom";
const uuidv1 = require("uuid/v1");

//Pagination
const DATA_PER_PAGE = 6;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePage: 1,
      search: "",
      helper: "",
      tags: []
    };
  }

  componentDidMount() {
    // Mapped and used ES6 destructuring to send to state relevant entries from json data file
    axios.get(`http://localhost:3000/db.json`).then(res => {
      const data = Object.values(res.data.data).map(
        ({ title, description }) => ({
          title,
          description,
          tags: []
        })
      );

      this.setState({ data: data });
      this.setState({ helper: data });
    });
    // Description of Work(4th Version) -tag assignments should be saved in my browser
    try {
      const state = window.localStorage.getItem("state");
      this.setState({ ...JSON.parse(state) });
    } catch (e) {}
  }
  componentDidUpdate() {
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  // Used filter method to only display matching tags when user searches for tags.
  // Description of Work(4th Version) - tags should be found when searching by its name
  handleSubmit = event => {
    const { search, data, tags } = this.state;
    const mapTags = tags.map(d => d.id.toLowerCase());
    const filterTags = data.filter(d => d.tags.includes(search));
    const filterTitles = data.filter(d => {
      return d.title.toLowerCase().match(search);
    });

    mapTags.includes(search)
      ? this.setState({ data: filterTags })
      : this.setState({ data: filterTitles });

    this.setState({ activePage: 1 });
    event.preventDefault();
  };

  // The helper resets this.state.data to its original state when user deletes search query.
  // Always lowercase to comply to DescriptionofWork(2nd Ver)
  //- case-insensitive text search in labels and descriptions
  handleChange = event => {
    this.setState({ search: event.target.value.toLowerCase() });
    this.setState({ data: this.state.helper });
  };
  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  //Tags are matched with titles that have the corresponding index.
  //Each tag is added to the corresponding array of tags for each title.
  //Replace is used with a regex function to only search for alphanumeric characters.
  handleAddition = tag => {
    let tagvalue = Object.values(tag.id).join("");
    let tagkey = Object.keys(tag)[1];

    let index = this.state.data.findIndex(el => {
      return el.title
        .replace(/[^a-zA-Z ]/g, "")
        .match(tagkey.replace(/[^a-zA-Z ]/g, ""));
    });
    let addtag = this.state.data;
    addtag[index].tags.push(tagvalue.toLowerCase());

    this.setState({ data: addtag });

    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  render() {
    const indexOfLastData = this.state.activePage * DATA_PER_PAGE;
    const indexOfFirstData = indexOfLastData - DATA_PER_PAGE;
    const { tags } = this.state;

    //Pagination
    const data = this.state.data.slice(indexOfFirstData, indexOfLastData);

    //Description of Work(3rd Version)
    //The detail view of a feature should be available as a deep link to the app (routing)
    const datatitle = data.map(d => (
      <Link className="bcolor" to={`/detail/${d.title}`} key={uuidv1()}>
        {d.title}
      </Link>
    ));
    const datadescription = data.map(d => (
      <li key={uuidv1()}>{d.description}</li>
    ));
    const datatags = data.map(d => (
      <ReactTags
        key={d.title}
        tags={tags}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
        labelField={d.title}
        autofocus={false}
        removeComponent={() => <span />}
        allowUnique={false}
      />
    ));

    return (
      <div>
        <div className="flex">
          <form
            className="form-row"
            action="action_page.php"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
            />
            <Button outline color="primary">
              Search
            </Button>
          </form>
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            className="pagination"
            activePage={this.state.activePage}
            itemsCountPerPage={6}
            totalItemsCount={this.state.data.length}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>

        <div className="grid">
          <div>
            <div className="label">Title</div>
            <ul>{datatitle}</ul>
          </div>
          <div>
            <div className="label">Description</div>
            <ul className="dlabel">{datadescription}</ul>
          </div>
          <div>
            <div className="label">
              Tags(add with ENTER/delete with BACKSPACE)
            </div>
            <ul>{datatags}</ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
