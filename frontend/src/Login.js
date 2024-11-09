import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AdminAccueil from './AdminAccueil';
import EtudiantAccueil from './EtudiantAccueil';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [role, setRole] = useState(null); // Add state for user role

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Login successful', data);
            setMessage('Connexion réussie');
            
            // Set the user role
            setRole(data.role);

        } catch (error) {
            console.error('There was an error logging in!', error);
            setMessage('Email ou mot de passe incorrect');
        }
    };

    // Render components based on the role
    if (role === 'admin') {
        return <AdminAccueil />;
    } else if (role === 'etudiant') {
        return <EtudiantAccueil />;
    }

    return (
        <div>
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Connexion</button>
            </form>
            <p>{message}</p>
            <p>Pas encore inscrit ? <Link to="/signup">Inscription</Link></p>
        </div>
    );
};

export default Login;
