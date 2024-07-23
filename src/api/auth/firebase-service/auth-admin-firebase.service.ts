import { Injectable } from "@nestjs/common";
import { IAuthService } from "../auth.interface";

@Injectable()
export class AdminAuthFirebaseService implements IAuthService {
	register(adminRequest: any): Promise<any> {
		throw new Error("Method not implemented.");
	}
}