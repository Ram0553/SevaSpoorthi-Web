import NavBar from '../NavBar/NavBar';
import AdminGallery from './AdminGallery/AdminGallery';
import './AdminPortal.css';
import React from 'react';

function AdminPortal()
{
    return (
        <div>
            <NavBar/>
            <AdminGallery/>
        </div>
    );
}

export default AdminPortal;