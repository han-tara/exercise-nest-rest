import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthFrontend } from './auth.fe';
import { AuthService } from './auth.service';

import {JwtModule} from '@nestjs/jwt'

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController,AuthFrontend],
  providers: [AuthService]
})
export class AuthModule {}
