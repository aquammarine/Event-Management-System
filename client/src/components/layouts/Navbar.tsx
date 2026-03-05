import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Plus, LogOut, User as UserIcon, Calendar, List } from 'lucide-react';
import { Button } from '../common';
import { useAuthStore } from '../../stores/auth.store';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-slate-100 px-8 py-3 sticky top-0 z-50 flex justify-between items-center">
            <div className="font-bold text-xl text-[#6366F0]"></div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <NavLink to="/events">
                        <Button variant="ghost" icon={List}>Events</Button>
                    </NavLink>

                    <NavLink to="/calendar">
                        <Button variant="ghost" icon={Calendar}>Calendar</Button>
                    </NavLink>
                </div>

                <Button variant="primary" icon={Plus} onClick={() => navigate('/events/create')}>
                    Create Event
                </Button>


                {user ?
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <div className="w-8 h-8 rounded-full bg-[#6366F0]/10 flex items-center justify-center text-[#6366F0]">
                            <UserIcon size={16} />
                        </div>
                        <span className="font-medium text-gray-700">{`${user?.firstName} ${user?.lastName}` || 'User'}</span>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            title="Logout"
                            icon={LogOut}
                        />
                    </div>
                    :
                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                        <NavLink to="/login">
                            <Button variant="primary">Login</Button>
                        </NavLink>
                        <NavLink to="/register">
                            <Button variant="ghost" className="border-slate-200 hover:bg-slate-50">Register</Button>
                        </NavLink>
                    </div>
                }
            </div>
        </nav>
    );
};

export { Navbar };
