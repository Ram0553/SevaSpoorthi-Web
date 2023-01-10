import NavBar from '../NavBar/NavBar';
import AdminGallery from './AdminGallery/AdminGallery';
import './AdminPortal.css';
import React from 'react';
import ModifyScrollNotification from './ModifyScrollNotification/ModifyScrollNotification';
import AdminCarousel from './AdminHomeCarousel/AdminCarousel';

function AdminPortal()
{
    return (
        <>
            <NavBar/>
            <AdminGallery/>
            <AdminCarousel/>
            <ModifyScrollNotification/>
        </>
    );
}

export default AdminPortal;