import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const RiwayatAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
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

  useEffect(() => {
    setFilteredOrders(
      orders.filter((order) =>
        order.nama_user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, orders]);

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
      <h1>Riwayat Admin</h1>
      <div className="search-add-container">
        <TextField
          className="search-input"
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputLabelProps={{
            style: { textAlign: 'center', fontSize: '14px' }
          }}
        />
      </div>
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
              <TableCell>Validasi</TableCell>
              <TableCell>Detail Barang</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order, index) => (
              <TableRow key={order.id_booking}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id_booking}</TableCell>
                <TableCell>{order.id_user}</TableCell>
                <TableCell>{order.nama_user}</TableCell>
                <TableCell>{order.tanggal_booking}</TableCell>
                <TableCell>{order.status_pembayaran}</TableCell>
                <TableCell>{order.status_validasi || "Belum Valid"}</TableCell>
                <TableCell>
                  <Link to={`/admin/pesanan/detail/${order.id_booking}`}>Detail</Link>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteDialogOpen(order)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Konfirmasi Hapus Pesanan</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus pesanan dengan ID {orderToDelete?.id_booking}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary" variant="contained">
            Batal
          </Button>
          <Button onClick={handleDeleteOrder} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RiwayatAdmin;
