import React, { useState } from 'react';
import './AddNoteForm.css';
import { Link } from 'react-router-dom';

function AddNoteForm() {
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    class: '',
    note: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/add-note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setMessage('Note ajoutée avec succès');
        // Réinitialiser le formulaire après l'ajout de la note
        setFormData({
          username: '',
          department: '',
          class: '',
          note: ''
        });
      } else {
        setMessage('Erreur lors de l\'ajout de la note');
      }
    } catch (error) {
      setMessage('Erreur lors de l\'ajout de la note: ' + error.message);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="under-container bubblee">
        <div className='linese'>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Département:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="class">Classe:</label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="note">Note:</label>
              <input
                type="text"
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Ajouter la note</button>
            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
      <div className="menu" id="menu">
        <li><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link></li>
        <li><Link to="#">RECEPTION</Link></li>
      </div>
      <div className="under-container bubble" style={{ height: '90vh' }}>
        <div className="linee"></div>
      </div>
      <div className="under-container" style={{ height: '10vh' }}>
        <div className="mouse">
          <div className="molette"></div>
        </div>
      </div>
      <div className="container" id="secondcontainer">
        <div className="under-container">
          <div className="profil-picture" id="profilpicture">
            <img src="https://scontent-cdt1-1.xx.fbcdn.net/v/t1.0-9/42359178_2096194380400598_6439087177153380352_n.jpg?_nc_cat=101&oh=97fb824feb2bedff898e826dfef84504&oe=5C491364" alt="Profil" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNoteForm;
