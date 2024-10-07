// Login.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Swal from 'sweetalert2';
import GlobalContext from '../../context/GlobalContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useContext(GlobalContext); // Get setUserId from context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Set userId in global context
            setUserId(user.userId); // Assuming user object contains userId

            Swal.fire({
                title: "Success",
                text: "Login successfully!",
                icon: "success"
            });

            navigate('/month'); // Navigate to calendar after successful login
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to login. Please try again.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
