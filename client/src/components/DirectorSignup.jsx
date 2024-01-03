import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setDrectorOtpCredentials } from '../feature/Director/directorOtpSlice';
import axiosInstance from '../app/axiosInstance';

const DirectorSignup = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [certificates,setCertificates] = useState("");

    const handleCertificatesUpload = (e) => {
        const selectedImages = e.target.files;
        setCertificates([...certificates,...selectedImages]);
    };

    const handleDirectorSignUp = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name",name)
            formData.append("email",email)
            formData.append("password",password)
            formData.append("confirmPassword",confirmPassword)
            for(let i = 0; i < certificates.length; i++){
                formData.append("images",certificates[i]);
            }
            const { data } = await axiosInstance.post('/director/signup', formData, {
                headers:{
                    "Content-Type" : "multipart/form-data"
                }
            });
            console.log(data);
            dispatch(setDrectorOtpCredentials({ ...data }))
            toast.success("OTP sent to Email")
            navigate('/director/verifyotp')
        } catch (error) {
            toast.error(error.response.data.error);
            console.log(error.response.data.error);
        }
    };

    return (
        <>
            <div className="w-4/5 mx-auto mt-32 md:mt-5">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                        <div className="lg:w-5/12 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                            <h1 className="title-font font-medium text-3xl text-gray-900">Best App For Casting Actors</h1>
                            <p className="leading-relaxed mt-4">For Aspiring Actors, our app is a dream come true. Delve into the rich history of the movies, analyze the latest casting calls, and follow your Directors and become a professional actor.</p>
                        </div>
                        <div className="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                            <h2 className="text-gray-900 text-xl font-bold text-center title-font mb-5">Director Sign Up</h2>
                            <form onSubmit={handleDirectorSignUp}>
                            <div className="relative mb-4">
                                <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                                <input type="text" id="full-name" value={name} onChange={(e)=>setName(e.target.value)} name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="password" className="leading-7 text-sm text-gray-600">Confirm Password</label>
                                <input type="password" id="confirm-password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} name="confirmPassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="certificates" className="leading-7 text-sm text-gray-600">Upload Certificates</label>
                                <input type="file" id="certificates" multiple name="image" onChange={handleCertificatesUpload} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <button type='submit' className="text-white border-0 py-2 px-8 focus:outline-none rounded bg-green-800 text-lg hover:bg-green-900">Sign Up</button>
                            </div>
                            </form>
                            <p className="text-xs text-green-800 mt-3 text-center">Already registered? <Link to='/director/login'>Login here</Link></p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default DirectorSignup
