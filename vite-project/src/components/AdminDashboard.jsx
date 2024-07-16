import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import './AdminDashboard.css';
import DeleteMedicine from './deletemedicine';
import UpdateMedicine from './updatemedicine';
import UploadMedicine from './uploadmedicine';

import AllMedicine from './allmedicine';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-wrapper"> 
            
                <nav>
                    <ul>
                        <li><Link to="/AdminDashboard">Home</Link></li>
                        <li><Link to="/allmedicine">All Medicine</Link></li>
                        <li><Link to="/">Logout</Link></li>
                    </ul>
                </nav>
            
            <div className="content">
                <Routes>
                    <Route path="/AdminDashboard" component={AdminDashboard} />
                    <Route path="/allmedicine" component={AllMedicine} />
                    <Route path="/uploadmedicine" component={UploadMedicine} />
                    <Route path="/updatemedicine" component={UpdateMedicine} />
                    <Route path="/deletemedicine" component={DeleteMedicine} />
                </Routes>
                <div className="image-overlay">
                <div className="buttons-overlay">
                    <button><Link to="/uploadmedicine">Add Medicine</Link></button>
                    <button><Link to="/updatemedicine">Update Medicine</Link></button>
                    <button><Link to="/deletemedicine">Delete Medicine</Link></button>
                </div>
            </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
