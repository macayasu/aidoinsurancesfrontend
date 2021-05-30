import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class InsurancesShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      insurances: {},
    };
  }

  componentDidMount() {
    const insurancesId = this.props.match.params.id;

    axios
      .get(`http://localhost:3000/api/v1/insurances/${insurancesId}`)
      .then((response) => {
        this.setState({
          insurances: response.data[0],
        });
      });
  }

  render() {
    const { insurances } = this.state;

    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                Nama Asuransi: {insurances.name}
              </div>
              <div className="card-body">
                <p>{insurances.active}</p>
                <Link className="btn btn-primary" to={`/`}>
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InsurancesShow;
