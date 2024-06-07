import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './produk_admin.css';

const ProdukAdmin = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.nama_produk.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products/produks');
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleDeleteDialogOpen = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        await axios.delete(`http://localhost:3000/products/produks/${productToDelete.id}`);
        fetchProducts(); // Refresh the product list
        handleDeleteDialogClose();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  return (
    <div>
      <h1>Produk Admin</h1>
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
                  <img src={`http://localhost:3000${product.foto_produk}`} alt={product.nama_produk} style={{ width: '50px', height: '50px' }} />
                </TableCell>
                <TableCell>{product.nama_produk}</TableCell>
                <TableCell>{product.kategori}</TableCell>
                <TableCell>{product.harga}</TableCell>
                <TableCell>{product.stok}</TableCell>
                <TableCell>{product.satuan}</TableCell>
                <TableCell>{product.status}</TableCell>
                <TableCell>
                  <Link to={`/admin/produk/detail/${product.id}`}> {/* Tautan detail produk */}
                    <IconButton aria-label="detail" style={{ marginRight: '5px' }}>
                      <FontAwesomeIcon icon={faGauge} style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/produk/edit/${product.id}`}>
                    <IconButton aria-label="edit" style={{ marginRight: '5px' }}>
                      <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
                    </IconButton>
                  </Link>
                  <IconButton aria-label="hapus" onClick={() => handleDeleteDialogOpen(product)}>
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Konfirmasi Hapus Produk</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menghapus produk {productToDelete?.nama_produk}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary" variant="contained">
            Batal
          </Button>
          <Button onClick={handleDeleteProduct} color
      ="error" variant="contained">
      Hapus
      </Button>
      </DialogActions>
      </Dialog>
      </div>
      );
      };

      export default ProdukAdmin;