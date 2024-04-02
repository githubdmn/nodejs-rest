import { StatusCodes } from 'http-status-codes';
// import { IUser } from '@/models/documents';
// import User from '@/models/user.model';
// import { UserTypeDTO } from '@/dto';
// import { ApiError } from '@/utils';
import { IUser } from '../models/documents';
import User from '../models/user.model';
import { UserTypeDTO } from '../dto';
import { ApiError } from '../utils';
import { logger } from '../config';

const registerUser = async (userBody: UserTypeDTO): Promise<IUser> => {
  try {
    //     if (await User.isEmailTaken(userBody.email)) {
    //       throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already taken');
    //     }
    const newUser = new User(userBody);
    return await newUser.save();
  } catch (error: any) {
    const errorMessage = 'User service: '; // Object.keys(error)  // index, code, keyValues
    logger.error(`${errorMessage} ${error}`);
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, error, false, error);
  }
};

export { registerUser };
