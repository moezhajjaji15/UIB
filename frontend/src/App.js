import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AdminAccueil from './AdminAccueil';
import EtudiantAccueil from './EtudiantAccueil';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/adminacceuil" element={<AdminAccueil />} />
                <Route path="/etudiantaccueil" element={<EtudiantAccueil />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}

export default App;
