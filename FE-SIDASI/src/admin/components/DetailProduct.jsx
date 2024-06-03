import React from 'react';
import { useParams } from 'react-router-dom';
import './DetailProduct.css'; // Import file CSS untuk styling (DetailProduct_detail.css)

const DetailProduct = ({ products }) => {
  const { id } = useParams();
  const product = products.find(product => product.id === parseInt(id));

  if (!product) {
    return <div className="detail-product_detail">Produk tidak ditemukan</div>; // Menggunakan kelas CSS untuk styling
  }

  return (
    <div className="detail-product_detail">
      <h1 className="product-name_detail">{product.name}</h1>
      <div className="product-info_detail">
        <img className="product-image_detail" src={product.cover} alt={product.name} />
        <div className="product-details_detail">
          <p><strong>Kategori:</strong> {product.category}</p>
          <p><strong>Harga:</strong> {product.price}</p>
          <p><strong>Stok:</strong> {product.stok}</p>
          <p><strong>Satuan:</strong> {product.unit}</p>
          <p><strong>Status:</strong> {product.info}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
