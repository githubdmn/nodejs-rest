import { Inject, Injectable } from '@nestjs/common';
import { firebaseConfig } from '@/conf';
import { initializeApp } from 'firebase/app';
import { IUserAuth } from '../auth-user.interface';
import { SQLITE_AUTH_USER } from '@/common/constants';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { IUserDBAuth } from '@/database/interfaces';


@Injectable()
export class EnduserAuthFirebaseService implements IUserAuth {
  private app: any;

  constructor(@Inject(SQLITE_AUTH_USER) private userdb: IUserDBAuth) {
    this.app = initializeApp(firebaseConfig);
  }

  async register(userRequest: any): Promise<{
    user: any;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const created = await createUserWithEmailAndPassword(
        getAuth(this.app),
        userRequest.email,
        userRequest.password,
      );
      const { uid } = created.user;

      const userData = { ...userRequest, method: 'Firebase', uid };
      const savedUser = await this.userdb.register3rdParty(userData);
      
      const refreshToken = created.user.refreshToken;
      const accessToken = await created.user.getIdToken();

      return {
        user: {
          email: savedUser.email,
          name: savedUser.name,
          createdAt: savedUser.createdAt,
          enduserId: savedUser.enduserId,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  // async login(guestLoginData: LoginGuestPublicRequestDto): Promise<{
  //   user: LoginGuestPublicResponseDto;
  //   accessToken: string;
  //   refreshToken: string;
  // }> {
  //   const user = await signInWithEmailAndPassword(
  //     getAuth(this.app),
  //     guestLoginData.email,
  //     guestLoginData.password,
  //   );

  //   const accessToken = await user.user.getIdToken();
  //   const refreshToken = user.user.refreshToken;

  //   return {
  //     user: {
  //       email: user.user.email || '',
  //       guestId: user.user.uid,
  //     },
  //     accessToken,
  //     refreshToken,
  //   };
  // }

  // async logout(): Promise<any> {
  //   return await signOut(getAuth(this.app));
  // }

  // async passwordReset(email: string): Promise<any> {
  //   return await sendPasswordResetEmail(getAuth(this.app), email);
  // }
}
