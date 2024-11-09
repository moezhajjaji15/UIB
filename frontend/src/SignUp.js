import React, { useState } from 'react';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        department: 'Informatique',
        role: 'etudiant',
        mobileNumber: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
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
            console.log('User registered', data);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Department:</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="Informatique">Informatique</option>
                    <option value="Management">Management</option>
                    <option value="Electrique">Electrique</option>
                    <option value="Mécanique">Mécanique</option>
                    <option value="Autre">Autre</option>
                </select>
            </div>
            <div>
                <label>Role:</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="etudiant">Etudiant</option>
                </select>
            </div>
            <div>
                <label>Mobile Number:</label>
                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
            </div>
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
