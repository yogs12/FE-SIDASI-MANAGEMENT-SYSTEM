// src/components/PesananAdmin.jsx

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

const PesananAdmin = ({ orders }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleDeleteDialogOpen = (order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  const handleDeleteOrder = () => {
    // Tambahkan logika untuk menghapus pesanan
    console.log(`Menghapus pesanan dengan ID: ${orderToDelete.id}`);
    handleDeleteDialogClose();
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
              <TableCell>Status</TableCell>
              <TableCell>Detail Barang</TableCell>
              <TableCell>Bukti Pembayaran</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.userId}</TableCell>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  {/* Tampilkan detail barang */}
                  <Link to={`/admin/pesanan/detail/${order.id}`}>Lihat Detail</Link>
                </TableCell>
                <TableCell>
                  {/* Tampilkan bukti pembayaran */}
                  <img src={order.paymentProof} alt="Bukti Pembayaran" style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteDialogOpen(order)}>Hapus</Button>
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
          Apakah Anda yakin ingin menghapus pesanan dengan ID {orderToDelete?.id}?
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
