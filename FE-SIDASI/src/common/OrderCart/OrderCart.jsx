import React from "react";
import "./OrderCart.css";

function OrderCart() {
  return (
    <div className="container-fluid my-5 d-sm-flex justify-content-between">
      <div className="card px-2">
        <div className="card-header bg-white">
          <div className="row justify-content-between">
            <div className="col">
              <h2>Lacak Pesanan</h2>
              <p className="text-muted">
                ID Pesanan{" "}
                <span className="font-weight-bold text-dark">1222528743</span>
              </p>
              <p className="text-muted">
                Pada Tanggal{" "}
                <span className="font-weight-bold text-dark">
                  12, Maret 2024
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="row px-3">
          <div className="col">
            <ul id="progressbar">
              <li className="step0 active" id="step1">
                <i className="fas fa-cog"></i> PROSES
              </li>
              <li className="step0 active text-center" id="step2">
                <i className="fas fa-box"></i> DIKEMAS
              </li>
              <li className="step0 text-muted text-right" id="step3">
                <i className="fas fa-check"></i> SELESAI
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card px-2 align-self-start"> {/* Menggunakan align-self-start untuk menyelaraskan dengan bagian atas container */}
        <div className="card-header bg-white">
          <div className="row justify-content-between">
            <div className="col">
              <h2>Informasi Proses</h2>
              <p className="text-muted">
                Pesanan Anda Sedang Kami Proses
              </p>
            </div>
          </div>
        </div>
        <div className="row px-3">
          <div className="col">
            <div className="progress-circle red">
              <span className="progress-text">Proses</span>
            </div>
            <div className="progress-circle yellow">
              <span className="progress-text">Siapkan</span>
            </div>
            <div className="progress-circle green">
              <span className="progress-text">Selesai</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCart;
