// src/services/userService.js

import axios from 'axios';

const fetchUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/auth/user', {
            withCredentials: true,
        });
        console.log('User data:', response.data);
        return response.data; // Jika Anda ingin mengembalikan data pengguna
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error; // Anda bisa melempar error ini untuk diteruskan ke luar
    }
};

export { fetchUserData };
