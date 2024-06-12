import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID Booking</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>ID Produk</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Jumlah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookingDetails.map((detail) => (
              <TableRow key={detail.id_produk}>
                <TableCell>{detail.id_booking}</TableCell>
                <TableCell>{detail.nama_user}</TableCell>
                <TableCell>{detail.id_produk}</TableCell>
                <TableCell>{detail.nama_produk}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingDetail;
