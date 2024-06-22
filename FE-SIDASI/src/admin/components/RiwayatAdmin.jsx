import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RiwayatAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/riwayats/riwayat');
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
      await axios.delete(`http://localhost:3000/riwayats/riwayat/${orderToDelete.id_riwayat}`);
      setOrders(orders.filter((order) => order.id_riwayat !== orderToDelete.id_riwayat));
      handleDeleteDialogClose();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h1>Riwayat</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>ID Riwayat</TableCell>
              <TableCell>ID Pengguna</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>Tanggal</TableCell>
              <TableCell>Status Pembayaran</TableCell>
              <TableCell>Validasi</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id_riwayat}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id_riwayat}</TableCell>
                <TableCell>{order.id_user}</TableCell>
                <TableCell>{order.nama}</TableCell>
                <TableCell>{order.tanggal_booking}</TableCell>
                <TableCell>{order.status_pembayaran}</TableCell>
                <TableCell>{order.validasi}</TableCell>
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
        <DialogTitle>Konfirmasi Hapus Riwayat</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus riwayat dengan ID {orderToDelete?.id_riwayat}?
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

export default RiwayatAdmin;
