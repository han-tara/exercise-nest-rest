import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags('Auth Frontend')
@Controller('auth')
export class AuthFrontend {
    constructor(private authService: AuthService){}
    @Get('signup')
    clientSignup() {
        return "<body><h1>hello</h1><h2>bonjour</h2></body>"
    }
    @Get('login')
    Signin() {
        return "<body><h1>hello</h1><h2>bonjour</h2></body>"
    }   
}