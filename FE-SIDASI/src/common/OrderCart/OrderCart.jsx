// OrderCart.jsx
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from '../../auth/AuthContext'; // Import your authentication context
import "./OrderCart.css";

function OrderCart() {
  const { auth } = useAuth(); // Get authenticated user from context
  const { user } = auth;
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        if (!user || !user.id_user) {
          throw new Error("User ID not found");
        }

        const id_user = user.id_user;

        console.log(`Fetching booking details for user ID: ${id_user}`);
        const response = await axios.get('http://localhost:3000/bookings/bookings', {
          headers: {
            'id_user': id_user,
          },
        });
        const bookingsData = response.data.data || [];

        if (bookingsData.length === 0) {
          throw new Error(`No booking details found for user ID: ${id_user}`);
        }

        setBookingDetails(bookingsData);
      } catch (error) {
        setError(error.message); // Set error message to display
        console.error('Error fetching booking details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.id_user) {
      fetchBookingDetails();
    } else {
      setLoading(false);
    }
  }, [user]); // Pastikan useEffect bergantung pada user

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Tampilkan pesan error langsung
  }

  if (bookingDetails.length === 0) {
    return <div>No booking details found for user ID: {user && user.id_user ? user.id_user : 'Unknown'}</div>; // Tampilkan ID pengguna jika tersedia, jika tidak, tampilkan 'Unknown'
  }

  return (
    <div>
      {bookingDetails.map((booking) => (
        <div key={booking.id_booking} className="order-tracking">
          <div className="order-progress">
            <div className="order-info">
              <h2>Lacak Pesanan</h2>
              <p>ID Pesanan <strong>{booking.id_booking}</strong></p>
              <p>Tanggal Pesanan <strong>{new Date(booking.tanggal_booking).toLocaleDateString()}</strong></p>
              <p>Nama Pemesan <strong>{booking.nama}</strong></p>
            </div>
            <div className="progress-container">
              <div className="progress">
                <div className={`circle ${booking.status_pembayaran === 'Proses' ? 'red' : ''}`}></div>
                <span className="line"></span>
                <div className={`circle ${booking.status_pembayaran === 'Dikemas' ? 'orange' : ''}`}></div>
                <span className="line"></span>
                <div className={`circle ${booking.status_pembayaran === 'Selesai' ? 'green' : ''}`}></div>
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
  <p><span className="circle green"></span> Pesanan sudah selesai dan Ambil Pesanan ke Toko Kami</p>
</div>

        </div>
      ))}
    </div>
  );
}

export default OrderCart;
