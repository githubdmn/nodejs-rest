import { StatusCodes } from 'http-status-codes';
// import { IUser } from '@/models/documents';
// import User from '@/models/user.model';
// import { UserTypeDTO } from '@/dto';
// import { ApiError } from '@/utils';
import { IUser } from '../models/documents';
import User from '../models/user.model';
import { UserTypeDTO } from '../dto';
import { ApiError } from '../utils';

const registerUser = async (userBody: UserTypeDTO): Promise<IUser> => {
  try {
    //     if (await User.isEmailTaken(userBody.email)) {
    //       throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken');
    //     }
    const newUser = new User(userBody);
    return await newUser.save();
  } catch (error: any) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to register user',
      false,
      error.stack,
    );
  }
};

export { registerUser };
