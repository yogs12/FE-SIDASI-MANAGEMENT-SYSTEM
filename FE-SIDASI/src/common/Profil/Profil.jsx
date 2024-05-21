import React from 'react';
import "./Profil.css"; 

function Profil() {
    return (
        <div className="container d_flex">
        {/* <div className="container rounded bg-white mt-5 mb-5"> */}
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile" />
                        <span className="font-weight-bold">Edogaru</span>
                    </div>
                </div>
                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Detail Profil</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-12">
                                <label className="labels">Name</label>
                                <input type="text" className="form-control" placeholder="Enter your name" value="" />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Nomor Hp</label>
                                <input type="text" className="form-control" placeholder="Enter your phone number" value="" />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Alamat</label>
                                <input type="text" className="form-control" placeholder="Enter address line 1" value="" />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Email</label>
                                <input type="text" className="form-control" placeholder="Enter your email ID" value="" />
                            </div>
                        </div>
                        <div className="mt-5 text-center">
                            <button className="btn btn-primary profile-button" type="button">Edit Profil</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profil;
