import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setLoading, setError } from '../redux/features/auth/authSlice';
import client from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import AadhyatmaSetuLogo from '../assets/AadhyatmaSetuLogo.png';
import SignUpImg from '../assets/SignUpImg.png';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            if (!username || !password) {
                toast.error("Please fill in all fields.");
                return;
            }

            const response = await client.post("/auth/login", { username, password });
            const data = response.data;

            localStorage.setItem('authToken', data.token);
            dispatch(login(data.user));
            toast.success("Login successful!");
            navigate('/gitachatbot');
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
            toast.error("Login failed! " + (error.response?.data?.message || ""));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <section className="flex flex-row items-center justify-center m-0 p-0">
            <div className='flex flex-col items-center justify-center gap-10 w-full h-screen bg-brown text-white'>
                <div className="mt-10 flex flex-col items-center justify-center gap-5">
                    <img src={AadhyatmaSetuLogo} alt="AadhyatmaSetu" className="mx-auto h-[110px] w-[150px]" />
                    <h1 className="text-3xl">Login</h1>
                    <form className="flex flex-col items-center justify-center gap-1" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your username" className="bg-white mb-10 text-black text-xl p-5 text-start h-12 rounded-3xl border-none" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" placeholder="Enter your password" className="bg-white mb-10 text-black text-xl p-5 text-start h-12 rounded-3xl border-none" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button type="submit" className={`p-4 text-xl bg-olive rounded-3xl px-7 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <p className="text-white">Don't have an account? <a href="/signup" className="text-orange-400">SignUp</a></p>
                    </form>
                </div>
            </div>
            <div className="w-full">
                <img src={SignUpImg} alt="Nature" className="w-full h-screen" />
            </div>
        </section>
    );
};

export default Login;
