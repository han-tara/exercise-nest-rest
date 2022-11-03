import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignupDto, SigninInstDto, SigninPartDto } from './dto';

@ApiTags('Auth Service')
@Controller('auth')
export class AuthController {
    constructor(private service:AuthService){}
    //institution only
    @Post('signup')
    signup(@Body() dto: SignupDto) {
        return this.service.signup(dto)
    }

    //signin logic
    @HttpCode(HttpStatus.OK)
    @Post('signin/institution')
    signinInstitution(@Body() dto: SigninInstDto) {
        return this.service.signin_institution(dto)
    }
    @HttpCode(HttpStatus.OK)
    @Post('signin/participant')
    signinParticipant(@Body() dto: SigninPartDto) {
        return this.service.signin_participant(dto)
    }

}
