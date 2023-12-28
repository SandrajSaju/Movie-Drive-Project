import React, { useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../app/axiosInstance';

const DirectorApplicantsList = () => {
    const [applications,setApplications] = useState([])
    const { id } = useParams();

    const getApplicants = async () => {
        try {
            const {data} = await axiosInstance.get(`/director/getapplicants/${id}`);
            setApplications(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getApplicants()
    }, [])

    console.log(applications);

    const handleApproveActor = async (applicationId) => {
        try {
            await axiosInstance.post(`/director/approveactor/${applicationId}`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectActor = async (applicationId) => {
        try {
            await axiosInstance.post(`/director/rejectactor/${applicationId}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="container mx-auto p-4 w-4/5 max-md:w-3/5 ml-80 mt-24">
                <h1 className='text-3xl font-bold title-font mb-6 text-gray-900 tracking-wider text-center'>Applied Actors</h1>
                <h1 className='text-2xl font-bold title-font mb-10 text-gray-900 tracking-wider text-center'>{applications[0]?.castingCall?.castingCallTitle}</h1>
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications && applications.map((application) => (
                            <tr key={application._id}>
                                <td className="border-b"><img className='w-20 h-16 object-cover object-center m-auto' src={application.actor.profile.profileImage} alt='' /></td>
                                <td className="py-2 px-4 border-b text-center">{application.actor.name}</td>
                                <td className="py-2 px-4 border-b text-center space-x-3">

                                    <button
                                        className={`ml-2 px-4 py-2 w-32 bg-slate-500 text-white hover:bg-slate-700`}
                                    // onClick={() => handleViewProfileButton(actor._id)}
                                    >View Profile
                                    </button>
                                    <button
                                        className={`ml-2 px-4 py-2 w-24 text-white bg-green-600 hover:bg-green-800`}
                                        onClick={() => handleApproveActor(application._id)}
                                    >Approve
                                    </button>
                                    <button
                                        className={`ml-2 px-2 py-2 w-24 bg-red-500 text-white hover:bg-red-700`}
                                        onClick={() => handleRejectActor(application._id)}
                                    >
                                        Reject
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

export default DirectorApplicantsList
