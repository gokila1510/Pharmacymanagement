import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleSelection from './RoleSelection';
import Cart from './Cart';
import UserDashboard from './UserDashboard';
import Login from './Login';
import Register from './Register';
import Medicines from './Medicines';
import AdminDashboard from './AdminDashboard';
import AllMedicines from './allmedicine'; // Corrected import
import DeleteMedicine from './deletemedicine'; // Corrected import
import UploadMedicine from './uploadmedicine'; // Corrected import
import UpdateMedicine from './updatemedicine'; // Corrected import
import MedicineDetails from './MedicineDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for RoleSelection */}
        <Route index element={<RoleSelection />} />

        {/* Other routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="userdashboard" element={<UserDashboard />} />
        <Route path="admindashboard" element={<AdminDashboard />} />
        <Route path="allmedicine" element={<AllMedicines />} />
        <Route path="deletemedicine" element={<DeleteMedicine />} />
        <Route path="uploadmedicine" element={<UploadMedicine />} />
        <Route path="updatemedicine" element={<UpdateMedicine />} />

        {/* Route for MedicineDetails */}
        <Route path="/medicine/:medicineId" element={<MedicineDetails />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
