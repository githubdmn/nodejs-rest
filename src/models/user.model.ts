import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { hashString, checkHashedValue } from '@/utils';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  createdAt: Date;
  updatedAt: Date;

  verifyPassword: (password: string) => Promise<boolean>;
}

export type UserDocument = User & Document;

export type UserType = {
  username: string;
  password: string;
  email: string;
};

export const UserModel = SchemaFactory.createForClass(User);

UserModel.methods.verifyPassword = async function (password: string) {
  return await checkHashedValue(this.password, password);
};

UserModel.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    await hashString(this.password);
  } else {
    return next();
  }
});

UserModel.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
