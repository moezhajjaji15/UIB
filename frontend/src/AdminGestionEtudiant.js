// AdminGestionEtudiant.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AdminGestionEtudiant.css';
function AdminGestionEtudiant() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null); // État pour stocker l'ID de l'utilisateur en cours de modification

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Erreur lors de la récupération des utilisateurs');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleEdit = (userId) => {
    // Ouvrir le champ de modification pour l'utilisateur avec l'ID userId
    setEditUserId(userId);
  };

  const handleSave = async (userId) => {
    // Mettre en œuvre la logique pour enregistrer les modifications de l'utilisateur avec l'ID userId
    console.log(`Enregistrement des modifications de l'utilisateur avec l'ID ${userId}`);
    setEditUserId(null); // Fermer le champ de modification après l'enregistrement
    // Actualiser la liste des utilisateurs après la modification
    fetchUsers();
  };

  const handleDelete = async (userId) => {
    // Mettre en œuvre la logique pour supprimer l'utilisateur avec l'ID userId
    console.log(`Suppression de l'utilisateur avec l'ID ${userId}`);
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Actualiser la liste des utilisateurs après la suppression
        fetchUsers();
        console.log('Utilisateur supprimé avec succès');
      } else {
        console.error('Erreur lors de la suppression de l\'utilisateur');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div className="container gradient-purple-blue">
      <div className="under-container bubblee">
        <div className='liner'>
          <table >
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Département</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{editUserId === user.id ? <input type="text" defaultValue={user.username} /> : user.username}</td>
                  <td>{editUserId === user.id ? <input type="text" defaultValue={user.email} /> : user.email}</td>
                  <td>{editUserId === user.id ? <input type="text" defaultValue={user.department} /> : user.department}</td>
                  <td>
                    {editUserId === user.id ? (
                      <button onClick={() => handleSave(user.id)}>Enregistrer</button>
                    ) : (
                      <button onClick={() => handleEdit(user.id)}>Modifier</button>
                    )}
                    <button onClick={() => handleDelete(user.id)}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="menu" id="menu">
        <li><Link to="/AddNoteForm">ADD NOTES</Link></li>
        <li><Link to="/Notes">VIEW NOTES</Link></li>
        <li><Link to="/AdminGestionEtudiant">MANAGE STUDENT</Link></li>
        <li><Link to="#">RECEPTION</Link></li>
      </div>
      <div className="under-container bubble" style={{ height: '90vh' }}>
        <div className="line"></div>
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

export default AdminGestionEtudiant;
