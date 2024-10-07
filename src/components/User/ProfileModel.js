import React, { useState } from 'react';
import './ProfileModel.css'; // Add your styles here

const ProfileModal = ({ onClose, user }) => {
    const [username, setUsername] = useState(user.username);

    const handleLogout = () => {
        // Implement logout logic
        // Call logout from AuthContext and close modal
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        // Implement update logic
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Profile</h2>
                <form onSubmit={handleUpdateProfile}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <button type="submit">Update Profile</button>
                </form>
                <button onClick={handleLogout}>Logout</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ProfileModal;
