import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, setLoading, setError } from '../redux/features/auth/authSlice.jsx';
import client from '../lib/axios.jsx';
import { useNavigate } from 'react-router-dom';
import AadhyatmaSetuLogo from '../assets/AadhyatmaSetuLogo.png';
import SignUpImg from '../assets/SignUpImg.png';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoadingState] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        setLoadingState(true);
        dispatch(setLoading(true));
        dispatch(setError(null));

        try {
            const response = await client.post("/auth/register", { username, email, password });
            const data = response.data;

            localStorage.setItem('authToken', data.token);
            dispatch(login(data.user));
            navigate('/otp-screen');
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"));
            alert("Registration failed! " + (error.response?.data?.message || ""));
        } finally {
            setLoadingState(false);
            dispatch(setLoading(false));
        }
    };

    return (
        <section className="flex flex-row items-center justify-center m-0 p-0">
            <div className='flex flex-col items-center justify-center gap-10 w-full h-screen bg-brown text-white'>
                <div className="mt-10 flex flex-col items-center justify-center gap-5">
                    <div>
                        <img alt="AadhyatmaSetu" src={AadhyatmaSetuLogo} className="mx-auto h-[110px] w-[150px]" />
                    </div>
                    <div>
                        <h1 className="text-3xl">SIGN UP</h1>
                    </div>
                    <div>
                        <form className="flex flex-col items-center justify-center gap-1" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Enter your username"
                                className="bg-white mb-10 text-black text-xl p-5 text-start h-12 rounded-3xl border-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                className="bg-white mb-10 text-black text-xl p-5 text-start h-12 rounded-3xl border-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                className="bg-white mb-10 text-black text-xl p-5 text-start h-12 rounded-3xl border-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="p-4 text-xl bg-olive rounded-3xl px-7"
                                disabled={loading}
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </button>
                            <p className="text-white">Already have an account? <a href="/login" className="text-orange-400">Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <img src={SignUpImg} alt="Nature" className="w-full h-screen" />
            </div>
        </section>
    );
};

export default SignUp;