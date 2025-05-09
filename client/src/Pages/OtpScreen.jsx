import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserEmail } from '../redux/features/auth/authSlice.jsx';
import client from '../lib/axios.jsx';
import AadhyatmaSetuLogo from '../assets/AadhyatmaSetuLogo.png';
import SignUpImg from '../assets/SignUpImg.png';

const OtpScreen = () => {
    const email = useSelector(selectUserEmail);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resend, setResend] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) inputRefs.current[index + 1].focus();
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join('');

        if (otpString.length !== 4 || isNaN(otpString)) {
            alert("Please enter a valid 4-digit OTP.");
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert("Authentication token not found. Please log in again.");
                setLoading(false);
                return;
            }

            const response = await client.post(
                "/auth/verify-email",
                { otp: otpString },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data?.success) {
                alert("OTP verified successfully! Please login!");
                navigate('/');
            } else {
                alert(response.data?.message || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            alert(
                error.response?.data?.message ||
                "An error occurred while verifying the OTP. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-row items-center justify-center m-0 p-0">
            <div className='flex flex-col items-center justify-center gap-10 w-full h-screen bg-brown text-white'>
                <div className="mt-10 flex flex-col items-center justify-center gap-5">
                    <img alt="AadhyatmaSetu" src={AadhyatmaSetuLogo} className="mx-auto h-[110px] w-[150px]" />
                    <h1 className="text-3xl">ENTER OTP</h1>
                    <p className="text-white text-center">We have sent a 4-digit OTP to your email: {email}</p>
                    <div className="flex space-x-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                className="w-16 h-16 text-center text-2xl bg-white text-black rounded-md border border-gray-500"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                ref={(ref) => (inputRefs.current[index] = ref)}
                                autoFocus={index === 0}
                            />
                        ))}
                    </div>
                    <button onClick={handleVerifyOtp} disabled={loading} className="p-4 text-xl bg-olive rounded-3xl px-7">
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </div>
            </div>
            <div className="w-full">
                <img src={SignUpImg} alt="Nature" className="w-full h-screen" />
            </div>
        </section>
    );
};

export default OtpScreen;
