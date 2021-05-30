import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

class InsurancesIndex extends Component {
  constructor() {
    super();
    this.state = {
      insurances: [],
      msg: null,
      type: null,
      flash: false,
      alert: null,
    };
  }

  hideAlert() {
    this.setState({
      alert: null,
    });
  }

  componentDidMount() {
    axios.get("http://localhost:3000/api/v1/insurances").then((response) => {
      this.setState({
        insurances: response.data,
      });
    });
  }

  confirmDelete(id) {
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Hapus Deh"
        cancelBtnText="Nggak Jadi"
        confirmBtnBsStyle="default"
        cancelBtnBsStyle="danger"
        title="Tunggu ..."
        onConfirm={() => this.deleteItem(id)}
        onCancel={() => this.hideAlert()}
        focusCancelBtn
      >
        Yakin?.
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  deleteItem(id) {
    axios
      .delete(`http://localhost:3000/api/v1/insurances/${id}`)
      .then((response) => {
        var msg = response.data.success;
        console.log(msg);
        if (msg == true) {
          this.hideAlert();
          this.goToHome();
        }
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
        Asuransi sukses di hapus
      </SweetAlert>
    );
    this.setState({
      alert: getAlert(),
    });
  }

  onSuccess() {
    this.componentDidMount();
    this.hideAlert();
  }

  render() {
    const { insurances } = this.state;
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Daftar Asuransi</div>
              <div className="card-body">
                <Link className="btn btn-primary btn-sm mb-3" to="/create">
                  Buat Asuransi Baru
                </Link>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="50" className="text-center">
                          No
                        </th>
                        <th>Asuransi</th>
                        <th width="200" className="text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {insurances.map((insurances, i) => (
                        <tr key={i}>
                          <td width="50" className="text-center">
                            {i + 1}
                          </td>
                          <td>{insurances.name}</td>
                          <td width="200" className="text-center">
                            <div className="btn-group">
                              <Link
                                className="btn btn-primary"
                                to={`/insurances/${insurances.id}`}
                              >
                                Detail
                              </Link>
                              <Link
                                className="btn btn-success"
                                to={`/insurances/edit/${insurances.id}`}
                              >
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  this.confirmDelete(insurances.id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {this.state.alert}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InsurancesIndex;
