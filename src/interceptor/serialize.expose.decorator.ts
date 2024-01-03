import { UseInterceptors } from '@nestjs/common';
import SerializeExposeInterceptor from './serialize.expose.interceptor';

interface ClassConstructor {
  new (...args: any[]): {};
}

export default function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeExposeInterceptor(dto));
}