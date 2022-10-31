import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service:AuthService){}
    @Post('register')
    register() {
        return this.service.register()
    }
}
