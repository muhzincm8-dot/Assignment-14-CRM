import React, { useState, useEffect } from 'react'
import AddCustomerModal from '../components/AddCustomerModal';
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function CustomersPage() {
    const [showAddModal, setShowModal] = useState(false);
    let [customers, setCustomers] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState({});

    useEffect(() => {
        let getCustomers = async () => {
            try {
                const token = localStorage.getItem("securedToken");
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setCustomers(response.data.customers)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        getCustomers();
    }, [])

    async function deleteCustomer(id, e) {
        const token = localStorage.getItem("securedToken")
        try {
            let response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response.status === 200) {
                setCustomers((prev) => prev.filter((customer) => customer._id !== id))
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async function editCustomer(id) {
        let fetchCustomer = async () => {
            try {
                const token = localStorage.getItem("securedToken");
                let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setSelectedCustomer(response.data.customer)
                    setIsUpdating(true);
                    setShowModal(true);
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchCustomer();
    }

    // Helper for status badge
    const getStatusColor = (status) => {
        const lower = status?.toLowerCase() || '';
        if (lower === 'active') return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
        if (lower === 'inactive') return 'border-amber-500/30 bg-amber-500/10 text-amber-400';
        return 'border-blue-500/30 bg-blue-500/10 text-blue-400';
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col pt-24 pb-12 px-4 relative overflow-hidden text-slate-200">
            {/* Background decors */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl w-full mx-auto relative z-10">

                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                            <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                            Customer Directory
                        </h1>
                        <p className="text-slate-400 mt-2 text-sm md:text-base ml-5">
                            Efficiently manage and track your client accounts and interactions.
                        </p>
                    </div>
                    {/* Button */}
                    <div className="ml-5 md:ml-0">
                        <button
                            type="button"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25 text-white py-2.5 px-6 rounded-xl font-semibold hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            onClick={() => {
                                setIsUpdating(false);
                                setSelectedCustomer(null);
                                setShowModal(true);
                            }}
                        >
                            <span className="text-lg leading-none">+</span> Add Customer
                        </button>
                    </div>
                </div>

                {/* Customer Data Table */}
                <div className='bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden'>
                    <div className="overflow-x-auto">
                        <table className='w-full'>
                            <thead className='bg-slate-900/80 border-b border-slate-800 text-slate-400 text-sm tracking-wider uppercase'>
                                <tr>
                                    <th className='px-6 py-5 text-left font-semibold'>Name</th>
                                    <th className='px-6 py-5 text-left font-semibold'>Email</th>
                                    <th className='px-6 py-5 text-left font-semibold'>Status</th>
                                    <th className='px-6 py-5 text-left font-semibold'>Mobile</th>
                                    <th className='px-6 py-5 text-center font-semibold w-24'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-slate-800/50 whitespace-nowrap text-sm'>
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr className='hover:bg-slate-800/30 transition-colors duration-200 group' key={customer?._id}>
                                            <td className='px-6 py-4'>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-blue-400 border border-slate-700">
                                                        {customer?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-white font-medium">{customer?.name}</span>
                                                </div>
                                            </td>
                                            <td className='px-6 py-4 text-blue-400'>{customer?.contact_info?.email}</td>
                                            <td className='px-6 py-4'>
                                                <span className={`border px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(customer?.status)}`}>
                                                    {customer?.status}
                                                </span>
                                            </td>
                                            <td className='px-6 py-4 text-slate-300'>{customer?.contact_info?.mobile}</td>
                                            <td className='px-6 py-4'>
                                                <div className="flex items-center justify-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => editCustomer(customer._id)}
                                                        className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={(e) => deleteCustomer(customer._id, e)}
                                                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded"
                                                        title="Delete"
                                                    >
                                                        <MdDelete size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            No customers found. Click 'Add Customer' to get started.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showAddModal &&
                <AddCustomerModal
                    onClose={() => setShowModal(false)}
                    isUpdating={isUpdating}
                    selectedCustomer={selectedCustomer}
                    setCustomers={setCustomers}
                />
            }
        </div>
    )
}

export default CustomersPage