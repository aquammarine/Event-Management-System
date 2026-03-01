import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button';

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <Link to="/events" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors group">
                <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                Back to Events
            </Link>

            <div className="bg-white rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="h-64 bg-indigo-600 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-700 opacity-90" />
                    <h1 className="text-4xl font-black text-white relative z-10 tracking-tight px-10 text-center">
                        Event Details
                    </h1>
                </div>

                <div className="p-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-12 border-b border-slate-100">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                                Upcoming Event
                            </span>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Technical Deep Dive: Project ID #{id}</h2>
                            <p className="text-slate-500 font-medium text-lg">Detailed information will be loaded here once the feature is complete.</p>
                        </div>
                        <Button className="px-8 py-4 shadow-indigo-200">
                            Register Now
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                                <Calendar size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Date & Time</p>
                                <p className="font-bold text-slate-800">TBD</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Location</p>
                                <p className="font-bold text-slate-800">TBD</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-6 rounded-3xl bg-slate-50 border border-slate-100">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-indigo-600">
                                <Users size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Capacity</p>
                                <p className="font-bold text-slate-800">TBD</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
