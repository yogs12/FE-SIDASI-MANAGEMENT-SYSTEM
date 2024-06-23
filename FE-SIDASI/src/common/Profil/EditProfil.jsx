import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './profil.css';

function EditProfil() {
    const [profile, setProfile] = useState({
        nama: '',
        no_hp: '',
        alamat: '',
        email: '',
        foto: ''
    }); // State untuk menyimpan data profil
    const [loading, setLoading] = useState(true); // State untuk menangani loading
    const [error, setError] = useState(null); // State untuk menangani error
    const fileInputRef = useRef(null); // Ref untuk file input
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({
                ...profile,
                foto: URL.createObjectURL(file) // Tampilkan pratinjau foto baru
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // Ambil token dari localStorage
        const file = fileInputRef.current.files[0]; // Ambil file foto baru

        if (!token) {
            setError('Token not found');
            return;
        }

        const formData = new FormData();
        formData.append('nama', profile.nama);
        formData.append('no_hp', profile.no_hp);
        formData.append('alamat', profile.alamat);
        formData.append('email', profile.email);
        if (file) {
            formData.append('foto', file); // Tambahkan file foto jika ada
        }

        try {
            const response = await fetch('http://localhost:3000/auth/user', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const data = await response.json();
            setProfile(data); // Perbarui data profil dengan respons
            navigate('/Profil'); // Arahkan pengguna kembali ke halaman profil setelah berhasil mengedit
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile');
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Tampilkan loading indicator jika data profil sedang dimuat
    }

    if (error) {
        return <p>{error}</p>; // Tampilkan pesan error jika terjadi kesalahan saat fetching data
    }

    return (
        <div className='container-fluid'>
            <h4 className="text-left">Edit Profil</h4>
            <div className="profil-container">
                <div className="left-box">
                    <img
                        className="profil-photo"
                        src={profile.foto && profile.foto.startsWith('http') ? profile.foto : `http://localhost:3000${profile.foto}`} // Menggunakan URL foto dari data profil
                        alt="profile"
                        onClick={() => fileInputRef.current.click()} // Klik input file saat gambar diklik
                    />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                </div>
                <div className="right-box">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="labels">Nama Pengguna</label>
                            <input
                                type="text"
                                name="nama"
                                value={profile.nama}
                                onChange={handleChange}
                                className="form-control detail-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="labels">Phone Number</label>
                            <input
                                type="text"
                                name="no_hp"
                                value={profile.no_hp}
                                onChange={handleChange}
                                className="form-control detail-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="labels">Address</label>
                            <input
                                type="text"
                                name="alamat"
                                value={profile.alamat}
                                onChange={handleChange}
                                className="form-control detail-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="labels">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                className="form-control detail-input"
                            />
                        </div>
                        <div className="text-center">
                            <button className="profil-button" type="submit">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfil;
