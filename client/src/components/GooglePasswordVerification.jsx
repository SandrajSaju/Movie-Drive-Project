import React,{useState} from 'react'
import axiosInstance from '../app/axiosInstance'
import { useSelector,useDispatch } from 'react-redux';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { setActorCredentials, setActorToken } from '../feature/Actor/actorAuthSlice';

const GooglePasswordVerification = () => {
    const email = useSelector(state=>state.googleVerification.actorEmail);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [enteredPassword,setEnteredPassword] = useState('');
    const handleInputChange = (e) => {
        setEnteredPassword(e.target.value)
    }
    const handleVerifyPassword = async () => {
        try {
            const {data} = await axiosInstance.post('/actor/googleverifypassword',{email,password:enteredPassword});
            dispatch(setActorCredentials(data.existingActor));
            dispatch(setActorToken(data.actorToken));
            navigate('/actor/home')
        } catch (error) {
            toast.error(error.response.data.error);
        }
    }
    return (
        <>
            <div className="w-4/5 mx-auto mt-32">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-5/12 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Best App For Future Actors</h1>
                            <p className="leading-relaxed mt-4">For Aspiring Actors, our app is a dream come true. Delve into the rich history of the movies, analyze the latest casting calls, and follow your Directors and become a professional actor.</p>
                        </div>
                        <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-xl font-bold text-center title-font mb-5">Google Verification</h2>

                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Enter Your Password</label>
                                <input type="password" id="password" value={enteredPassword} onChange={handleInputChange} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <button onClick={handleVerifyPassword} className="text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none hover:bg-slate-700 rounded text-lg">Submit</button>

                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default GooglePasswordVerification
