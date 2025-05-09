const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    otpResendCount: { type: Number, default: 0 },
    otpResendTimestamp: { type: Date },
}, {
    timestamps: true,  // AUTOMATICALLY ADDS createdAt AND updatedAt FIELDS
});

// CREATE USER MODEL
const User = mongoose.model('User', userSchema);

// EXPORT USER MODEL
module.exports = User;
