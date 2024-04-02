import Document from 'mongoose';

interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default IUser;
