import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService){}
    @Post()
    async register() {
        const db = await this.prisma.institution.findUnique({
            where: {
                id: 1
            }
        })
        return db
    }
}
