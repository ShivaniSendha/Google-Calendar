import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import swal from 'sweetalert2';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', { username, password });
            console.log('response', response);

            if (response.status == 201) {
                swal.fire({
                    title: "Success",
                    text: "Signup Successfully done!",
                    icon: "success"
                });
                navigate('/login');

            } else {
                setErrorMessage(response.data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Signup failed. Please try again.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="form-container">
            <h2>Signup</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="signup-form" onSubmit={handleSubmit}>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
