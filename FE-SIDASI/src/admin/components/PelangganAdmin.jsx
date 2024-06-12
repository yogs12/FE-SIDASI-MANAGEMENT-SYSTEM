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
        const response = await axios.get('http://localhost:3000/profils/profils');
        if (response.data && response.data.status) {
          const responseData = response.data.data;
          const customersArray = Array.isArray(responseData) ? responseData : [responseData];
          setCustomers(customersArray);
          setFilteredCustomers(customersArray);
        } else {
          console.error('Error fetching customers: Data received is not in the expected format');
          console.log(response.data); // Tambahkan log untuk melihat respons yang diterima
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        console.log(error.response.data); // Tambahkan log untuk melihat pesan kesalahan dari server
      }
    };
  
    fetchCustomers();
  }, []);
  
  const handleDeleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/profils/profils/${id}`);
      // Hapus pelanggan dari state setelah berhasil dihapus di backend
      setCustomers(customers.filter(customer => customer.id_profil !== id));
      setFilteredCustomers(filteredCustomers.filter(customer => customer.id_profil !== id));
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(customer =>
        customer.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, customers]);

  return (
    <div>
      <h1>Pelanggan </h1>
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
              <TableRow key={customer.id_profil}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.id_user}</TableCell>
                <TableCell>
                  <img src={`http://localhost:3000${customer.foto}`} alt={customer.foto} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{customer.nama}</TableCell>
                <TableCell>{customer.no_hp}</TableCell>
                <TableCell>{customer.alamat}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" style={{ marginRight: '5px' }}>
                    <FontAwesomeIcon icon={faEye} />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(customer.id_profil)}>
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
