import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  names: {
    type: String,
    required: true
  },
  surnames: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  prefix_number: {
    type: String,
    required: true
  },
  type_user_id: {
    type: String,
    required: true
  },
  active: {
    type: String,
    default: false
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone_number: {
    type: String,
    unique: true,
    require: true
  },
  avatar: String,
  authentications: {
    type: Schema.Types.ObjectId,
    ref: 'authentications'
  }
});
const UserMongoModel = model('users', userSchema);
export { UserMongoModel };
