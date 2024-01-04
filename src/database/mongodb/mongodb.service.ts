import { UserDocument, UserModel, UserType } from '@/models';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongodbService {
  constructor(
    @InjectModel(UserModel.get.name)
    private readonly userModel: Model<typeof UserModel>,
  ) {}

  async createUser(user: UserDocument): Promise<typeof UserModel> {
    try {
      const createdUser = new this.userModel(user);
      return await createdUser.save();
    } catch (error: any) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  async findUserById(id: string): Promise<typeof UserModel | null> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error: any) {
      throw new Error(`Error finding user by ID: ${error.message}`);
    }
  }

  async findUserByUsername(username: string): Promise<typeof UserModel | null> {
    try {
      return await this.userModel.findOne({ username }).exec();
    } catch (error: any) {
      throw new Error(`Error finding user by username: ${error.message}`);
    }
  }

  async updateUser(
    id: string,
    updatedUser: Partial<UserDocument>,
  ): Promise<typeof UserModel | null> {
    try {
      const existingUser = await this.findUserById(id);

      if (!existingUser) {
        // return null;
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      Object.assign(existingUser, updatedUser);
      const userModelInstance = new this.userModel(existingUser);
      return await userModelInstance.save();
    } catch (error: any) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  //   async deleteUser(id: string): Promise<typeof UserModel | null> {
  //     try {
  //       return await this.userModel.findByIdAndDelete(id);
  //     } catch (error: any) {
  //       throw new Error(`Error deleting user: ${error.message}`);
  //     }
  //   }
}
