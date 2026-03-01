import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
