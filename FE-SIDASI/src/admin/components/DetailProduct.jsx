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

      if (response.data && response.data.data) {
        setProduct(response.data.data);
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
    return <div className="container"><div className="detail-product">Loading...</div></div>;
  }

  if (error) {
    return <div className="container"><div className="detail-product">{error}</div></div>;
  }

  if (!product) {
    return <div className="container"><div className="detail-product">Produk tidak ditemukan</div></div>;
  }

  return (
    <div className="detail_container">
      <div className="detail-product">
        <h1 className="product-name">{product.nama_produk}</h1>
        <div className="product-info">
          <img className="product-image" src={`http://localhost:3000${product.foto_produk}`} alt={product.nama_produk} />
          <div className="product-detailsadmin">
            <div className="left">
              <h3><strong>Kategori:</strong></h3><p>{product.kategori}</p>
              <h3><strong>Harga:</strong></h3><p>Rp.{product.harga}</p>
              <h3><strong>Stok:</strong></h3><p>{product.stok}</p>
            </div>
            <div className="right">
              <h3><strong>Satuan:</strong></h3><p>{product.satuan}</p>
              <h3><strong>Status:</strong></h3><p>{product.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
