import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    active: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Add method to verify password
userSchema.methods.verifyPassword = async function (password: string) {
    return bcrypt.compare(password, this.hashedPassword);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema); 