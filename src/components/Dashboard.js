import React, { Component } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Pagination from 'react-js-pagination';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
const uuidv1 = require('uuid/v1');

//Pagination
const DATA_PER_PAGE = 5;

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activePage: 1,
      search: '',
      helper: '',
      tag: ''
    };
  }

  componentDidMount() {
    // Mapped and used ES6 destructuring to send to state relevant entries from json data file
    axios.get(`db.json`).then(res => {
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
      const state = window.localStorage.getItem('state');
      this.setState({ ...JSON.parse(state) });
    } catch (e) {}
  }
  componentDidUpdate() {
    window.localStorage.setItem('state', JSON.stringify(this.state));
  }
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  // Used filter method to only display matching tags when user searches for tags.
  // Description of Work(4th Version) - tags should be found when searching by its name
  handleSubmit = event => {
    event.preventDefault();
    const { search, data } = this.state;
    const mapTags = data.map(tag => tag.tags).flat();
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
  handleTag = event => {
    this.setState({ tag: event.target.value });
  };
  handleDelete = event => {
    let tagvalue = event.target.value;
    let index = this.state.data.findIndex(i => i.tags.includes(tagvalue));

    let tagIndex = this.state.data[index].tags.findIndex(i =>
      i.match(tagvalue)
    );
    let filteredData = this.state.data;
    filteredData[index].tags.splice(tagIndex, 1);
    this.setState({ data: filteredData });
  };

  //Tags are matched with titles that have the corresponding index.
  //Each tag is added to the corresponding array of tags for each title.
  //Replace is used with a regex function to only search for alphanumeric characters.
  handleAddition = event => {
    event.preventDefault();
    let tagvalue = this.state.tag;
    let tagkey = event.target.value;

    let index = this.state.data.findIndex(el => {
      return el.title
        .replace(/[^a-zA-Z ]/g, '')
        .match(tagkey.replace(/[^a-zA-Z ]/g, ''));
    });
    let addtag = this.state.data;
    addtag[index].tags.push(tagvalue.toLowerCase());

    this.setState({ data: addtag });
    document.getElementById(tagkey).reset();
  };

  render() {
    const indexOfLastData = this.state.activePage * DATA_PER_PAGE;
    const indexOfFirstData = indexOfLastData - DATA_PER_PAGE;
    const data = this.state.data.slice(indexOfFirstData, indexOfLastData);

    const mappeddata = data.map(d => (
      <div className='grid'>
        <span className='titles'>
          <Link className='bcolor' to={`/detail/${d.title}`}>
            {d.title}
          </Link>
        </span>
        <span key={uuidv1()}>{d.description}</span>
        <span className='tagbox'>
          <div className='tag-container'>
            {d.tags.map(tag => (
              <span className='dashfolio-tag'>
                {tag}
                <button
                  value={tag}
                  className='deltag'
                  onClick={this.handleDelete}
                >
                  X
                </button>
              </span>
            ))}
          </div>

          <form className='form-inline' id={d.title}>
            <div className='form-group'>
              <input className='form-control' onChange={this.handleTag} />
            </div>
            <button
              type='submit'
              className='btn btn-default'
              value={d.title}
              onClick={this.handleAddition}
            >
              Add
            </button>
          </form>
        </span>
      </div>
    ));

    return (
      <div className='page'>
        <div className='flex'>
          <form className='form-row' onSubmit={this.handleSubmit}>
            <input
              className='search'
              type='text'
              value={this.state.search}
              onChange={this.handleChange}
            />
            <Button outline color='primary'>
              Search
            </Button>
          </form>
        </div>
        <div className='grid-header'>
          <div>Title</div>
          <div>Description</div>

          <div>Tags</div>
        </div>
        {mappeddata}
        <div className='pagination'>
          <Pagination
            itemClass='page-item'
            linkClass='page-link'
            className='pagination'
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={this.state.data.length}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default Dashboard;
