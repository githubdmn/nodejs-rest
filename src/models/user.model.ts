import { Model, Schema, model } from 'mongoose';
import { IUser } from './documents';
// import { comparePasswords, hashPassword } from '@/utils';
import { comparePasswords, hashPassword } from '../utils';

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (props: any) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    validate: {
      validator: (value: string) =>
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: () =>
        `Password must contain at least one letter, one number, and be at least 8 characters long!`,
    },
    private: true,
  },
});

userSchema.pre<IUser>('save', async function (next) {
  try {
    // if (!this.isModified('password')) return next();
    this.password = await hashPassword(this.password);
    next();
  } catch (error: any) {
    return next(error);
  }
});

userSchema.statics.isEmailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as IUser;
  return comparePasswords(candidatePassword, user.password);
};

const User: Model<IUser> = model<IUser>('User', userSchema);

export default User;
