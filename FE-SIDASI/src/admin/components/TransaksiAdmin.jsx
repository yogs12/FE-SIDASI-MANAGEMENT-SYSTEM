import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const TransaksiAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transaksis/transaksi'); // Mengganti URL
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
      await axios.delete(`http://localhost:3000/transaksis/transaksi/${orderToDelete.id_transaksi}`); // Mengganti URL
      setOrders(orders.filter((order) => order.id_transaksi !== orderToDelete.id_transaksi));
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleStatusChange = async (event, order) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`http://localhost:3000/transaksis/transaksi/${order.id_transaksi}`, {
        status_pembayaran: newStatus
      });
      setOrders(orders.map((o) => (o.id_transaksi === order.id_transaksi ? { ...o, status_pembayaran: newStatus } : o)));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleValidationChange = async (event, order) => {
    const newValidationStatus = event.target.value;
    try {
      await axios.put(`http://localhost:3000/transaksis/transaksi/${order.id_transaksi}`, {
        status_validasi: newValidationStatus
      });
      setOrders(orders.map((o) => (o.id_transaksi === order.id_transaksi ? { ...o, status_validasi: newValidationStatus } : o)));
    } catch (error) {
      console.error('Error updating validation status:', error);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Proses':
        return { color: 'red' };
      case 'Dikemas':
        return { color: 'orange' };
      case 'Selesai':
        return { color: 'green' };
      case 'Belum':
        return { color: 'red' };
      default:
        return {};
    }
  };

  return (
    <div>
      <h1>Transaksi</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID Pesanan</TableCell>
              <TableCell>ID Pengguna</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>Tanggal Booking</TableCell>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>Status Validasi</TableCell>
              <TableCell>Detail Barang</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id_transaksi}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id_transaksi}</TableCell>
                <TableCell>{order.id_user}</TableCell>
                <TableCell>{order.nama}</TableCell>
                <TableCell>{order.tanggal_booking}</TableCell>
                <TableCell> {order.status_pembayaran} </TableCell>
                <TableCell>
                  <Select
                    value={order.validasi}
                    onChange={(event) => handleValidationChange(event, order)}
                    style={getStatusStyle(order.validasi)}
                  >
                    <MenuItem value="Belum" style={{ color: 'red' }}>Belum</MenuItem>
                    <MenuItem value="Selesai" style={{ color: 'green' }}>Selesai</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Link to={`/admin/pesanan/detail/${order.id_booking}`}>Detail</Link>
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
          Apakah Anda yakin ingin menghapus pesanan dengan ID {orderToDelete?.id_transaksi}?
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
    </div>
  );
};

export default TransaksiAdmin;
