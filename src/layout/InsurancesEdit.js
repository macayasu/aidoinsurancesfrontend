import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class InsurancesEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      active: "",
      alert: null,
      message: "",
      errors: [],
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleUpdateInsurances = this.handleUpdateInsurances.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    const insurancesId = this.props.match.params.id;

    axios
      .get(`http://localhost:3000/api/v1/insurances/${insurancesId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          name: response.data[0].name,
          active: response.data[0].active,
        });
      });
  }

  goToHome() {
    const getAlert = () => (
      <SweetAlert
        success
        title="Success!"
        onConfirm={() => this.onSuccess()}
        onCancel={this.hideAlert()}
        timeout={2000}
        confirmBtnText="Oke Siap"
      >
        {this.state.message}
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  onSuccess() {
    this.props.history.push("/");
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  handleUpdateInsurances(event) {
    event.preventDefault();

    const insurances = {
      name: this.state.name,
      active: this.state.active,
    };

    const insurancesId = this.props.match.params.id;

    axios
      .put(
        `http://localhost:3000/api/v1/insurances/${insurancesId}`,
        insurances
      )
      .then((response) => {
        console.log(response.data);

        // redirect to the homepage
        var msg = response.data.success;
        if (msg == true) {
          this.setState({
            message: response.data.message,
          });
          return this.goToHome();
        }
      });
  }

  hasErrorFor(field) {
    return !!this.state.errors[field];
  }

  renderErrorFor(field) {
    if (this.hasErrorFor(field)) {
      return (
        <span className="invalid-feedback">
          <strong>{this.state.errors[field][0]}</strong>
        </span>
      );
    }
  }

  render() {
    const { insurances } = this.state;
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Edit Asuransi</div>
              <div className="card-body">
                <form onSubmit={this.handleUpdateInsurances}>
                  <div className="form-group">
                    <label htmlFor="name">Nama</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("name") ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={this.state.name || ""}
                      onChange={this.handleFieldChange}
                    />
                    {this.renderErrorFor("title")}
                  </div>
                  <div className="form-group">
                    <label htmlFor="active">Status</label>
                    <select
                      id="active"
                      name="active"
                      onChange={this.handleFieldChange}
                      value={this.state.active || ""}
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </select>
                    {this.renderErrorFor("active")}
                  </div>
                  <Link className="btn btn-secondary" to={`/`}>
                    kembali
                  </Link>
                  <button className="btn btn-primary">Update</button>
                  {this.state.alert}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default InsurancesEdit;
