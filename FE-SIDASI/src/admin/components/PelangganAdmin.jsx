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
        const token = localStorage.getItem('token'); // Assume the token is stored in local storage
        const response = await axios.get('http://localhost:3000/auth/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data) {
          setCustomers(response.data);
          setFilteredCustomers(response.data); // Initialize filteredCustomers with valid data
        } else {
          console.error('Error fetching customers: Data received is not in the expected format');
          console.log(response.data); // Log response to see what is received
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        console.log(error.response.data); // Log error message from server
      }
    };

    fetchCustomers();
  }, []);

  const handleDeleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Assume the token is stored in local storage
      await axios.delete(`http://localhost:3000/auth/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove customer from state after successful deletion
      setCustomers(customers.filter(customer => customer.id_user !== id));
      setFilteredCustomers(filteredCustomers.filter(customer => customer.id_user !== id));
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
      <h1>Pelanggan</h1>
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
              <TableCell>Id Pengguna</TableCell>
              <TableCell>Foto</TableCell>
              <TableCell>Nama Pengguna</TableCell>
              <TableCell>Nomor Handphone</TableCell>
              <TableCell>Alamat</TableCell>
              <TableCell>Aksi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow key={customer.id_user}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.id_user}</TableCell>
                <TableCell>
                  <img src={`http://localhost:3000${customer.foto}`} alt={customer.nama} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                </TableCell>
                <TableCell>{customer.nama}</TableCell>
                <TableCell>{customer.no_hp}</TableCell>
                <TableCell>{customer.alamat}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" style={{ marginRight: '5px' }}>
                    <FontAwesomeIcon icon={faEye} />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => handleDeleteCustomer(customer.id_user)}>
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
