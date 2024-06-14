import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faBox, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./OrderCart.css";

function OrderCart() {
  return (
    <div className="order-tracking">
        <div className="order-progress">
            <div className="order-info">
                <h2>Lacak Pesanan</h2>
                <p>Order ID <strong>12323244225</strong></p>
                <p>Placed On <strong>17, Mei 2024</strong></p>
            </div>
            <div className="progress-container">
                <div className="progress">
                    <div className="circle red"><FontAwesomeIcon icon={faCog} /></div>
                    <span className="line"></span>
                    <div className="circle orange"><FontAwesomeIcon icon={faBox} /></div>
                    <span className="line"></span>
                    <div className="circle green"><FontAwesomeIcon icon={faCheck} /></div>
                </div>
                <div className="progress-labels">
                    <div>Proses</div>
                    <div>Dikemas</div>
                    <div>Selesai</div>
                </div>
            </div>
        </div>
        <div className="process-info">
            <h3>Informasi Proses</h3>
            <p><span className="circle red"></span> Pesanan anda sedang kami proses</p>
            <p><span className="circle orange"></span> Pesanan anda sedang dikemas</p>
            <p><span className="circle green"></span> Pesanan sudah selesai</p>
        </div>
    </div>
);
};

export default OrderCart;
