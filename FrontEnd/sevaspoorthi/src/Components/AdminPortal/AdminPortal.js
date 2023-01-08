import NavBar from '../NavBar/NavBar';
import AdminGallery from './AdminGallery/AdminGallery';
import './AdminPortal.css';
import React from 'react';
import ModifyScrollNotification from './ModifyScrollNotification/ModifyScrollNotification';

function AdminPortal()
{
    return (
        <>
            <NavBar/>
            <AdminGallery/>
            <ModifyScrollNotification/>
        </>
    );
}

export default AdminPortal;