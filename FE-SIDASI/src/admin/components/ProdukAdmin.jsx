import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ProdukAdmin = ({ products }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Foto Produk</TableCell>
            <TableCell>Nama Produk</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Stok</TableCell>
            <TableCell>Satuan</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Aksi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img src={product.cover} alt='' style={{ width: '50px', height: '50px' }} />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stok}</TableCell>
              <TableCell>{product.unit}</TableCell>
              <TableCell>{product.info}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" size="small" style={{ marginRight: '5px' }}>
                  Detail
                </Button>
                <Button variant="contained" color="secondary" size="small" style={{ marginRight: '5px' }}>
                  Edit
                </Button>
                <Button variant="contained" color="error" size="small">
                  Hapus
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProdukAdmin;
