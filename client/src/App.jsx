import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError, selectUser, selectIsVerified, selectIsAdmin } from "./redux/features/auth/authSlice";
import client from "./lib/axios";
import AdminDashboard from "./Pages/adminPages/AdminDashboard";
import UserDashboard from './Pages/UserDashboard';
import OtpScreen from "./Pages/OtpScreen";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import ErrorPage from './Pages/ErrorPage';
import AboutUs from "./Pages/AboutUs";
import Requisites from "./Pages/Requisites";
import Books from './Pages/Books';
import Podcasts from './Pages/Podcasts';
import Songs from './Pages/Songs';
import MusicPlayer from './Pages/MusicPlayer';
import Meditation from './Pages/Meditation';
import GitaChatbot from './Pages/GitaChatBot';
import LandingPage from './Pages/LandingPage';
import './App.css';
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoadingState] = useState(true);
  const role = useSelector(selectIsAdmin);
  const isVerified = useSelector(selectIsVerified);

  console.log(isVerified)
  console.log(role)
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          dispatch(setLoading(true));
          const response = await client.get("/auth/verify-user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.success && response.data.user) {
            dispatch(login(response.data.user));
            // Redirect user to their respective dashboard based on their role
            if (response.data.user.role === "admin" && response.data.user.isVerified) {
              navigate("/admindashboard");
            } else if (response.data.user.role === "user" && response.data.user.isVerified) {
              navigate("/user-dashboard");
            }
          } else {
            dispatch(setError("Authentication failed"));
          }
        } catch (error) {
          dispatch(setError("Token verification failed"));
        } finally {
          dispatch(setLoading(false));
          setLoadingState(false);
        }
      } else {
        setLoadingState(false);
      }
    };
    checkAuth();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <img src="/loading.gif" alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="app-container">

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              isVerified && role ? (
                // If the user is verified and has a role, redirect to their respective dashboard
                role === true ? (
                  <Navigate to="/admindashboard" />
                ) : role === false ? (
                  <Navigate to="/user-dashboard" />
                ) : null
              ) : (
                // Otherwise, show the LandingPage
                <LandingPage />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isVerified && role !== null ? (
                role === true ? (
                  <Navigate to="/admindashboard" />
                ) : (
                  <Navigate to="/user-dashboard" />
                )
              ) : (
                <SignUp />
              )
            }
          />

          <Route
            path="/login"
            element={
              isVerified && role !== null ? (
                role === true ? (
                  <Navigate to="/admindashboard" />
                ) : (
                  <Navigate to="/gitachatbot" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route path="/otp-screen" element={isVerified ? <Navigate to="/" /> : <OtpScreen />} />
          <Route path="/admindashboard" element={isVerified && role === true ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/user-dashboard" element={isVerified && role === false ? <UserDashboard /> : <Navigate to="/" />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/requisites" element={<Requisites />} />
          <Route path="/books" element={<Books />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/player/:trackId" element={<MusicPlayer />} />
          <Route path="/meditation" element={<Meditation />} />
          <Route path="/gitachatbot" element={<GitaChatbot />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
