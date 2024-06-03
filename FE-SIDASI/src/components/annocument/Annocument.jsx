import React from "react";

const Annocument = () => {
  const mystyle = {
    width: "30%",
    height: "340px",
    boxShadow: "8px 8px 8x rgba(0, 0, 0, 0.1)", // Menambahkan efek bayangan
  };
  const mystyle1 = {
    width: "68%",
    height: "340px",
    boxShadow: "8px 8px 8px rgba(0, 0, 0, 0.1)", // Menambahkan efek bayangan
  };
  return (
    <>
      <section className="annocument background">
        <div className="container d_flex">
          <div className="img" style={mystyle}>
            <img src="./images/banner-3.png" width="100%" height="100%" alt="Banner 3" />
          </div>
          <div className="img" style={mystyle1}>
            <img src="./images/banner-4.png" width="100%" height="100%" alt="Banner 4" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Annocument;
