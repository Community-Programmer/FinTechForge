import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  bio: { type: String },
  password: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);