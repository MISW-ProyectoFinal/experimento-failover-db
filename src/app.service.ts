import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Anti-pattern
  // En el constructor crear conexion a la bd
  getHello(): string {
    return 'Hello World!';
  }
}
