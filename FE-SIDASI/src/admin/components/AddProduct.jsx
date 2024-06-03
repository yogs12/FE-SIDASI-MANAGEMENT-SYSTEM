// src/components/AddProduct.js
import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Grid, MenuItem, Typography, Container } from '@mui/material';
import './AddProduct.css'; 

const AddProduct = ({ addProduct }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stok: '',
    unit: '',
    info: '',
    photo: null,
    photoURL: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      photo: file,
      photoURL: URL.createObjectURL(file)
    }));
  };

  const handleSave = () => {
    addProduct(newProduct);
    setSnackbarOpen(true);
    // Reset form after saving
    setNewProduct({
      name: '',
      category: '',
      price: '',
      stok: '',
      unit: '',
      info: '',
      photo: null,
      photoURL: ''
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Tambah Produk
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6} className="photo-upload">
          <Button variant="contained" component="label">
            Tambah Foto
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {newProduct.photoURL && (
            <img src={newProduct.photoURL} alt="Product Preview" className="photo-preview" />
          )}
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
      <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
        <Grid item>
          <Button onClick={() => window.history.back()} color="secondary">
            Batal
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleSave} color="primary" variant="contained">
            Simpan
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Produk berhasil ditambahkan!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProduct;
