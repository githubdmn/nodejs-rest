import { Schema, model } from 'mongoose';
import { IUser } from './documents';

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
  // TODO
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  // TODO
};

async function hashPassword(password: string, salt: Buffer): Promise<string> {
  // TODO finish in Utils
}

const User = model('User', userSchema);

export default User;
