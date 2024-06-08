import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const PelangganAdmin = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/customers'); // Update the URL with the correct endpoint
        setCustomers(response.data);
        setFilteredCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        // Static data for demonstration
        const staticCustomers = [
          {
            id: 1,
            idPelanggan: '675732344',
            foto: '/path/to/foto1.jpg',
            nama: 'Siti Suminingsih',
            nomorHandphone: '0812-3456-7890',
            alamat: 'Jl.Dieng KM 12, Mojotengah, Wonosobo'
          },
          {
            id: 2,
            idPelanggan: '695732344',
            foto: '/path/to/foto2.jpg',
            nama: 'Narti Ayu Laksmini',
            nomorHandphone: '0856-7890-1234',
            alamat: 'Jl.A Yani No.23, Wonosobo'
          },
          {
            id: 3,
            idPelanggan: '685732344',
            foto: '/path/to/foto3.jpg',
            nama: 'Bramasta aditya',
            nomorHandphone: '0821-2345-6789',
            alamat: 'Jl.Ahmad Dahlan,No.29 Wonosobo'
          },
          {
            id: 4,
            idPelanggan: '685732349',
            foto: '/path/to/foto4.jpg',
            nama: 'Afro Pratama',
            nomorHandphone: '0878-1234-5678',
            alamat: 'Puntuksari, Selomerto, Wonosobo'
          }
        ];
        setCustomers(staticCustomers);
        setFilteredCustomers(staticCustomers);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, customers]);

  return (
    <div>
      <h1>Pelanggan Admin</h1>
      <div className="search-add-container">
        <TextField
        className="search-input"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputLabelProps={{
          style: { textAlign: 'center', fontSize: '14px' }
        }}
      />
    </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Id Pelanggan</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>Nomor Handphone</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.idPelanggan}</TableCell>
                <TableCell>
                  <img src={customer.foto} alt={customer.nama} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{customer.nama}</TableCell>
                <TableCell>{customer.nomorHandphone}</TableCell>
                <TableCell>{customer.alamat}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" style={{ marginRight: '5px' }}>
                    <FontAwesomeIcon icon={faEye} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PelangganAdmin;
