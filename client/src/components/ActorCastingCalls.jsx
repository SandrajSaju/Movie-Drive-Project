import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { actorDetailedCastingCall } from '../feature/CastingCalls/castingCallsSlice';
import { useDispatch } from 'react-redux';


function ActorCastingCalls() {
  const token = localStorage.getItem('actorToken');
  const [castingCalls, setCastingCalls] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {

    const getAllCastingCalls = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/actor/castingcalls', {
          headers: {
            'Content-Type': 'application/json',
            'ActorAuthorization': token
          }
        });
        setCastingCalls(data)
      } catch (error) {
        console.log(error.message);
      }
    }

    getAllCastingCalls()

  }, [token])

  const viewDetailsHandler = (id) => {
    dispatch(actorDetailedCastingCall(id))
  }


  return (
    <>
      <section className="text-gray-600 body-font w-4/5 max-md:w-3/5 ml-80 max-md:ml-64 px-10">
        <div className="container px-5 py-24 mx-auto pl-6">
          <div className="flex flex-col text-center w-full mb-8 mt-5">
            <h1 className="text-2xl font-bold title-font mb-4 text-gray-900 tracking-wider">CASTING CALLS</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {
              castingCalls.map(castingCall=>(
                <div key={castingCall.id} className="p-4 lg:w-1/4 md:w-1/2">
                <div className="h-full flex flex-col items-center text-center">
                  <img alt="team" className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4" src={castingCall.image} />
                  <div className="w-full flex flex-col items-center flex-grow">
                    <h2 className="title-font font-bold text-lg text-gray-900">{castingCall.castingCallTitle}</h2>
                    <h3 className="text-gray-900 mb-3 font-medium">Role - {castingCall.roleDescription}</h3>
                    <p className="mb-2 text-gray-500">{castingCall.projectDescription}</p>
                    <h3 className="text-gray-900 mb-3 font-medium">Compensation - Rs.{castingCall.compensation}</h3>
                    <span className="mt-auto">
                     <Link to={`/actor/castingcalldetails/${castingCall._id}`}><button onClick={()=>viewDetailsHandler(castingCall._id)} className='p-2 bg-slate-500 text-white w-40 h-10 hover:bg-slate-700 rounded-lg'>View Details</button></Link>
                    </span>
                  </div>
                </div>
              </div>
              ))
            }
          
          </div>
        </div>
      </section>
    </>
  )
}

export default ActorCastingCalls
