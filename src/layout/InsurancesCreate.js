import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class InsurancesCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      active: "",
      alert: null,
      errors: [],
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleCreateNewInsurances = this.handleCreateNewInsurances.bind(this);
    this.hasErrorFor = this.hasErrorFor.bind(this);
    this.renderErrorFor = this.renderErrorFor.bind(this);
  }

  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
        Buat asuransi sukses!
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

  handleCreateNewInsurances(event) {
    event.preventDefault();
    const insurances = {
      name: this.state.name,
      content: this.state.content,
    };
    axios
      .post("http://localhost:3000/api/v1/insurances/", insurances)
      .then((response) => {
        var msg = response.data.success;
        if (msg == true) {
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
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Buat Asuransi</div>
              <div className="card-body">
                <form onSubmit={this.handleCreateNewInsurances}>
                  <div className="form-group">
                    <label htmlFor="name">Nama</label>
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${
                        this.hasErrorFor("name") ? "is-invalid" : ""
                      }`}
                      name="name"
                      value={this.state.name}
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
                    >
                      <option value="1">Aktif</option>
                      <option value="0">Tidak Aktif</option>
                    </select>
                    {this.renderErrorFor("active")}
                  </div>
                  <Link className="btn btn-secondary" to={`/`}>
                    kembali
                  </Link>
                  <button className="btn btn-primary">Buat</button>
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
export default InsurancesCreate;
