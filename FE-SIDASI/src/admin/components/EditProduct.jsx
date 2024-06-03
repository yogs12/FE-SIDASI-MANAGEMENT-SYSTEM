import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Grid } from '@mui/material';

const EditProduct = ({ products, updateProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(product => product.id === parseInt(id));

  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSave = () => {
    updateProduct(updatedProduct);
    navigate('/admin/produk');
  };

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>Edit Produk</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            margin="dense"
            label="Nama Produk"
            type="text"
            fullWidth
            variant="outlined"
            name="name"
            value={updatedProduct.name}
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
            value={updatedProduct.category}
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
            value={updatedProduct.price}
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
            value={updatedProduct.stok}
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
            value={updatedProduct.unit}
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
            value={updatedProduct.info}
            onChange={handleChange}
          >
            <MenuItem value="Tersedia">Tersedia</MenuItem>
            <MenuItem value="Habis">Habis</MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Button onClick={handleSave} color="primary" variant="contained">
        Simpan
      </Button>
    </div>
  );
};

export default EditProduct;
