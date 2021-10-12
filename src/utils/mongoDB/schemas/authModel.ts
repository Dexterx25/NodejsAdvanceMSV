import { Schema, model } from 'mongoose';

const authSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  encrypted_password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  token: String,
  users: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});
const AuthMongoModel = model('authentications', authSchema);
export { AuthMongoModel };
