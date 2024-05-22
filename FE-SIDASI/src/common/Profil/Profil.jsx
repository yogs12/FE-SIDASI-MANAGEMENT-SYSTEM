import React from 'react';
import { Link } from 'react-router-dom';
import './Profil.css';

function Profil() {
    return (
        <div className='container-fluid'>
            <h4 className="text-left">Detail Profil</h4>
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
                    <p>Babayo</p>
                </div>
                <div className="detail-item">
                    <label className="labels">Phone Number</label>
                    <p>08156848385</p>
                </div>
                <div className="detail-item">
                    <label className="labels">Address</label>
                    <p>Jl.Sidasi Simpang Lima</p>
                </div>
                <div className="detail-item">
                    <label className="labels">Email</label>
                    <p>Sidasi@gmail.com</p>
                </div>
                <div className="text-center">
                <Link to="/EditProfil">
                            <button className="btn btn-primary profil-button" type="button">Edit Profil</button>
                        </Link>
                </div>
            </div>
        </div>
 </div>  
  );
}

export default Profil;
