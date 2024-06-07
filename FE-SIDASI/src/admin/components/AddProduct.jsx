import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert, Grid, MenuItem, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css';

const AddProduct = () => {
  const [newProduct, setNewProduct] = useState({
    nama_produk: '',
    kategori: '',
    harga: '',
    stok: '',
    satuan: '',
    status: '',
    foto_produk: null,
    fotoURL: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

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
      foto_produk: file,
      fotoURL: URL.createObjectURL(file)
    }));
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(newProduct).forEach(key => {
        formData.append(key, newProduct[key]);
      });

      const response = await fetch('http://localhost:3000/products/produks', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSnackbarOpen(true);

        // Reset form after saving
        setNewProduct({
          nama_produk: '',
          kategori: '',
          harga: '',
          stok: '',
          satuan: '',
          status: '',
          foto_produk: null,
          fotoURL: ''
        });

        // Wait for snackbar to show
        setTimeout(() => {
          navigate('/admin/produk');
        }, 2000); // 2 seconds delay before navigating
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (optional)
    }
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
            name="nama_produk"
            value={newProduct.nama_produk}
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
          {newProduct.fotoURL && (
            <img src={newProduct.fotoURL} alt="Product Preview" className="photo-preview" />
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Kategori"
            select
            fullWidth
            variant="outlined"
            name="kategori"
            value={newProduct.kategori}
            onChange={handleChange}
          >
           <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Bahan Baku">Bahan Baku</MenuItem>
            <MenuItem value="Bahan Unik">Bahan Unik</MenuItem>
            <MenuItem value="Makanan">Makanan</MenuItem>
            <MenuItem value="Minuman">Minuman</MenuItem>
            <MenuItem value="Kosmetik">Kosmetik</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            label="Harga"
            type="number"
            fullWidth
            variant="outlined"
            name="harga"
            value={newProduct.harga}
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
            name="satuan"
            value={newProduct.satuan}
            onChange={handleChange}
          >
            <MenuItem value="Pcs">Pcs</MenuItem>
            <MenuItem value="Kg">Kg</MenuItem>
            <MenuItem value="Kaleng">Kaleng</MenuItem>
            <MenuItem value="Butir">Butir</MenuItem>
            <MenuItem value="Dus">Dus</MenuItem>
            <MenuItem value="Box">Box</MenuItem>
            <MenuItem value="Peti">Peti</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            variant="outlined"
            name="status"
            value={newProduct.status}
            onChange={handleChange}
          >
            <MenuItem value="Tersedia">Tersedia</MenuItem>
            <MenuItem value="Kosong">Kosong</MenuItem>
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
