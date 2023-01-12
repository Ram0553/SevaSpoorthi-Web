import NavBar from '../NavBar/NavBar';
import AdminGallery from './AdminGallery/AdminGallery';
import './AdminPortal.css';
import React from 'react';
import ModifyScrollNotification from './ModifyScrollNotification/ModifyScrollNotification';
import AdminCarousel from './AdminHomeCarousel/AdminCarousel';
import AdminOurPrograms from './AdminOurPrograms/AdminOurPrograms';

function AdminPortal()
{
    return (
        <>
            <NavBar/>
            <AdminGallery/>
            <AdminCarousel/>
            <AdminOurPrograms/>
            <ModifyScrollNotification/>
        </>
    );
}

export default AdminPortal;