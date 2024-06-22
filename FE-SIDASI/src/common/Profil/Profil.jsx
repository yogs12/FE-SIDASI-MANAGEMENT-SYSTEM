import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profil.css';

function Profil() {
    const [profile, setProfile] = useState(null); // State untuk menyimpan data profil
    const [loading, setLoading] = useState(true); // State untuk menangani loading
    const [error, setError] = useState(null); // State untuk menangani error

    useEffect(() => {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage (pastikan sudah disimpan saat login)

        if (!token) {
            setError('Token not found'); // Handle jika token tidak ditemukan
            setLoading(false); // Set loading menjadi false karena tidak ada token
            return;
        }

        // Fungsi untuk mengambil data profil dari backend
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:3000/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await response.json();
                setProfile(data); // Mengambil data profil dari respons
                setLoading(false); // Set loading menjadi false setelah data berhasil dimuat
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Failed to fetch profile');
                setLoading(false); // Set loading menjadi false jika terjadi error
            }
        };

        fetchProfile(); // Panggil fungsi fetchProfile saat komponen Profil dimuat
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading indicator jika data profil sedang dimuat
    }

    if (error) {
        return <p>{error}</p>; // Tampilkan pesan error jika terjadi kesalahan saat fetching data
    }

    return (
        <div className='container-fluid'>
            <h4 className="text-left">Detail Profil</h4>
            <div className="profil-container">
                <div className="left-box">
                    <img
                        className="profil-photo"
                        src={`http://localhost:3000${profile.foto}`} // Menggunakan URL foto dari data profil
                        alt="profile"
                    />
                </div>
                <div className="right-box">
                    <div className="detail-item">
                        <label className="labels">Name</label>
                        <p>{profile.nama}</p> {/* Menampilkan nama dari data profil */}
                    </div>
                    <div className="detail-item">
                        <label className="labels">Phone Number</label>
                        <p>{profile.no_hp}</p> {/* Menampilkan nomor hp dari data profil */}
                    </div>
                    <div className="detail-item">
                        <label className="labels">Address</label>
                        <p>{profile.alamat}</p> {/* Menampilkan alamat dari data profil */}
                    </div>
                    <div className="detail-item">
                        <label className="labels">Email</label>
                        <p>{profile.email}</p> {/* Menampilkan email dari data profil */}
                    </div>
                    <div className="text-center">
                        <Link to="/editprofil">
                            <button className="btn btn-primary profil-button" type="button">Edit Profil</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profil;
