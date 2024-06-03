import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Grid, Typography, Container } from '@mui/material';
import './EditProduct.css';

const EditProduct = ({ products, updateProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    category: '',
    price: '',
    stok: '',
    unit: '',
    info: '',
    photo: null,
    photoURL: ''
  });

  useEffect(() => {
    const product = products.find(product => product.id === parseInt(id));
    if (product) {
      setUpdatedProduct(product);
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      photo: e.target.files[0],
      photoURL: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSave = () => {
    updateProduct(updatedProduct);
    navigate('/admin/produk');
  };

  if (!updatedProduct) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Produk
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <p>Nama Produk</p>
          <TextField
            margin="dense"
            label=""
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={updatedProduct.name}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} className="photo-upload">
          <Button variant="contained" component="label">
            Tambah Foto
            <input
              accept="image/*"
              type="file"
              hidden
              onChange={handlePhotoChange}
            />
          </Button>
          {updatedProduct.photoURL && (
            <img src={updatedProduct.photoURL} alt="Product Preview" className="photo-preview" />
          )}
        </Grid>
        <Grid item xs={12}>
          <p>Kategori</p>
          <TextField
            margin="dense"
            label=""
            select
            fullWidth
            variant="outlined"
            name="category"
            value={updatedProduct.category}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
          >
            <MenuItem value="Elektronik">Elektronik</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Makanan">Makanan</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
        <p>Harga</p>
          <TextField
            margin="dense"
            label=""
            type="number"
            fullWidth
            variant="outlined"
            name="price"
            value={updatedProduct.price}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}

          />
        </Grid>
        <Grid item xs={6}>
        <p>Stok Barang</p>
          <TextField
            margin="dense"
            label=""
            type="number"
            fullWidth
            variant="outlined"
            name="stok"
            value={updatedProduct.stok}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
          />
        </Grid>
        <Grid item xs={6}>
        <p>Satuan Barang</p>
          <TextField
            margin="dense"
            label=""
            select
            fullWidth
            variant="outlined"
            name="unit"
            value={updatedProduct.unit}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
          >
            <MenuItem value="Pcs">Pcs</MenuItem>
            <MenuItem value="Kg">Kg</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
        <p>Status</p>
          <TextField
            margin="dense"
            label=""
            select
            fullWidth
            variant="outlined"
            name="info"
            value={updatedProduct.info}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff" // Ganti dengan warna putih yang Anda inginkan
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
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
    </Container>
  );
};

export default EditProduct;
