import { Controller, Get, Render } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { Login } from "./entity";

@ApiTags('Auth Frontend')
@Controller('auth')
export class AuthFrontend {
    constructor(private authService: AuthService){}
    @Get('signup')
    clientSignup() {
        return "<body><h1>hello</h1><h2>bonjour</h2></body>"
    }
    @Get('signin/institution')
    @Render('login')
    signinInstitution(): Login {
        return {
            actionRoute: 'institution',
            name: 'email',
            placeholder: 'tara@gmail.com'
        }
    }
    @Get('signin/participant')
    @Render('login')
    signinParticipant(): Login {
        return {
            actionRoute: 'participant',
            name: 'id',
            placeholder: '200503'
        }
    }
       
}