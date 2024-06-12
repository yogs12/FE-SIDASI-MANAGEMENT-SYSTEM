import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './DetailProduct.css'; // Import CSS file for styling

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      console.error('ID produk tidak ditemukan di URL.');
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      console.log(`Fetching product with ID: ${id}`); // Log the ID
      const response = await axios.get(`http://localhost:3000/products/produks/${id}`);
      console.log('Product data:', response.data); // Log the response data

      if (response.data && response.data.data && response.data.data.length > 0) {
        setProduct(response.data.data[0]);
      } else {
        setProduct(null);
        setError('Data produk tidak ditemukan.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching product', error);
      setError('Terjadi kesalahan saat mengambil data produk.');
    }
  };

  if (loading) {
    return <div className="detail-product">Loading...</div>;
  }

  if (error) {
    return <div className="detail-product">{error}</div>;
  }

  if (!product) {
    return <div className="detail-product">Produk tidak ditemukan</div>;
  }

  return (
    <div className="detail-product">
      <h1 className="product-name">{product.nama_produk}</h1>
      <div className="product-info">
        <img className="product-image" src={`http://localhost:3000${product.foto_produk}`} alt={product.nama_produk} />
        <div className="product-details">
          <p><strong>Kategori:</strong> {product.kategori}</p>
          <p><strong>Harga:</strong> Rp.{product.harga}</p>
          <p><strong>Stok:</strong> {product.stok}</p>
          <p><strong>Satuan:</strong> {product.satuan}</p>
          <p><strong>Status:</strong> {product.status}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
