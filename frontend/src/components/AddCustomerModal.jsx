import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ImCross } from "react-icons/im";

function AddCustomerModal({ onClose, isUpdating, selectedCustomer, setCustomers }) {
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        if (isUpdating && selectedCustomer) {
            setName(selectedCustomer?.name || '');
            setEmail(selectedCustomer?.contact_info?.email || '');
            setMobile(selectedCustomer?.contact_info?.mobile || '');
            setStatus(selectedCustomer?.status || '');
        }
    }, [isUpdating, selectedCustomer])

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem("securedToken");
            if (isUpdating) {
                let response = await axios.put(`${import.meta.env.VITE_API_URL}/api/customers/${selectedCustomer._id}`,
                    {
                        name, status, contact_info: { mobile, email },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                if (response.status === 200) {
                    setCustomers((prev) => prev.map((customer) => customer._id === selectedCustomer._id ? response.data.updated : customer))
                    onClose();
                }
            }
            else {
                let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, {
                    name, status: status || 'ACTIVE', contact_info: { mobile, email },
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                if (response.status === 201) {
                    setCustomers((prev) => [...prev, response.data.customer]);
                    onClose();
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all duration-300 opacity-100'>
            <div className="bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl w-full max-w-md p-8 relative overflow-hidden transform transition-all">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className='absolute top-6 right-6 text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-full transition-colors z-10'
                >
                    <ImCross size={14} />
                </button>

                <div className="text-center mb-8">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20 mb-4">
                        {isUpdating ? 'U' : 'A'}
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {isUpdating ? 'Update Customer' : 'Add New Customer'}
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        {isUpdating ? 'Modify existing customer details below.' : 'Enter details to expand your network.'}
                    </p>
                </div>

                <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all text-sm"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Mobile */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Mobile
                            </label>
                            <input
                                type="text"
                                placeholder="+1 234 567 890"
                                value={mobile}
                                className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all text-sm"
                                onChange={(e) => setMobile(e.target.value)}
                            />
                        </div>

                        {/* Status */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-slate-300">
                                Status
                            </label>
                            <input
                                type="text"
                                placeholder="ACTIVE"
                                value={status}
                                className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all text-sm uppercase"
                                onChange={(e) => setStatus(e.target.value.toUpperCase())}
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-slate-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            className="w-full bg-slate-950/50 text-white px-4 py-3 border border-slate-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder-slate-600 outline-none transition-all text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5 mt-6"
                    >
                        {isUpdating ? 'Save Changes' : 'Add Customer'}
                    </button>
                </form>

                {/* Background Blobs inside modal */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[50px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none"></div>
            </div>
        </div>
    )
}

export default AddCustomerModal