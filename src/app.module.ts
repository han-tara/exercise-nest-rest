import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { FormModule } from './form/form.module';
import { InstitutionModule } from './institution/institution.module';
import { ParticipantModule } from './participant/participant.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({isGlobal: true}), AuthModule, FormModule, InstitutionModule, ParticipantModule, QuestionModule, AnswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
