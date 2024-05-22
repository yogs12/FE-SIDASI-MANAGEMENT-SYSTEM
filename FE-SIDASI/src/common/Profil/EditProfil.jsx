import React, { useState } from 'react';
import './Profil.css';

function EditProfil() {
    const [name, setName] = useState("Babayo");
    const [phoneNumber, setPhoneNumber] = useState("08156848385");
    const [address, setAddress] = useState("Jl.Sidasi Simpang Lima");
    const [email, setEmail] = useState("Sidasi@gmail.com");

    return (
        <div className='container-fluid'>
            <h4 className="text-left">Edit Profil</h4>
            <div className="profil-container">
                <div className="left-box">
                    <img 
                        className="profil-photo" 
                        src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
                        alt="profile" 
                    />
                </div>
                <div className="right-box">
                    <div className="detail-item">
                        <label className="labels">Name</label>
                        <div>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="detail-item">
                        <label className="labels">Phone Number</label>
                        <div>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={phoneNumber} 
                                onChange={(e) => setPhoneNumber(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="detail-item">
                        <label className="labels">Address</label>
                        <div>
                            <input 
                                type="text" 
                                className="form-control" 
                                value={address} 
                                onChange={(e) => setAddress(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="detail-item">
                        <label className="labels">Email</label>
                        <div>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary profil-button" type="button">Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfil;
