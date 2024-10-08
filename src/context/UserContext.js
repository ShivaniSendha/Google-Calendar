// // context/AuthContext.js
// import React, { createContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(() => {
//         const storedUser = JSON.parse(localStorage.getItem('user'));
//         return storedUser ? storedUser : null;
//     });

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//     };

//     return (
//         <AuthContext.Provider value={{ user, setUser, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
