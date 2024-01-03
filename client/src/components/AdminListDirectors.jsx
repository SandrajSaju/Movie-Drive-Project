import React from 'react';
import axiosInstance from '../app/axiosInstance';

const AdminListDirectors = ({ directors, fetchDirectors }) => {

    const handleBlockDirector = async (id) => {
        try {
            await axiosInstance.post(`/admin/blockdirector/${id}`);
            fetchDirectors();
        } catch (error) {

        }
    }

    const handleUnblockDirector = async (id) => {
        try {
            await axiosInstance.post(`/admin/unblockdirector/${id}`);
            fetchDirectors();
        } catch (error) {

        }
    }
  return (
    <>
      <div className="container mx-auto p-4 w-4/5 max-md:w-3/5 ml-80 mt-24">
            <h1 className='text-3xl font-bold title-font mb-10 text-gray-900 tracking-wider text-center'>Directors' Details</h1>
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

                                {director.isBlocked ? (
                                    <button
                                        className={`ml-2 px-4 py-2 w-24 text-white bg-green-600 hover:bg-green-800`}
                                        onClick={() => handleUnblockDirector(director._id)}
                                    >Unblock
                                    </button>
                                ) : (
                                    <button
                                        className={`ml-2 px-4 py-2 w-24 text-white bg-red-600 hover:bg-red-800`}
                                        onClick={() => handleBlockDirector(director._id)}
                                    >Block
                                    </button>
                                )}
                                <button
                                    className={`ml-2 px-2 py-2 w-28 bg-gray-800 text-white hover:bg-blue-500`}
                                // onClick={() => handleBlockActor(actor._id)}
                                >
                                    View Profile
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default AdminListDirectors
