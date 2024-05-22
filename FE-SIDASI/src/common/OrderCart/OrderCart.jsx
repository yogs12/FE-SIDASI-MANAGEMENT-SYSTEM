import React from "react";
import "./OrderCart.css";

function OrderCart() {
  return (
    <div className="container-fluid my-5">
      <div className="row">
        <div className="col-md-6"> {/* Bagian kiri untuk Lacak Pesanan */}
          <div className="card px-2">
            <div className="card-header bg-white">
              <div className="row justify-content-between">
                <div className="col">
                  <h2>Lacak Pesanan</h2>
                  <p className="text-muted">
                    ID Pesanan :{" "}
                    <span className="font-weight-bold text-dark">1222528743</span>
                  </p>
                  <p className="text-muted">
                    Pada Tanggal :{" "}
                    <span className="font-weight-bold text-dark">
                      12, Maret 2024
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row px-3">
              <div className="col">
                <ul className="tracking-list">
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
        </div>
        <div className="col-md-6"> {/* Bagian kanan untuk Informasi Proses */}
          <div className="card px-2 align-self-start"> {/* Gunakan align-self-start untuk menyelaraskan dengan bagian atas container */}
            <div className="card-header bg-white">
              <div className="row justify-content-between">
                <div className="col">
                  <h2>Informasi Proses</h2>
                  <p className="text-muted">Pesanan Anda Sedang Kami Proses</p>
                </div>
              </div>
            </div>
            <div className="row px-3">
              <div className="col">
                <div className="progress-info">
                  <div className="progress-circle red"></div>
                  <p className="progress-description">Pesanan anda diperiksa</p>
                </div>
                <div className="progress-info">
                  <div className="progress-circle yellow"></div>
                  <p className="progress-description">Pesanan anda dikemas</p>
                </div>
                <div className="progress-info">
                  <div className="progress-circle green"></div>
                  <p className="progress-description">Pesanan anda bisa diambil</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCart;
