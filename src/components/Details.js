import React, { Component } from 'react';
import axios from 'axios';

export class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      index: [],
      dat: []
    };
  }
  componentDidMount() {
    axios.get(`http://localhost:3000/db.json`).then(res => {
      const dataArray = Object.values(res.data.data);

      const index = dataArray.findIndex(
        x => x.title === this.props.match.params.id
      );
      this.setState({ index: index });
      this.setState({ data: dataArray });
      this.setState({ dat: this.state.data[this.state.index] });
    });
  }

  render() {
    const data = this.state.dat;

    return (
      <div>
        <div className='col-md-12'>
          <div className='card mb-12 '>
            <div className='card-body'>
              <div>
                <strong>Title</strong>
                <span>: {data.title} </span>
                <br />
                <strong>Description</strong>
                <span itemProp='name'>: {data.description} </span>
                <br />
              </div>

              <strong>
                <i /> Spec
              </strong>

              <span>: {data.spec}</span>
              <br />
              <strong>Status</strong>
              <span>: {data.status}</span>
              <br />
              <strong>Notes</strong>
              <span>: {data.notes}</span>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Details;
