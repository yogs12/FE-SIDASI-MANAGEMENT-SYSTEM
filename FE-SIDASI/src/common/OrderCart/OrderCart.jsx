import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OrderCart() {
  const { id_booking } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true); // Awalnya true untuk menunjukkan bahwa sedang loading
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!id_booking) {
          throw new Error("No ID provided in URL");
        }

        console.log(`Fetching booking details for ID: ${id_booking}`);
        const response = await axios.get(`http://localhost:3000/bookings/bookings/${id_booking}`);
        const bookingData = response.data.data[0]; // Adjust this according to your API response structure
        if (!bookingData) {
          throw new Error(`Booking details not found for ID: ${id_booking}`);
        }
        setBookingDetails(bookingData);
        setStatus(bookingData.status_pembayaran || '');
      } catch (error) {
        setError(error.message);
        console.error('Error fetching booking details:', error.message);
      } finally {
        setLoading(false); // Mengubah loading menjadi false saat selesai fetching atau terjadi kesalahan
      }
    };

    if (id_booking) {
      fetchBookingDetails();
    } else {
      setLoading(false); // Menghentikan loading jika tidak ada id_booking
    }
  }, [id_booking]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!bookingDetails) {
    return <div>No booking details found for ID: {id_booking}</div>;
  }

  return (
    <div className="order-tracking">
      <div className="order-progress">
        <div className="order-info">
          <h2>Lacak Pesanan</h2>
          <p>Order ID <strong>{bookingDetails.id_booking}</strong></p>
          <p>Placed On <strong>{new Date(bookingDetails.tanggal_booking).toLocaleDateString()}</strong></p>
        </div>
        <div className="progress-container">
          <div className="progress">
            <div className={`circle ${status === 'Proses' ? 'red' : ''}`}>Proses</div>
            <span className="line"></span>
            <div className={`circle ${status === 'Dikemas' ? 'orange' : ''}`}>Dikemas</div>
            <span className="line"></span>
            <div className={`circle ${status === 'Selesai' ? 'green' : ''}`}>Selesai</div>
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
}

export default OrderCart;
