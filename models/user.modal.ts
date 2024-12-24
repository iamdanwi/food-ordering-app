// user model using mongoose with these fields: name, email, password(hashed), role(user, admin / owner), created_at, updated_at
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    role: {
        type: String,
        default: 'user'
    }
}, { timestamps: true });

// hash password before saving to database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);
export default User;