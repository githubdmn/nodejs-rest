import { Inject, Injectable } from '@nestjs/common';
import { firebaseConfig } from '@/conf';
import { IAuthService } from './auth.interface';
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { IGuestDBService } from '@/database/guestDB.inteface';
import { GUEST_DB_SERVICE } from '@/utils/constants';
import {
  CreateGuestPublicRequestDto,
  CreateGuestPublicResponseDto,
  LoginGuestPublicRequestDto,
  LoginGuestPublicResponseDto,
} from './dto';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAuthService implements IAuthService {
  private app: any;

  constructor(
    @Inject(GUEST_DB_SERVICE) private readonly guestService: IGuestDBService,
  ) {
    this.app = initializeApp(firebaseConfig);
  }

  async userExist(email: string): Promise<boolean> {
    try {
      await admin.auth().getUserByEmail(email);
    } catch (error: any) {
      return false;
    }
    return true;
  }

  async register(guestData: CreateGuestPublicRequestDto): Promise<{
    user: CreateGuestPublicResponseDto;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const created = await createUserWithEmailAndPassword(
        getAuth(this.app),
        guestData.email,
        guestData.password,
      );
      const { uid } = created.user;
      const savedUser = await this.guestService.saveGuest({ ...guestData, uid });

      const refreshToken = created.user.refreshToken;
      const accessToken = await created.user.getIdToken();

      return {
        user: {
          email: savedUser.email,
          name: savedUser.name,
          phone: savedUser.phone,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
          guestId: savedUser.guestId,
        },
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(guestLoginData: LoginGuestPublicRequestDto): Promise<{
    user: LoginGuestPublicResponseDto;
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await signInWithEmailAndPassword(
      getAuth(this.app),
      guestLoginData.email,
      guestLoginData.password,
    );

    const accessToken = await user.user.getIdToken();
    const refreshToken = user.user.refreshToken;

    return {
      user: {
        email: user.user.email || '',
        guestId: user.user.uid,
      },
      accessToken,
      refreshToken,
    };
  }

  async logout(): Promise<any> {
    return await signOut(getAuth(this.app));
  }

  async passwordReset(email: string): Promise<any> {
    return await sendPasswordResetEmail(getAuth(this.app), email);
  }
}
