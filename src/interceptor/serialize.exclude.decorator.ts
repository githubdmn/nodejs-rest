import { UseInterceptors } from '@nestjs/common';
import SerializeExcludeInterceptor from './serialize.exclude.interceptor';

interface ClassConstructor {
  new (...args: any[]): {};
}

export default function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeExcludeInterceptor(dto));
}