// PACKAGES
const bcrypt = require('bcrypt');

// FILES
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { sendVerificationEmail } = require('../services/emailService');

// HANDLING COOKIE FUNCTION
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600000, // 1 hour
    sameSite: 'Strict',
};

// VARIABLES
const RESEND_OTP_LIMIT = 3;
const OTP_EXPIRATION_TIME = 2 * 60 * 1000;

// REGISTER USER FUNCTION
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();

        // Attempt to send the verification email
        try {
            await sendVerificationEmail({ email, verificationToken });
        } catch (error) {
            return res.status(500).json({ error: 'Error in sending verification email, please retry after some time!' });
        }


        // Create the user object after sending the email
        const user = new User({
            username,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + OTP_EXPIRATION_TIME,
        });

        // Save the user
        await user.save();

        // Generate a JWT token
        const token = generateToken(user._id);

        // Set JWT token as an HttpOnly cookie
        res.cookie('token', token, cookieOptions);

        // Send success response
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });

    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// VERIFY EMAIL FUNCTION
const verifyEmail = async (req, res) => {
    try {
        const { otp } = req.body;
        const userId = req.user.user;
        // Fetch user from database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User  not found" });
        }

        // If the user is already verified, don't resend OTP
        if (user.isVerified) {
            return res.status(400).json({ message: "User  already verified" });
        }
        if (user.verificationToken !== otp || user.verificationTokenExpiresAt < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification OTP"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        user.otpResendCount = undefined;
        user.otpResendTimestamp = undefined;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        console.log("Error in verifying email", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// RESEND VERIFICATION FUNCTION
const resendVerificationEmail = async (req, res) => {
    try {
        const userId = req.user;
        // Fetch user from database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If the user is already verified, don't resend OTP
        if (user.isVerified) {
            return res.status(400).json({ message: "User already verified" });
        }

        // Check if OTP is expired or if resend count is too high
        const currentTime = Date.now();
        const isOtpExpired = user.verificationTokenExpiresAt < currentTime;
        const resendTooSoon = user.otpResendTimestamp && currentTime - user.otpResendTimestamp < OTP_EXPIRATION_TIME; // Check if resend is within 1 minute

        // Prevent user from resending OTP too many times
        if (user.otpResendCount >= RESEND_OTP_LIMIT) {
            return res.status(400).json({ message: "OTP resend limit exceeded" });
        }

        if (isOtpExpired || resendTooSoon) {
            // Generate a new OTP
            const verificationToken = Math.floor(1000 + Math.random() * 9000).toString();
            const expiresAt = Date.now() + OTP_EXPIRATION_TIME; // OTP expiration time

            // Update the user with the new OTP, expiration time, and resend count
            user.verificationToken = verificationToken;
            user.verificationTokenExpiresAt = expiresAt;
            user.otpResendCount += 1; // Increment resend count
            user.otpResendTimestamp = currentTime;  // Update last resend timestamp
            await user.save();
            try {
                // Send the new OTP via email
                await sendVerificationEmail({ email: user.email, verificationToken });

                return res.status(200).json({ message: "New OTP sent successfully" });
            } catch (error) {
                return res.status(500).json({ error: error, message: "Error in Sending Otp" });
            }

        } else {
            // OTP has not expired, or user is trying to resend too soon
            return res.status(400).json({ message: "OTP has expired or you're trying to resend too soon" });
        }
    } catch (error) {
        console.error("Error in resend OTP:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// LOGIN USER FUNCTION
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // COMPARE PASSWORDS
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // GENERATE A JWT TOKEN
        const token = generateToken(user._id);

        // SET TOKEN IN HttpOnly cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });  // 1 HOUR EXPIRATION

        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.log("Error in login:", error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// VERIFY USER FUNCTION
const verifyUser = async (req, res) => {
    try {
        const userId = req.user.user;  // DECODED userId WHICH IS PASSED FROM AUTHENTICATE MIDDLEWARE
        const user = await User.findById(userId);  // FIND EVERYTHING RELATED TO USER
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User is authenticated",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                isVerified: user.isVerified,
                isAdmin: user.isAdmin
            }
        });
    } catch (error) {
        console.error("Error in verifying user", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

// UPDATE USER FUNCTION
const updateUser = async (req, res) => {
    try {
        const userId = req.user;  // DECODED userId WHICH IS PASSED FROM AUTHENTICATE MIDDLEWARE
        const user = await User.findById(userId);  // FIND EVERYTHING RELATED TO USER
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { username } = req.body;
        const updatedUser = await User.findOneAndUpdate(user._id, {
            username: username,
        }, { new: true });
        try {
            const user = await User.findById(userId);
            return res.status(200).send({
                success: true,
                message: "Profile updated",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isVerified: user.isVerified,
                }
            })
        } catch (error) {

        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in update api"
        })
    }
};

// FORGOT PASSWORD FUNCTION
const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const resetToken = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

        await user.save();
        await sendResetEmail({ email: user.email, resetToken });

        res.status(200).json({ message: "Password reset OTP sent to email" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// RESET PASSWORD FUNCTION
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, resetPasswordToken: otp });
        if (!user || user.resetPasswordExpiresAt < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGOUT USER FUNCTION
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
};

module.exports = { registerUser, verifyEmail, resendVerificationEmail, loginUser, verifyUser, updateUser, forgotPassword, resetPassword, logout };
