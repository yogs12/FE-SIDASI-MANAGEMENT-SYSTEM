import React from "react";
import "./OrderCart.css";

function OrderCart() {
  return (
    <div className="container-fluid my-5 d-sm-flex justify-content-center">
      <div className="card px-2">
        <div className="card-header bg-white">
          <div className="row justify-content-between">
            <div className="col">
              <p className="text-muted">
                Order ID{" "}
                <span className="font-weight-bold text-dark">1222528743</span>
              </p>
              <p className="text-muted">
                Placed On{" "}
                <span className="font-weight-bold text-dark">
                  12, March 2019
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="row px-3">
          <div className="col">
            <ul id="progressbar">
              <li className="step0 active " id="step1">
                PLACED
              </li>
              <li className="step0 active text-center" id="step2">
                SHIPPED
              </li>
              <li className="step0 text-muted text-right" id="step3">
                DELIVERED
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCart;
