import React, { useState, useEffect } from 'react';
import './Profil.css';
import axios from 'axios'; // Import axios untuk HTTP requests

function EditProfil() {
    const [idProfile, setIdProfile] = useState(null); // State untuk menyimpan ID profil yang sedang di-edit
    const [name, setName] = useState("Babayo");
    const [phoneNumber, setPhoneNumber] = useState("08156848385");
    const [address, setAddress] = useState("Jl.Sidasi Simpang Lima");
    const [email, setEmail] = useState("Sidasi@gmail.com");
    const [photo, setPhoto] = useState(null); // State untuk menyimpan foto profil

    useEffect(() => {
        // Contoh pengambilan profil dari backend saat komponen dimuat
        fetchProfile(); // Memanggil fungsi untuk mengambil profil dari backend
    }, []); // Menggunakan array kosong untuk memastikan efek hanya dijalankan sekali saat komponen dimuat

    // Fungsi untuk mengambil profil dari backend berdasarkan ID
    const fetchProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/profils/${idProfile}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Mengirim token JWT sebagai header Authorization
                }
            });
            const data = response.data.data[0]; // Ambil data profil dari respons
            setName(data.nama);
            setPhoneNumber(data.no_hp);
            setAddress(data.alamat);
            setEmail(data.email);
            setPhoto(data.foto); // Set foto profil jika tersedia
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Tambahkan logika untuk menangani kesalahan fetch profil
        }
    };

    // Fungsi untuk menyimpan perubahan profil
    const saveProfile = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/profils/${idProfile}`, {
                nama: name,
                no_hp: phoneNumber,
                alamat: address,
                email: email,
                foto: photo // Jika tidak ada perubahan foto, tidak perlu menyertakan dalam body request
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}` // Mengirim token JWT sebagai header Authorization
                }
            });
            console.log('Profile updated:', response.data);
            // Tambahkan logika untuk menampilkan pesan sukses atau melakukan tindakan setelah profil diperbarui
        } catch (error) {
            console.error('Error updating profile:', error);
            // Tambahkan logika untuk menangani kesalahan update profil
        }
    };

    return (
        <div className='container-fluid'>
            <h4 className="text-left">Edit Profil</h4>
            <div className="profil-container">
                <div className="left-box">
                    <img 
                        className="profil-photo" 
                        src={photo || "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"} 
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
                        <button className="btn btn-primary profil-button" type="button" onClick={saveProfile}>Simpan</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProfil;
