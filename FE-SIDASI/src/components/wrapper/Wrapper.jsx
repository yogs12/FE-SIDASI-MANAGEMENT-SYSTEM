import React from "react";
import "./style.css";

const Wrapper = () => {
  const data = [
    {
      image: "/public/images/Wrapper/Ingredients.png",
      title: "Pesan Barang Lebih Cepat Dan Mudah",
    },
    {
      image: "/public/images/Wrapper/Info.png",
      title: "Liat Informasi Stok Barang Lengkap",
      
    },
    {
      image: "/public/images/Wrapper/Easy.png",
      title: "Kelola Penjualan Lebih Mudah",
    },
    {
      image: "/public/images/Wrapper/Increase.png",
      title: "Peningkatan Pelayanan Pelanggan",
    },
  ];
  return (
    <>
      <section className='wrapper background'>
        <div className='container grid2'>
          {data.map((val, index) => (
            <div className='product' key={index}>
              <div className='img icon-circle'>
                <img src={val.image} alt={val.title} />
              </div>
              <h3>{val.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Wrapper;
