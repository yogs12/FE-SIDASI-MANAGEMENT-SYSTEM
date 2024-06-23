import React, { useState, useEffect, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Paper } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import './BookingDetail.css';

const BookingDetail = () => {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bookings/booking-details/${id}`);
        setBookingDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBookingDetails();
  }, [id]);

  return (
    <div>
      <h1>Detail Pesanan</h1>
      <PrintBookingDetail bookingDetails={bookingDetails} />
    </div>
  );
};

const BookingReceipt = forwardRef((props, ref) => {
  const { bookingDetails } = props;

  const calculateTotalPrice = () => {
    return bookingDetails.reduce((total, detail) => total + detail.quantity * detail.harga, 0);
  };

  return (
    <div ref={ref} style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Paper style={{ padding: '20px' }}>
        <h2>Struk Pembelian</h2>
        <div>ID Booking: {bookingDetails[0]?.id_booking}</div>
        <div>Nama Pemesan: {bookingDetails[0]?.nama_pengguna}</div>
        <div>Tanggal Booking: {new Date(bookingDetails[0]?.tanggal_booking).toLocaleDateString()}</div>
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID Produk</th>
              <th>Nama Produk</th>
              <th>Jumlah</th>
              <th>Satuan</th>
              <th>Harga</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.map((detail) => (
              <tr key={detail.id_produk}>
                <td>{detail.id_produk}</td>
                <td>{detail.nama_produk}</td>
                <td>{detail.quantity}</td>
                <td>{detail.satuan}</td>
                <td>Rp.{detail.harga}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
          Total Harga: Rp.{calculateTotalPrice()}.00
        </div>
        <div style={{ marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>
          Terimakasih Telah Berlangganan Di Tempat Kami
          <br />
          ------------Semoga anda berbahagia-----------
        </div>
      </Paper>
    </div>
  );
});

const PrintBookingDetail = ({ bookingDetails }) => {
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <BookingReceipt ref={componentRef} bookingDetails={bookingDetails} />
      <Button variant="contained" color="primary" onClick={handlePrint} style={{ marginTop: '20px' }}>
        Print PDF
      </Button>
    </div>
  );
};

export default BookingDetail;
