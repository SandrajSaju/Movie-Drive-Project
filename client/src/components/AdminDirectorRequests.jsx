import React, { useState } from 'react';
import axiosInstance from '../app/axiosInstance';
import AdminViewCertificates from './AdminViewCertificates';

const AdminDirectorRequests = ({ directors, fetchDirectorRequests }) => {
    const [selectedDirectorCertificates, setSelectedDirectorCertificates] = useState([]);
    const [isCertificatesModalOpen, setCertificatesModalOpen] = useState(false);


    const handleViewCertificates = (certificates) => {
        setSelectedDirectorCertificates(certificates);
        setCertificatesModalOpen(true);
    };

    const handleCloseCertificatesModal = () => {
        setCertificatesModalOpen(false);
    };

    const handleApproveDirector = async (id) => {
        try {
            await axiosInstance.post(`/admin/approvedirector/${id}`);
            fetchDirectorRequests();
        } catch (error) {

        }
    }

    const handleRejectDirector = async (id) => {
        try {
            await axiosInstance.post(`/admin/rejectdirector/${id}`);
            fetchDirectorRequests();
        } catch (error) {

        }
    }
    return (
        <>
            <div className="container mx-auto p-4 w-4/5 max-md:w-3/5 ml-80 mt-24">
                <h1 className='text-3xl font-bold title-font mb-10 text-gray-900 tracking-wider text-center'>Director Requests</h1>
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {directors.map((director) => (
                            <tr key={director._id}>
                                <td className="border-b"><img className='w-12 h-12 m-auto' src={director?.profile?.profileImage} alt='' /></td>
                                <td className="py-2 px-4 border-b text-center">{director.name}</td>
                                <td className="py-2 px-4 border-b text-center">{director.email}</td>
                                <td className="py-2 px-4 border-b text-center space-x-3">
                                    <button
                                        className={`ml-2 px-2 py-2 w-36 bg-gray-800 text-white hover:bg-blue-500`}
                                        onClick={() => handleViewCertificates(director.certificates)}
                                    >
                                        View Certificates
                                    </button>

                                    <button
                                        className={`ml-2 px-4 py-2 w-24 text-white bg-green-600 hover:bg-green-800`}
                                        onClick={() => handleApproveDirector(director._id)}
                                    >Approve
                                    </button>
                                    <button
                                        className={`ml-2 px-4 py-2 w-24 text-white bg-red-600 hover:bg-red-800`}
                                        onClick={() => handleRejectDirector(director._id)}
                                    >Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isCertificatesModalOpen && (
                <AdminViewCertificates
                    certificates={selectedDirectorCertificates}
                    onClose={handleCloseCertificatesModal}
                />
            )}
        </>
    )
}

export default AdminDirectorRequests
