import {ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninInstDto, SigninPartDto, SignupDto } from './dto';

//authenthication
import * as argon from 'argon2'
import { FormStatus } from 'src/enum';
import {JwtService} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config:ConfigService){}
    async signup({email,password,name}: SignupDto): Promise<HttpException|{access_token: string}> {
        //check email
        const isExist = await this.prisma.institution.findUnique({
            where: {
                email
            }
        })
        //if already exist return
        if (isExist) {
            throw new ConflictException('Email taken')
        }
        //hash password
        const hash = await argon.hash(password)
        //store to db
        const institution = await this.prisma.institution.create({
            data: {
                email,
                password: hash,
                name,
            }
        })
        //create form and establish 1-1
        const form = await this.prisma.form.create({
            data: {
                institution_id: institution.id,
                status: FormStatus.inactive
            }
        })
        //return token
        return this.signToken(institution.id)

    }
    async signin_institution({email, password}: SigninInstDto, response: Response){
        //check email
        const institution = await this.prisma.institution.findUnique({
            where: {
                email
            }
        })
        //if not existed return exception
        if (!institution) {
            throw new ForbiddenException('Email/Password is wrong')
        }
        //check if password same
        try {
            const legit = await argon.verify(institution.password, password)
            if (!legit) {
                throw new ForbiddenException('Email/Password is wrong')
            }
            //return token
            response.cookie('token',this.signToken(institution.id))
            return 'sign in!'
            // return this.signToken(institution.id)
        } catch(err) {
            console.log(err)
            throw new ForbiddenException('Email/Password authenthication failed')
        }
    }
    async signin_participant({id,password}: SigninPartDto) {
        //check id
        const participant = await this.prisma.participant.findUnique({
            where: {
                id
            }
        })
        //if not existed return exception
        if (!participant)
            throw new ForbiddenException('ID/Password is wrong')
        //check password
        const legit = participant.password  == password
        //if wrong throw exception
        if (!legit)
            throw new ForbiddenException('ID/Password is wrong')
        //return token
        return this.signToken(id)
    }

    async signToken(userId: number): Promise<{access_token: string}> {
        const payload = {
            sub: userId
        }
        
        const token = await this.jwt.sign(payload,{
            expiresIn: '15m',
            secret: this.config.get('TOKEN_SECRET')
        })
        return {access_token: token}
    }
}
