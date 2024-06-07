import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Grid, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import './EditProduct.css';

const EditProduct = ({ updateProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updatedProduct, setUpdatedProduct] = useState({
    nama_produk: '',
    kategori: '',
    harga: '',
    stok: '',
    satuan: '',
    status: '',
    foto_produk: null,
    fotoURL: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/produks/${id}`);
      if (response.data && response.data.data && response.data.data.length > 0) {
        const product = response.data.data[0];
        setUpdatedProduct({
          ...product,
          fotoURL: `http://localhost:3000${product.foto_produk}`,
          status: product.status === 'Tersedia' ? 'Available' : 'Out of Stock'
        });
      } else {
        setUpdatedProduct(null);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 404) {
        console.error(`Product with ID ${id} not found`);
        setUpdatedProduct(null);
      } else {
        console.error('Error fetching product', error);
        setError('Terjadi kesalahan saat mengambil data produk.');
      }
    }
  };

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
      foto_produk: e.target.files[0],
      fotoURL: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in updatedProduct) {
        formData.append(key, updatedProduct[key]);
      }
      await updateProduct(id, formData);
      navigate('/admin/produk');
    } catch (error) {
      console.error('Error updating product', error);
      setError('Terjadi kesalahan saat mengupdate data produk.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
            name="nama_produk"
            value={updatedProduct.nama_produk}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff"
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
          {updatedProduct.fotoURL && (
            <img src={updatedProduct.fotoURL} alt="Product Preview" className="photo-preview" />
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
            name="kategori"
            value={updatedProduct.kategori}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff"
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
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
          <p>Harga</p>
          <TextField
            margin="dense"
            label=""
            type="number"
            fullWidth
            variant="outlined"
            name="harga"
            value={updatedProduct.harga}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff"
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
                backgroundColor: "#ffffff"
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
            name="satuan"
            value={updatedProduct.satuan}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff"
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
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
          <p>Status</p>
          <TextField
            margin="dense"
            label=""
            select
            fullWidth
            variant="outlined"
            name="status"
            value={updatedProduct.status}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#ffffff"
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                borderColor: "#00000"
              }
            }}
          >
            <MenuItem value="Available">Tersedia</MenuItem>
            <MenuItem value="Out of Stock">Kosong</MenuItem>
          </TextField>
          </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" style={{ marginTop: '16px' }}>
        <Grid item>
          <Button onClick={() => window.history.back()} color
      ="error" variant="contained">
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
