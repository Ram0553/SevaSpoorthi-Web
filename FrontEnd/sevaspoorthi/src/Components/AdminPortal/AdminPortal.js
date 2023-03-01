import NavBar from '../NavBar/NavBar';
import AdminGallery from './AdminGallery/AdminGallery';
import './AdminPortal.css';
import React from 'react';
import ModifyScrollNotification from './ModifyScrollNotification/ModifyScrollNotification';
import AdminCarousel from './AdminHomeCarousel/AdminCarousel';
import AdminOurPrograms from './AdminOurPrograms/AdminOurPrograms';
import AdminAccess from './AdminAccess/AdminAccess';
import AdminDonate from './AdminDonate/AdminDonate';

function AdminPortal()
{
    return (
        <>
            <NavBar/>
            <AdminGallery/>
            <AdminCarousel/>
            <AdminOurPrograms/>
            <ModifyScrollNotification/>
            <AdminAccess/>
            <AdminDonate/>
        </>
    );
}

export default AdminPortal;