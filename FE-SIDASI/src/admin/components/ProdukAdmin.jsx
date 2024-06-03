import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Snackbar, Alert, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGauge, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './produk_admin.css';

const ProdukAdmin = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stok: '',
    unit: '',
    info: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Add the new product to the product list (this is just an example, you should handle this according to your data management)
    setFilteredProducts((prevProducts) => [...prevProducts, { ...newProduct, id: prevProducts.length + 1 }]);
    handleClose();
    setSnackbarOpen(true); // Show success notification
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
            style: { textAlign: 'center', fontSize: '14px' } // Atur label ke tengah dan ukuran teks
          }}
        />
        <Button variant="contained" color="primary" className="add-button" onClick={handleOpen}>
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
              <TableRow key={product.id}>
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
                  <IconButton aria-label="detail" color="primary" style={{ marginRight: '5px' }}>
                    <FontAwesomeIcon icon={faGauge} style={{ fontSize: '16px' }} />
                  </IconButton>
                  <IconButton aria-label="edit" color="secondary" style={{ marginRight: '5px' }}>
                    <FontAwesomeIcon icon={faEdit} style={{ fontSize: '16px' }} />
                  </IconButton>
                  <IconButton aria-label="hapus" color="error">
                    <FontAwesomeIcon icon={faTrash} style={{ fontSize: '16px' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Tambah Produk</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Nama Produk"
                type="text"
                fullWidth
                variant="outlined"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Kategori"
                select
                fullWidth
                variant="outlined"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
              >
                <MenuItem value="Elektronik">Elektronik</MenuItem>
                <MenuItem value="Fashion">Fashion</MenuItem>
                <MenuItem value="Makanan">Makanan</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Harga"
                type="number"
                fullWidth
                variant="outlined"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Stok"
                type="number"
                fullWidth
                variant="outlined"
                name="stok"
                value={newProduct.stok}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Satuan"
                select
                fullWidth
                variant="outlined"
                name="unit"
                value={newProduct.unit}
                onChange={handleChange}
              >
                <MenuItem value="Pcs">Pcs</MenuItem>
                <MenuItem value="Kg">Kg</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Status"
                select
                fullWidth
                variant="outlined"
                name="info"
                value={newProduct.info}
                onChange={handleChange}
              >
                <MenuItem value="Tersedia">Tersedia</MenuItem>
                <MenuItem value="Habis">Habis</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Batal
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
  open={snackbarOpen}
  autoHideDuration={6000}
  onClose={handleSnackbarClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Menentukan posisi notifikasi di tengah atas
>
  <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
    Produk berhasil ditambahkan!
  </Alert>
</Snackbar>

    </div>
  );
};

export default ProdukAdmin;
