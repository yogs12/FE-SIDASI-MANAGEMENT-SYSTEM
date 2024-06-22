import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/auth/user', {
          headers: {
            Authorization: `Bearer ${token}` // Include token in Authorization header
          }
        });

        setUser(response.data); // Set user data on successful response
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null); // Set user to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Call fetchUser on component mount
  }, []); // Empty dependency array ensures this effect runs once

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {!loading && children} {/* Render children after data is fetched */}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
