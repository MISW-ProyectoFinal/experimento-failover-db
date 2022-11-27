import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // Experimentation, anti pattern
    // Create connection to database and read some data
    // This is not a good practice, but it's just for demonstration
    return this.appService.getHello();
  }
}
