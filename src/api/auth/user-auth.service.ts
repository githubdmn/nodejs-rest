
import { IUserAuth } from "@/database/interfaces";
import { SQLITE_USER_AUTH } from "@/utils/constants";
import { Injectable, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		@Inject(SQLITE_USER_AUTH) private userAuthDatabase: IUserAuth,
		private jwtService: JwtService,
	) { }
	
}