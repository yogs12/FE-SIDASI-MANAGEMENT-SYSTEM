import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const DeleteProduct = ({ products, deleteProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(product => product.id === parseInt(id));

  const handleDelete = () => {
    deleteProduct(id);
    navigate('/admin/produk');
  };

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>Hapus Produk</h1>
      <p>Anda yakin ingin menghapus produk {product.name}?</p>
      <Button onClick={handleDelete} color="error" variant="contained">
        Hapus
      </Button>
      <Button onClick={() => navigate('/admin/produk')} color="secondary" variant="contained">
        Batal
      </Button>
    </div>
  );
};

export default DeleteProduct;
