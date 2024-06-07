import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PesananAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

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

  return (
    <div>
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
                <TableCell>{order.status_pembayaran}</TableCell>
                <TableCell>
                  <Link to={`/admin/pesanan/detail/${order.id_booking}`}>Lihat Detail</Link>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteDialogOpen(order)} style={{ marginLeft: '10px' }}>Hapus</Button>
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
          <Button onClick={handleDeleteDialogClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleDeleteOrder} color="secondary">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PesananAdmin;
