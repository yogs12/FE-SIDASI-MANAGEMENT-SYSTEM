import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const PesananAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [paymentProofDialogOpen, setPaymentProofDialogOpen] = useState(false);
  const [paymentProofImage, setPaymentProofImage] = useState(null);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bookings/bookings');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteDialogOpen = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = async () => {
    try {
      await axios.delete(`http://localhost:3000/bookings/bookings/${orderToDelete.id_booking}`);
      setOrders(orders.filter((order) => order.id_booking !== orderToDelete.id_booking));
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handlePaymentProofDialogOpen = (image) => {
    setPaymentProofImage(image);
    setPaymentProofDialogOpen(true);
  };

  const handlePaymentProofDialogClose = () => {
    setPaymentProofDialogOpen(false);
    setPaymentProofImage(null);
  };

  const handleStatusChange = async (event, order) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`http://localhost:3000/bookings/bookings/${order.id_booking}`, {
        status_pembayaran: newStatus
      });
      setOrders(orders.map((o) => (o.id_booking === order.id_booking ? { ...o, status_pembayaran: newStatus } : o)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div>
      <h1>Pesanan</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID Pesanan</TableCell>
              <TableCell>ID Pengguna</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>Tanggal Booking</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail Barang</TableCell>
              <TableCell>Bukti Pembayaran</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id_booking}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id_booking}</TableCell>
                <TableCell>{order.id_user}</TableCell>
                <TableCell>{order.nama_user}</TableCell>
                <TableCell>{order.tanggal_booking}</TableCell>
                <TableCell>
                  <Select
                    value={order.status_pembayaran}
                    onChange={(event) => handleStatusChange(event, order)}
                  >
                    <MenuItem value="Proses">Proses</MenuItem>
                    <MenuItem value="Dikemas">Dikemas</MenuItem>
                    <MenuItem value="Selesai">Selesai</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/pesanan/detail/${order.id_booking}`}>Detail</Link>
                </TableCell>
                <TableCell>
                  <Button variant="" color="" onClick={() => handlePaymentProofDialogOpen(order.bukti_pembayaran)}>Lihat</Button>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteDialogOpen(order)} >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Konfirmasi Hapus Pesanan</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus pesanan dengan ID {orderToDelete?.id_booking}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary" variant='contained'>
            Batal
          </Button>
          <Button onClick={handleDeleteOrder} color="error" variant='contained'>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={paymentProofDialogOpen}
        onClose={handlePaymentProofDialogClose}
      >
        <DialogTitle>Bukti Pembayaran</DialogTitle>
        <DialogContent>
          {paymentProofImage && <img src={paymentProofImage} alt="Bukti Pembayaran" style={{ width: '100%' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentProofDialogClose} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PesananAdmin;
