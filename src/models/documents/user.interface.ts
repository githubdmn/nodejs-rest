import { Document as MongooseDocument } from 'mongoose';
interface IUser extends MongooseDocument {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default IUser;
