import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";




@Injectable()
export default class SerializeExposeInterceptor implements NestInterceptor { 

	constructor(protected dto: any) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(
			map((data: any) => plainToInstance(this.dto, data, {
				excludeExtraneousValues: true,
			}))
		);
	}
}