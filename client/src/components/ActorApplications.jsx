import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getActorApplications } from '../feature/Applications/actorApplicationsSlice';
import axios from 'axios';

const ActorApplications = () => {
    const dispatch = useDispatch();
    const {applications} = useSelector((state)=>state.actorApplications)
    useEffect(()=>{
        dispatch(getActorApplications())
    },[])

    const handleCancelApplication = async (castingCallId,applicationId) =>{
        try {
            await axios.post(`http://localhost:4000/actor/cancelapplication/${castingCallId}/${applicationId}`,null,{
                headers:{
                    "ActorAuthorization":localStorage.getItem("actorToken")
                }
            })
            dispatch(getActorApplications())
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <div className="container mx-auto p-4 w-4/5 max-md:w-3/5 ml-80 mt-24">
                <h1 className='text-3xl font-bold title-font mb-10 text-gray-900 tracking-wider text-center'>My Applications</h1>
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-lg">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Director</th>
                            <th className="py-2 px-4 border-b">Compensation</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications && applications.map((application) => (
                            <tr key={application._id}>
                                <td className="border-b"><img className='w-20 h-16 object-cover object-center m-auto' src={application.castingCall.image} alt='' /></td>
                                <td className="py-2 px-4 border-b text-center">{application.castingCall.castingCallTitle}</td>
                                <td className="py-2 px-4 border-b text-center">{application.castingCall.roleDescription}</td>
                                <td className="py-2 px-4 border-b text-center">{application.castingCall.director.name}</td>
                                <td className="py-2 px-4 border-b text-center">{application.castingCall.compensation}</td>
                                <td className="py-2 px-4 border-b text-center font-bold">{application.status}</td>
                                <td className="py-2 px-4 border-b text-center space-x-3">
                                {
                                    application.status === 'Pending'?(
                                        <button
                                        className={`ml-2 px-4 py-2 w-32 bg-slate-500 text-white hover:bg-slate-700`}
                                        onClick={() => handleCancelApplication(application.castingCall._id,application._id)}
                                    >Cancel
                                    </button>
                                    ):(
                                        ""
                                    )
                                }
                                    

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    </>
  )
}

export default ActorApplications
