import React from 'react';
import { useParams } from 'react-router-dom';

const DetailProduct = ({ products }) => {
  const { id } = useParams();
  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div>Produk tidak ditemukan</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.cover} alt={product.name} />
      <p>Kategori: {product.category}</p>
      <p>Harga: {product.price}</p>
      <p>Stok: {product.stok}</p>
      <p>Satuan: {product.unit}</p>
      <p>Status: {product.info}</p>
    </div>
  );
};

export default DetailProduct;
