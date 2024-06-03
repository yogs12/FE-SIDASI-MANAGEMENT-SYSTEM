// src/components/ProdukAdmin.js

import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Snackbar, Alert, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './produk_admin.css';

const ProdukAdmin = ({ products, addProduct, updateProduct, deleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleDeleteDialogOpen = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    deleteProduct(productToDelete.id); // Pastikan fungsi deleteProduct berfungsi dengan benar
    handleDeleteDialogClose();
  };

  return (
    <div>
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
        <Button variant="contained" color="primary" className="add-button" onClick={() => navigate('/admin/produk/add')}>
          Tambah Produk
        </Button>
      </div>
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
            {filteredProducts.map((product, index) => (
              <TableRow key={product.id} className="table-row">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={product.cover} alt={product.name} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.stok}</TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell>{product.info}</TableCell>
                <TableCell>
                  <Link to={`/admin/produk/detail/${product.id}`}>
                    <IconButton aria-label="detail" color="" style={{ marginRight: '5px' }}>
                      <FontAwesomeIcon icon={faGauge} style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/produk/edit/${product.id}`}>
                    <IconButton aria-label="edit" color="" style={{ marginRight: '5px' }}>
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Link>
                    <IconButton aria-label="hapus" color="" onClick={() => handleDeleteDialogOpen(product)}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
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
        <DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus produk {productToDelete?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">
            Batal
          </Button>
          <Button onClick={handleDeleteProduct} color="error" variant="contained">
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProdukAdmin;
